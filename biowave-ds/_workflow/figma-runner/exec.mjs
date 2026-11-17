#!/usr/bin/env node
// Send a script file to the running Biowave Figma Bridge and print the result.
// Usage: node _workflow/figma-runner/exec.mjs <script.js> [targetFileSubstring]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DIR = path.resolve(DIR, '../.local');
const STATUS_FILE = path.join(LOCAL_DIR, 'figma-bridge-v2-status.json');
const TOKEN_FILE = path.join(LOCAL_DIR, 'bridge-token');
const PORT = Number(process.env.FIGMA_BRIDGE_PORT || 9876);
const HOST = '127.0.0.1';

const [scriptPath, targetFile] = process.argv.slice(2);

if (!scriptPath || scriptPath === '--status') {
  if (fs.existsSync(STATUS_FILE)) {
    console.log(fs.readFileSync(STATUS_FILE, 'utf8'));
    process.exit(0);
  }
  console.error('Bridge status file not found. Start bridge.mjs first.');
  process.exit(1);
}

const code = fs.readFileSync(scriptPath, 'utf8');
const timeoutMs = Number(process.env.FIGMA_TIMEOUT_MS || 180000);

let token = '';
if (fs.existsSync(TOKEN_FILE)) {
  try {
    token = fs.readFileSync(TOKEN_FILE, 'utf8').trim();
  } catch (_) {}
}

async function runViaHttp() {
  const url = `http://${HOST}:${PORT}/exec`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bridge-Token': token
      },
      body: JSON.stringify({ code, file: targetFile || null, timeoutMs }),
      signal: AbortSignal.timeout(timeoutMs + 5000)
    });
    const out = await res.json();
    if (!out.ok) {
      console.error(`✗ Error (${out.file || 'bridge'}):`, out.text || out.error);
      process.exit(1);
    }
    console.log(out.text);
    process.exit(0);
  } catch (err) {
    if (err.name === 'AbortError' || err.name === 'TimeoutError') {
      console.error('✗ Timed out waiting for bridge response.');
      process.exit(1);
    }
    // Fall back to file queue if fetch connection refused (e.g. bridge restarting)
    return false;
  }
}

async function runViaFileQueue() {
  const id = crypto.randomUUID();
  const reqPath = path.join(LOCAL_DIR, `v2-req-${id}.json`);
  const resPath = path.join(LOCAL_DIR, `v2-res-${id}.json`);

  fs.writeFileSync(reqPath, JSON.stringify({ id, code, file: targetFile || null, timeoutMs }, null, 2));

  const started = Date.now();
  while (Date.now() - started < timeoutMs + 2000) {
    if (fs.existsSync(resPath)) {
      const raw = fs.readFileSync(resPath, 'utf8');
      if (raw.trim()) {
        const out = JSON.parse(raw);
        try { fs.unlinkSync(resPath); } catch (_) {}
        if (!out.ok) {
          console.error(`✗ Error (${out.file || 'bridge'}):`, out.text || out.error);
          process.exit(1);
        }
        console.log(out.text);
        process.exit(0);
      }
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  console.error('✗ Timed out waiting for bridge response.');
  process.exit(1);
}

const httpDone = await runViaHttp();
if (!httpDone) {
  await runViaFileQueue();
}
