import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, '../..');
const LOCAL_DIR = path.resolve(ROOT, '_workflow/.local');
const TOKEN_FILE = path.join(LOCAL_DIR, 'bridge-token');
const OUT_DIR = path.resolve(ROOT, '_workflow/screenshots/wave9-mobile');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const token = fs.existsSync(TOKEN_FILE) ? fs.readFileSync(TOKEN_FILE, 'utf8').trim() : '';

async function runFigma(code, targetFile = 'Mobile') {
  const res = await fetch('http://127.0.0.1:9876/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Bridge-Token': token
    },
    body: JSON.stringify({ code, file: targetFile, timeoutMs: 180000 })
  });
  const data = await res.json();
  if (!data.ok) {
    throw new Error(data.text || data.error || 'Execution failed');
  }
  return typeof data.text === 'string' ? JSON.parse(data.text) : data.text;
}

const targets = [
  { id: '181:16391', file: 'mobile-alert-set.png', label: 'Alert Set' },
  { id: '181:16450', file: 'mobile-snackbar-set.png', label: 'Snackbar Set' },
  { id: '181:16557', file: 'mobile-empty-state-set.png', label: 'Empty State Set' },
  { id: '181:16563', file: 'mobile-skeleton-set.png', label: 'Skeleton Set' },
  { id: '181:21193', file: 'mobile-alert-docs.png', label: 'Alert Docs' },
  { id: '181:23218', file: 'mobile-snackbar-docs.png', label: 'Snackbar Docs' },
  { id: '181:25525', file: 'mobile-empty-state-docs.png', label: 'Empty State Docs' },
  { id: '181:27012', file: 'mobile-skeleton-docs.png', label: 'Skeleton Docs' }
];

async function main() {
  console.log('Capturing screenshots for Mobile Components...');

  for (const t of targets) {
    process.stdout.write(`Exporting ${t.label} (${t.id})... `);
    const code = `
      const node = await figma.getNodeByIdAsync('${t.id}');
      if (!node) return { ok: false, error: 'Node not found: ${t.id}' };
      const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } });
      const b64 = figma.base64Encode(bytes);
      return { ok: true, name: node.name, base64: b64, size: bytes.length };
    `;

    try {
      const result = await runFigma(code, 'Mobile');
      if (!result.ok) {
        console.log(`FAILED: ${result.error}`);
        continue;
      }
      const dest = path.join(OUT_DIR, t.file);
      const buf = Buffer.from(result.base64, 'base64');
      fs.writeFileSync(dest, buf);
      console.log(`✓ saved to ${t.file} (${Math.round(buf.length / 1024)} KB)`);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  }

  console.log('Done!');
}

main();
