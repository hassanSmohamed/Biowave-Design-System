for (const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const want = [
  'color/surface/subtle', 'color/icon/subtlest',
  'color/text/default', 'color/text/subtle', 'color/text/subtlest',
  'spacing/xs', 'spacing/md', 'spacing/xl', 'spacing/2xl', 'spacing/3xl',
  'radius/full', 'size/icon/2xl', 'size/icon/3xl',
  'size/container/xs', 'size/container/sm'
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

const TITLE_LG = await figma.importStyleByKeyAsync('2da324fe6d92dee8e8bfb65214f3572272421b71');
const TITLE_MD = await figma.importStyleByKeyAsync('80e371f8315ffdb2da029152a20e42afcd924824');
const BODY_LG = await figma.importStyleByKeyAsync('cc33c6262ef50667e2975e4669f8fff2229373db');
const BODY_MD = await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69');

const searchSet = await figma.importComponentSetByKeyAsync('744f9679cd7bc248d4408574f1fde6ce4384c6b5');
const SEARCH_G = searchSet.children.find(c => c.name === 'Style=Rounded, Fill=Unfilled') || searchSet.defaultVariant;

for (const pn of ['↳ Button']) {
  const p = figma.root.children.find(x => x.name.trim() === pn);
  if (p) await p.loadAsync();
}
const btnEn = await figma.getNodeByIdAsync('116:5183');
const btnAr = await figma.getNodeByIdAsync('116:7271');

const makeBtn = (lang, variant, color, size, label, name) => {
  const set = lang === 'AR' ? btnAr : btnEn;
  const v = set.children.find(x => x.name === `Variant=${variant}, Color=${color}, State=default, Size=${size}`);
  const inst = v.createInstance();
  inst.name = name;
  const defs = set.componentPropertyDefinitions;
  const props = {};
  for (const k of Object.keys(defs)) {
    if (k.startsWith('Label')) props[k] = label;
    if (k.startsWith('Leading icon')) props[k] = false;
    if (k.startsWith('Trailing icon')) props[k] = false;
  }
  inst.setProperties(props);
  return inst;
};

let page = figma.root.children.find(p => p.name.trim() === '↳ Empty state');
if (!page) {
  const inputsIdx = figma.root.children.findIndex(p => p.name.trim() === '↳ Inputs');
  const idx = inputsIdx >= 0 ? inputsIdx : figma.root.children.length;
  page = figma.createPage();
  page.name = '     ↳ Empty state';
  figma.root.insertChild(idx, page);
}
await figma.setCurrentPageAsync(page);
page.setExplicitVariableModeForCollection(typo, '3869:6');
page.setExplicitVariableModeForCollection(grid, '3889:0');

const existing = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Empty state');
if (existing) {
  const sec = page.findOne(n => n.type === 'SECTION' && n.name === 'Empty state — Component');
  return { status: 'exists', page: page.id, set: existing.id, section: sec ? sec.id : null };
}

const area = figma.createSection();
area.name = 'Empty state — Component';
page.appendChild(area);

const COPY = {
  EN: {
    title: 'No matching results',
    desc: 'Try adjusting your filters or search terms.',
    pri: 'Clear filters',
    sec: 'Reset search'
  },
  AR: {
    title: 'لا توجد نتائج مطابقة',
    desc: 'جرّب تعديل الفلاتر أو كلمات البحث للعثور على النتائج.',
    pri: 'مسح الفلاتر',
    sec: 'إعادة ضبط البحث'
  }
};

const comps = [];
for (const sz of ['MD', 'SM']) {
  const isMd = sz === 'MD';
  for (const lang of ['EN', 'AR']) {
    const rtl = lang === 'AR';
    const c = figma.createComponent();
    c.name = `Size=${sz}, Language=${lang}`;
    area.appendChild(c);
    c.layoutMode = 'VERTICAL';
    c.counterAxisAlignItems = 'CENTER';
    c.primaryAxisAlignItems = 'CENTER';
    c.primaryAxisSizingMode = 'AUTO';
    c.counterAxisSizingMode = 'FIXED';
    c.resize(isMd ? 480 : 384, 240);
    c.setBoundVariable('width', V[isMd ? 'size/container/sm' : 'size/container/xs']);
    bind(c, ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'], V[isMd ? 'spacing/3xl' : 'spacing/xl']);
    c.setBoundVariable('itemSpacing', V[isMd ? 'spacing/3xl' : 'spacing/xl']);
    c.fills = [];
    if (rtl) c.setExplicitVariableModeForCollection(typo, '5258:0');

    // visual badge
    const vis = figma.createFrame();
    vis.name = 'visual';
    vis.layoutMode = 'HORIZONTAL';
    vis.primaryAxisAlignItems = 'CENTER';
    vis.counterAxisAlignItems = 'CENTER';
    vis.primaryAxisSizingMode = 'AUTO';
    vis.counterAxisSizingMode = 'AUTO';
    bind(vis, ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'], V[isMd ? 'spacing/3xl' : 'spacing/xl']);
    bind(vis, rads, V['radius/full']);
    vis.fills = [paint(V['color/surface/subtle'])];
    c.appendChild(vis);

    const icon = SEARCH_G.createInstance();
    icon.name = 'icon';
    icon.setBoundVariable('width', V[isMd ? 'size/icon/3xl' : 'size/icon/2xl']);
    icon.setBoundVariable('height', V[isMd ? 'size/icon/3xl' : 'size/icon/2xl']);
    for (const v of icon.findAll(n => 'fills' in n && Array.isArray(n.fills) && n.fills.length && n.type !== 'INSTANCE' && n.type !== 'FRAME')) {
      v.fills = [paint(V['color/icon/subtlest'])];
    }
    vis.appendChild(icon);

    // text-stack
    const ts = figma.createFrame();
    ts.name = 'text-stack';
    ts.layoutMode = 'VERTICAL';
    ts.counterAxisAlignItems = 'CENTER';
    ts.primaryAxisSizingMode = 'AUTO';
    ts.fills = [];
    ts.setBoundVariable('itemSpacing', V[isMd ? 'spacing/md' : 'spacing/xs']);
    c.appendChild(ts);
    ts.layoutSizingHorizontal = 'FILL';

    const ti = figma.createText();
    ti.name = 'title';
    await ti.setTextStyleIdAsync((isMd ? TITLE_LG : TITLE_MD).id);
    ti.characters = COPY[lang].title;
    ti.fills = [paint(V['color/text/default'])];
    ti.textAlignHorizontal = 'CENTER';
    ti.textAutoResize = 'HEIGHT';
    ts.appendChild(ti);
    ti.layoutSizingHorizontal = 'FILL';

    const de = figma.createText();
    de.name = 'description';
    await de.setTextStyleIdAsync((isMd ? BODY_LG : BODY_MD).id);
    de.characters = COPY[lang].desc;
    de.fills = [paint(V[isMd ? 'color/text/subtle' : 'color/text/subtlest'])];
    de.textAlignHorizontal = 'CENTER';
    de.textAutoResize = 'HEIGHT';
    ts.appendChild(de);
    de.layoutSizingHorizontal = 'FILL';

    // actions
    const acts = figma.createFrame();
    acts.name = 'actions';
    acts.layoutMode = 'HORIZONTAL';
    acts.primaryAxisAlignItems = 'CENTER';
    acts.counterAxisAlignItems = 'CENTER';
    acts.primaryAxisSizingMode = 'AUTO';
    acts.counterAxisSizingMode = 'AUTO';
    acts.setBoundVariable('itemSpacing', V['spacing/md']);
    acts.fills = [];
    c.appendChild(acts);

    const bSz = isMd ? 'md' : 'sm';
    const pri = makeBtn(lang, 'filled', 'brand', bSz, COPY[lang].pri, 'primary-action');
    const sec = makeBtn(lang, 'outlined', 'neutral', bSz, COPY[lang].sec, 'secondary-action');
    const ordered = rtl ? [sec, pri] : [pri, sec];
    ordered.forEach(n => acts.appendChild(n));

    comps.push(c);
  }
}

const ES = figma.combineAsVariants(comps, area);
ES.name = 'Empty state';
ES.description = 'Explains why a page, section, card or Data table has no items and offers a clear next action in md or sm size. Spec: 3-web-components/components/empty-state/empty-state.md';

const titleP = ES.addComponentProperty('Title', 'TEXT', 'No matching results');
const descP = ES.addComponentProperty('Description', 'TEXT', 'Try adjusting your filters or search terms.');
const visP = ES.addComponentProperty('Show visual', 'BOOLEAN', true);
const priP = ES.addComponentProperty('Primary action', 'BOOLEAN', true);
const secP = ES.addComponentProperty('Secondary action', 'BOOLEAN', true);

for (const c of ES.children) {
  const g = n => c.findOne(x => x.name === n);
  if (c.name.endsWith('EN')) {
    g('title').componentPropertyReferences = { characters: titleP };
    g('description').componentPropertyReferences = { characters: descP };
  }
  g('visual').componentPropertyReferences = { visible: visP };
  g('primary-action').componentPropertyReferences = { visible: priP };
  g('secondary-action').componentPropertyReferences = { visible: secP };
}

ES.layoutMode = 'NONE';
let y = 40;
let maxX = 0;
for (const sz of ['MD', 'SM']) {
  let x = 40, rh = 0;
  for (const lang of ['EN', 'AR']) {
    const v = ES.children.find(n => n.name === `Size=${sz}, Language=${lang}`);
    v.x = x;
    v.y = y;
    x += v.width + 40;
    rh = Math.max(rh, v.height);
  }
  maxX = Math.max(maxX, x);
  y += rh + 40;
}
ES.resizeWithoutConstraints(maxX, y);
ES.x = 80;
ES.y = 80;
area.resizeWithoutConstraints(Math.max(1200, ES.x + ES.width + 80), Math.max(700, ES.y + ES.height + 80));

return {
  status: 'created',
  page: page.id,
  section: area.id,
  set: ES.id,
  variants: ES.children.length
};
