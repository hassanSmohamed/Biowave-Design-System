import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, '../..');
const LOCAL_DIR = path.resolve(ROOT, '_workflow/.local');
const TOKEN_FILE = path.join(LOCAL_DIR, 'bridge-token');
const OUT_DIR = path.resolve(ROOT, '_workflow/screenshots/wave9-web');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const token = fs.existsSync(TOKEN_FILE) ? fs.readFileSync(TOKEN_FILE, 'utf8').trim() : '';

async function runFigma(code, targetFile = 'Web Components') {
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
  { id: '691:219739', file: 'web-alert-set.png', label: 'Alert Set' },
  { id: '694:220191', file: 'web-snackbar-set.png', label: 'Snackbar Set' },
  { id: '694:220298', file: 'web-empty-state-set.png', label: 'Empty State Set' },
  { id: '694:219746', file: 'web-skeleton-set.png', label: 'Skeleton Set' },
  { id: '697:8734', file: 'web-alert-docs.png', label: 'Alert Docs' },
  { id: '699:7445', file: 'web-snackbar-docs.png', label: 'Snackbar Docs' },
  { id: '699:9786', file: 'web-empty-state-docs.png', label: 'Empty State Docs' },
  { id: '700:11340', file: 'web-skeleton-docs.png', label: 'Skeleton Docs' }
];

async function main() {
  console.log('Capturing screenshots for Web Components...');

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
      const result = await runFigma(code, 'Web Components');
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
