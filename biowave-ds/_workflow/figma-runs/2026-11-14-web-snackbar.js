for (const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const want = [
  'color/surface/inverse', 'color/text/inverse', 'color/icon/inverse',
  'spacing/xs', 'spacing/md', 'spacing/lg', 'spacing/xl', 'spacing/3xl',
  'radius/md', 'size/icon/md', 'size/container/xs', 'size/container/sm', 'size/control/height/lg'
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

const BODY_SM = await figma.importStyleByKeyAsync('49f1d79a1ea0f0083dde003404f6295314f8804b');
const EL3 = await figma.importStyleByKeyAsync('a6ffc0d435b5e225dd534e3df14eee3e2dba22b0');

const gly = async k => {
  const s = await figma.importComponentSetByKeyAsync(k);
  return s.children.find(c => c.name === 'Style=Rounded, Fill=Unfilled') || s.defaultVariant;
};
const CHECK_C = await gly('f80e17d72d468f025b926c73aaeefd73a5ca5410');
const CLOSE_G = await gly('e59e13c612139f0079fe8e1c86a696f24a335eec');

for (const pn of ['↳ Button', '↳ Icon Button']) {
  const p = figma.root.children.find(x => x.name.trim() === pn);
  if (p) await p.loadAsync();
}
const btnEn = await figma.getNodeByIdAsync('116:5183');
const btnAr = await figma.getNodeByIdAsync('116:7271');
const iconBtn = await figma.getNodeByIdAsync('116:30310');

const makeBtn = (lang, label) => {
  const set = lang === 'AR' ? btnAr : btnEn;
  const v = set.children.find(x => x.name === 'Variant=text, Color=inverse, State=default, Size=sm');
  const inst = v.createInstance();
  inst.name = 'action';
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

const makeCloseBtn = () => {
  const v = iconBtn.children.find(x => x.name === 'Toggle=false, Selected=false, Size=sm') || iconBtn.defaultVariant;
  const inst = v.createInstance();
  inst.name = 'close-button';
  const app = inst.findOne(n => n.type === 'INSTANCE' && n.name.includes('Appearance'));
  if (app) {
    try { app.setProperties({ Color: 'inverse', Variant: 'transparent', State: 'default' }); } catch (e) {}
  }
  const ic = inst.findOne(n => n.type === 'INSTANCE' && n.name.includes('Icon configuration'));
  if (ic) {
    const outK = Object.keys(ic.componentProperties).find(k => k.startsWith('Outlined icon'));
    const fillK = Object.keys(ic.componentProperties).find(k => k.startsWith('Filled icon'));
    const upd = {};
    if (outK) upd[outK] = CLOSE_G.id;
    if (fillK) upd[fillK] = CLOSE_G.id;
    try { ic.setProperties(upd); } catch (e) {}
  }
  return inst;
};

let page = figma.root.children.find(p => p.name.trim() === '↳ Snackbar');
if (!page) {
  const inputsIdx = figma.root.children.findIndex(p => p.name.trim() === '↳ Inputs');
  const idx = inputsIdx >= 0 ? inputsIdx : figma.root.children.length;
  page = figma.createPage();
  page.name = '     ↳ Snackbar';
  figma.root.insertChild(idx, page);
}
await figma.setCurrentPageAsync(page);
page.setExplicitVariableModeForCollection(typo, '3869:6');
page.setExplicitVariableModeForCollection(grid, '3889:0');

const existing = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Snackbar');
if (existing) {
  const sec = page.findOne(n => n.type === 'SECTION' && n.name === 'Snackbar — Component');
  return { status: 'exists', page: page.id, set: existing.id, section: sec ? sec.id : null };
}

const area = figma.createSection();
area.name = 'Snackbar — Component';
page.appendChild(area);

const COPY = {
  EN: { msg: 'Device settings updated.', act: 'Undo' },
  AR: { msg: 'تم تحديث إعدادات الجهاز.', act: 'تراجع' }
};

const comps = [];
for (const act of ['None', 'With action']) {
  for (const lang of ['EN', 'AR']) {
    const rtl = lang === 'AR';
    const c = figma.createComponent();
    c.name = `Action=${act}, Language=${lang}`;
    area.appendChild(c);
    c.layoutMode = 'HORIZONTAL';
    c.counterAxisAlignItems = 'CENTER';
    c.primaryAxisSizingMode = 'AUTO';
    c.counterAxisSizingMode = 'AUTO';
    c.minWidth = 384;
    c.maxWidth = 480;
    c.minHeight = 48;
    c.setBoundVariable('minWidth', V['size/container/xs']);
    c.setBoundVariable('maxWidth', V['size/container/sm']);
    c.setBoundVariable('minHeight', V['size/control/height/lg']);
    bind(c, ['paddingLeft', 'paddingRight'], V['spacing/xl']);
    bind(c, ['paddingTop', 'paddingBottom'], V['spacing/md']);
    bind(c, rads, V['radius/md']);
    c.setBoundVariable('itemSpacing', V['spacing/lg']);
    c.fills = [paint(V['color/surface/inverse'])];
    await c.setEffectStyleIdAsync(EL3.id);
    if (rtl) c.setExplicitVariableModeForCollection(typo, '5258:0');

    const icon = CHECK_C.createInstance();
    icon.name = 'icon';
    icon.setBoundVariable('width', V['size/icon/md']);
    icon.setBoundVariable('height', V['size/icon/md']);
    for (const v of icon.findAll(n => 'fills' in n && Array.isArray(n.fills) && n.fills.length && n.type !== 'INSTANCE' && n.type !== 'FRAME')) {
      v.fills = [paint(V['color/icon/inverse'])];
    }
    icon.visible = false;

    const msg = figma.createText();
    msg.name = 'message';
    await msg.setTextStyleIdAsync(BODY_SM.id);
    msg.characters = COPY[lang].msg;
    msg.fills = [paint(V['color/text/inverse'])];
    msg.textAutoResize = 'HEIGHT';
    if (rtl) msg.textAlignHorizontal = 'RIGHT';

    const cb = makeCloseBtn();

    const nodes = [icon, msg];
    if (act === 'With action') {
      const b = makeBtn(lang, COPY[lang].act);
      nodes.push(b);
    }
    nodes.push(cb);
    (rtl ? nodes.reverse() : nodes).forEach(n => c.appendChild(n));
    msg.layoutSizingHorizontal = 'FILL';

    comps.push(c);
  }
}

const SN = figma.combineAsVariants(comps, area);
SN.name = 'Snackbar';
SN.description = 'A brief, high-contrast inverse bar at layer-toast (1500) that confirms an action or offers a single follow-up without interrupting the user. Spec: 3-web-components/components/snackbar/snackbar.md';

const msgP = SN.addComponentProperty('Message', 'TEXT', 'Device settings updated.');
const actLblP = SN.addComponentProperty('Action label', 'TEXT', 'Undo');
const iconP = SN.addComponentProperty('Show icon', 'BOOLEAN', false);
const closeP = SN.addComponentProperty('Close button', 'BOOLEAN', true);

for (const c of SN.children) {
  const g = n => c.findOne(x => x.name === n);
  if (c.name.endsWith('EN')) g('message').componentPropertyReferences = { characters: msgP };
  g('icon').componentPropertyReferences = { visible: iconP };
  g('close-button').componentPropertyReferences = { visible: closeP };
}

SN.layoutMode = 'NONE';
let y = 40;
let maxX = 0;
for (const act of ['None', 'With action']) {
  let x = 40, rh = 0;
  for (const lang of ['EN', 'AR']) {
    const v = SN.children.find(n => n.name === `Action=${act}, Language=${lang}`);
    v.x = x;
    v.y = y;
    x += v.width + 40;
    rh = Math.max(rh, v.height);
  }
  maxX = Math.max(maxX, x);
  y += rh + 40;
}
SN.resizeWithoutConstraints(maxX, y);
SN.x = 80;
SN.y = 80;
area.resizeWithoutConstraints(Math.max(1040, SN.x + SN.width + 80), Math.max(400, SN.y + SN.height + 80));

return {
  status: 'created',
  page: page.id,
  section: area.id,
  set: SN.id,
  variants: SN.children.length
};
