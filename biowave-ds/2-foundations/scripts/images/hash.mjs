// Fingerprint of everything the foundation images depend on.
// docs:images stores it next to the images; docs:check fails when it no longer matches.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const foundations = path.resolve(here, '../..');
const guidelines = path.join(foundations, 'guidelines');
export const stampFile = path.join(guidelines, 'images/source-hash.txt');

const mdFiles = fs.readdirSync(guidelines).filter((f) => f.endsWith('.md')).sort().map((f) => path.join(guidelines, f));
const scriptFiles = fs.readdirSync(here).filter((f) => f.endsWith('.mjs')).sort().map((f) => path.join(here, f));

export function sourceHash() {
  const hash = crypto.createHash('sha256');
  for (const file of [path.join(foundations, 'dist/tokens.json'), ...mdFiles, ...scriptFiles]) {
    // Line endings are normalised so Windows and macOS give the same hash.
    hash.update(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'));
  }
  return hash.digest('hex');
}

export const storedHash = () => (fs.existsSync(stampFile) ? fs.readFileSync(stampFile, 'utf8').trim() : '');
