// npm run docs:images — regenerates 2-foundations/guidelines/images/*.png from dist/tokens.json
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shoot } from './kit.mjs';
import { pages as grid } from './grid.mjs';
import { pages as rest } from './foundations.mjs';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../guidelines/images');
await shoot([...grid, ...rest], out);
console.log(`✓ docs:images — ${grid.length + rest.length} images`);
