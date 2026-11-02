// npm run docs:images — regenerates 2-foundations/guidelines/images/*.png.
// Skips rendering when nothing changed. --force renders anyway.
import fs from 'node:fs';
import path from 'node:path';
import { sourceHash, storedHash, stampFile } from './hash.mjs';

const current = sourceHash();
if (current === storedHash() && !process.argv.includes('--force')) {
  console.log('✓ docs:images — up to date');
  process.exit(0);
}

try {
  const { shoot } = await import('./kit.mjs');
  const { pages: grid } = await import('./grid.mjs');
  const { pages: rest } = await import('./foundations.mjs');
  await shoot([...grid, ...rest], path.dirname(stampFile));
  fs.writeFileSync(stampFile, current + '\n');
  console.log(`✓ docs:images — ${grid.length + rest.length} images`);
} catch (error) {
  console.error(`✗ docs:images — ${error.message}`);
  if (/Executable doesn't exist|playwright install/i.test(error.message)) console.error('  Run: npx playwright install chromium');
  process.exit(1);
}
