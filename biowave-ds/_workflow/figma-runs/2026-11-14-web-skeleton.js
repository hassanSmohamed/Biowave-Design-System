const want = [
  'color/background/base/subtle',
  'radius/xs', 'radius/md', 'radius/full',
  'size/container/xs', 'size/container/xxs',
  'size/control/height/md', 'size/control/height/xl',
  'spacing/xl', 'spacing/3xl'
];
const K = {};
for (const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()) {
  if (c.libraryName !== 'Biowave DS — Foundations') continue;
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) {
    if (want.includes(v.name) && !K[v.name]) K[v.name] = v.key;
  }
}
const miss = want.filter(w => !K[w]);
if (miss.length) return { missing: miss };
const V = {};
for (const [n, k] of Object.entries(K)) V[n] = await figma.variables.importVariableByKeyAsync(k);

const typo = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const grid = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205');
const paint = v => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const rads = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];
const bind = (n, ks, v) => { for (const k of ks) n.setBoundVariable(k, v); };

let page = figma.root.children.find(p => p.name.trim() === '↳ Skeleton');
if (!page) {
  const inputsIdx = figma.root.children.findIndex(p => p.name.trim() === '↳ Inputs');
  const idx = inputsIdx >= 0 ? inputsIdx : figma.root.children.length;
  page = figma.createPage();
  page.name = '     ↳ Skeleton';
  figma.root.insertChild(idx, page);
}
await figma.setCurrentPageAsync(page);
page.setExplicitVariableModeForCollection(typo, '3869:6');
page.setExplicitVariableModeForCollection(grid, '3889:0');

const existing = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Skeleton');
if (existing) {
  const sec = page.findOne(n => n.type === 'SECTION' && n.name === 'Skeleton — Component');
  return { status: 'exists', page: page.id, set: existing.id, section: sec ? sec.id : null };
}

const area = figma.createSection();
area.name = 'Skeleton — Component';
page.appendChild(area);

const comps = [];

// 1. Line
{
  const c = figma.createComponent();
  c.name = 'Shape=Line';
  area.appendChild(c);
  c.resize(384, 16);
  c.setBoundVariable('width', V['size/container/xs']);
  c.setBoundVariable('height', V['spacing/xl']);
  bind(c, rads, V['radius/xs']);
  c.fills = [paint(V['color/background/base/subtle'])];
  comps.push(c);
}

// 2. Circle
{
  const c = figma.createComponent();
  c.name = 'Shape=Circle';
  area.appendChild(c);
  c.resize(40, 40);
  c.setBoundVariable('width', V['size/control/height/md']);
  c.setBoundVariable('height', V['size/control/height/md']);
  bind(c, rads, V['radius/full']);
  c.fills = [paint(V['color/background/base/subtle'])];
  comps.push(c);
}

// 3. Block
{
  const c = figma.createComponent();
  c.name = 'Shape=Block';
  area.appendChild(c);
  c.layoutMode = 'VERTICAL';
  c.primaryAxisSizingMode = 'AUTO';
  c.counterAxisSizingMode = 'FIXED';
  c.resize(320, 112);
  c.setBoundVariable('width', V['size/container/xxs']);
  bind(c, ['paddingTop', 'paddingBottom'], V['size/control/height/xl']);
  bind(c, rads, V['radius/md']);
  c.fills = [paint(V['color/background/base/subtle'])];
  comps.push(c);
}

const SS = figma.combineAsVariants(comps, area);
SS.name = 'Skeleton';
SS.layoutMode = 'VERTICAL';
SS.layoutWrap = 'NO_WRAP';
SS.counterAxisAlignItems = 'MIN';
SS.setBoundVariable('itemSpacing', V['spacing/xl']);
bind(SS, ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'], V['spacing/xl']);
SS.fills = [];
SS.description = 'Low-contrast animated placeholder (`line`, `circle`, `block`) reusing existing subtle background tokens to preview layout while content loads. Spec: 3-web-components/components/skeleton/skeleton.md';

SS.x = 80;
SS.y = 80;
area.resizeWithoutConstraints(Math.max(800, SS.x + SS.width + 80), Math.max(480, SS.y + SS.height + 80));

return {
  status: 'created',
  page: page.id,
  section: area.id,
  set: SS.id,
  variants: SS.children.map(v => ({ name: v.name, w: Math.round(v.width), h: Math.round(v.height) }))
};
