#!/usr/bin/env node
// Local HTTP bridge (localhost:9876) + long-polling + file queue between Antigravity and Biowave Script Runner.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.FIGMA_BRIDGE_PORT || 9876);
const DIR = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DIR = path.resolve(DIR, '../.local');
const STATUS_FILE = path.join(LOCAL_DIR, 'figma-bridge-v2-status.json');

fs.mkdirSync(LOCAL_DIR, { recursive: true });

const clients = new Map(); // fileName -> lastSeenMs
const queue = [];          // [{ id, targetFile, code, resolve, reject, timer }]
const running = new Map(); // id -> job
const waitingPolls = [];   // [{ file, res, timer }]

function matchesFile(file, targetFile) {
  if (!targetFile) return true;
  return file.toLowerCase().includes(targetFile.toLowerCase());
}

function writeStatusFile() {
  const now = Date.now();
  const activeSet = new Map();
  for (const [f, t] of clients.entries()) {
    if (now - t < 30000) activeSet.set(f, now - t);
  }
  for (const wp of waitingPolls) {
    activeSet.set(wp.file, 0);
  }
  const activeFiles = [...activeSet.entries()].map(([file, agoMs]) => ({ file, agoMs }));
  try {
    fs.writeFileSync(STATUS_FILE, JSON.stringify({
      updatedAt: new Date().toISOString(),
      activeFiles,
      waitingPolls: waitingPolls.length,
      queued: queue.length,
      running: running.size
    }, null, 2));
  } catch (_) {}
}

function dispatchQueue() {
  for (let qi = 0; qi < queue.length; qi++) {
    const job = queue[qi];
    const wi = waitingPolls.findIndex((wp) => matchesFile(wp.file, job.targetFile));
    if (wi !== -1) {
      const wp = waitingPolls.splice(wi, 1)[0];
      clearTimeout(wp.timer);
      queue.splice(qi, 1);
      qi--;
      running.set(job.id, job);
      clients.set(wp.file, Date.now());
      sendJson(wp.res, 200, { id: job.id, code: job.code });
    }
  }
  writeStatusFile();
}

function enqueueJob({ id = crypto.randomUUID(), targetFile = null, code, timeoutMs = 60000 }) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const idx = queue.findIndex((j) => j.id === id);
      if (idx !== -1) queue.splice(idx, 1);
      running.delete(id);
      writeStatusFile();
      reject(new Error(`Timed out after ${timeoutMs}ms waiting for Figma plugin${targetFile ? ` (${targetFile})` : ''}`));
    }, timeoutMs);
    queue.push({ id, targetFile, code, resolve, reject, timer });
    dispatchQueue();
  });
}

setInterval(() => {
  writeStatusFile();
  let files = [];
  try { files = fs.readdirSync(LOCAL_DIR); } catch (_) { return; }
  for (const fname of files) {
    if (!fname.startsWith('v2-req-') || !fname.endsWith('.json')) continue;
    const reqPath = path.join(LOCAL_DIR, fname);
    try {
      const raw = fs.readFileSync(reqPath, 'utf8');
      fs.unlinkSync(reqPath);
      const req = JSON.parse(raw);
      const id = req.id || crypto.randomUUID();
      const resPath = path.join(LOCAL_DIR, `v2-res-${id}.json`);
      enqueueJob({
        id,
        targetFile: req.file || null,
        code: req.code,
        timeoutMs: Number(req.timeoutMs || 60000)
      }).then((result) => {
        fs.writeFileSync(resPath, JSON.stringify(result, null, 2));
      }).catch((e) => {
        fs.writeFileSync(resPath, JSON.stringify({ id, ok: false, error: e.message }, null, 2));
      });
    } catch (_) {}
  }
}, 150);

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, status, obj) {
  if (res.writableEnded) return;
  cors(res);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function matchJob(file) {
  for (let i = 0; i < queue.length; i++) {
    const job = queue[i];
    if (matchesFile(file, job.targetFile)) {
      queue.splice(i, 1);
      return job;
    }
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    cors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && (url.pathname === '/poll' || url.pathname === '/v2/poll')) {
    const file = url.searchParams.get('file') || 'unknown';
    clients.set(file, Date.now());
    const job = matchJob(file);
    if (job) {
      running.set(job.id, job);
      writeStatusFile();
      return sendJson(res, 200, { id: job.id, code: job.code });
    }
    // Hold long-poll open for up to 20s so background window timers don't throttle it
    const wp = {
      file,
      res,
      timer: setTimeout(() => {
        const idx = waitingPolls.indexOf(wp);
        if (idx !== -1) waitingPolls.splice(idx, 1);
        clients.set(file, Date.now());
        writeStatusFile();
        sendJson(res, 200, { id: null });
      }, 20000)
    };
    waitingPolls.push(wp);
    req.on('close', () => {
      clearTimeout(wp.timer);
      const idx = waitingPolls.indexOf(wp);
      if (idx !== -1) waitingPolls.splice(idx, 1);
      writeStatusFile();
    });
    writeStatusFile();
    return;
  }

  if (req.method === 'POST' && url.pathname === '/result') {
    try {
      const raw = await readBody(req);
      const body = JSON.parse(raw || '{}');
      if (body.file) clients.set(body.file, Date.now());
      const job = running.get(body.id);
      if (job) {
        running.delete(body.id);
        clearTimeout(job.timer);
        job.resolve(body);
      }
      writeStatusFile();
    } catch (_) {}
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'POST' && url.pathname === '/exec') {
    try {
      const raw = await readBody(req);
      const body = JSON.parse(raw || '{}');
      const code = body.code;
      const targetFile = body.file || null;
      const timeoutMs = Number(body.timeoutMs || 60000);
      if (typeof code !== 'string' || !code.trim()) {
        return sendJson(res, 400, { ok: false, error: 'Missing code' });
      }
      const result = await enqueueJob({ targetFile, code, timeoutMs });
      return sendJson(res, 200, result);
    } catch (e) {
      return sendJson(res, 504, { ok: false, error: e.message });
    }
  }

  sendJson(res, 404, { ok: false, error: 'Not found' });
});

server.listen(PORT, () => {
  writeStatusFile();
  console.log(`Biowave Figma Bridge listening on http://localhost:${PORT}`);
});
