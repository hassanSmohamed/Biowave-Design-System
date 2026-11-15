for (const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const want = [
  'color/background/info/subtlest', 'color/background/success/subtlest', 'color/background/warning/subtlest', 'color/background/error/subtlest', 'color/surface/subtle',
  'color/border/info', 'color/border/success', 'color/border/warning', 'color/border/error', 'color/border/default',
  'color/icon/role/info', 'color/icon/role/success', 'color/icon/role/warning', 'color/icon/role/error', 'color/icon/subtle',
  'color/text/role/info', 'color/text/role/success', 'color/text/role/warning', 'color/text/role/error', 'color/text/default',
  'spacing/xs', 'spacing/lg', 'spacing/xl', 'radius/md', 'border/width/default',
  'size/icon/lg', 'size/container/lg'
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
const strokes = ['strokeTopWeight', 'strokeBottomWeight', 'strokeLeftWeight', 'strokeRightWeight'];
const bind = (n, ks, v) => { for (const k of ks) n.setBoundVariable(k, v); };

const TITLE_MD = await figma.importStyleByKeyAsync('80e371f8315ffdb2da029152a20e42afcd924824');
const BODY_MD = await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69');

const gly = async k => {
  const s = await figma.importComponentSetByKeyAsync(k);
  return s.children.find(c => c.name === 'Style=Rounded, Fill=Unfilled') || s.defaultVariant;
};
const G = {
  Info: await gly('1a5ce5356055e28237bb66c81c0d787a00896698'),
  Success: await gly('f80e17d72d468f025b926c73aaeefd73a5ca5410'),
  Warning: await gly('a3e59dd796f70814461803f15a547cea25021f89'),
  Error: await gly('aa594051025acfef3ec05fd545aa033af18edf25'),
  Neutral: await gly('0b32136df031bc4e9f23088a3383f5548cc5a47d'),
  Close: await gly('e59e13c612139f0079fe8e1c86a696f24a335eec')
};

for (const pn of ['↳ Button', '↳ Icon Button']) {
  const p = figma.root.children.find(x => x.name.trim() === pn);
  if (p) await p.loadAsync();
}
const btnEn = await figma.getNodeByIdAsync('116:5183');
const btnAr = await figma.getNodeByIdAsync('116:7271');
const iconBtn = await figma.getNodeByIdAsync('116:30310');

const makeBtn = (lang, color, label) => {
  const set = lang === 'AR' ? btnAr : btnEn;
  const v = set.children.find(x => x.name === `Variant=outlined, Color=${color}, State=default, Size=sm`);
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
    try { app.setProperties({ Color: 'neutral', Variant: 'transparent', State: 'default' }); } catch (e) {}
  }
  const ic = inst.findOne(n => n.type === 'INSTANCE' && n.name.includes('Icon configuration'));
  if (ic) {
    const outK = Object.keys(ic.componentProperties).find(k => k.startsWith('Outlined icon'));
    const fillK = Object.keys(ic.componentProperties).find(k => k.startsWith('Filled icon'));
    const upd = {};
    if (outK) upd[outK] = G.Close.id;
    if (fillK) upd[fillK] = G.Close.id;
    try { ic.setProperties(upd); } catch (e) {}
  }
  return inst;
};

let page = figma.root.children.find(p => p.name.trim() === '↳ Alert');
if (!page) {
  const inputsIdx = figma.root.children.findIndex(p => p.name.trim() === '↳ Inputs');
  const idx = inputsIdx >= 0 ? inputsIdx : figma.root.children.length;
  page = figma.createPage();
  page.name = '     ↳ Alert';
  figma.root.insertChild(idx, page);
}
await figma.setCurrentPageAsync(page);
page.setExplicitVariableModeForCollection(typo, '3869:6');
page.setExplicitVariableModeForCollection(grid, '3889:0');

const existing = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Alert');
if (existing) {
  const sec = page.findOne(n => n.type === 'SECTION' && n.name === 'Alert — Component');
  return { status: 'exists', page: page.id, set: existing.id, section: sec ? sec.id : null };
}

const TOK = {
  Info: { bg: 'color/background/info/subtlest', bd: 'color/border/info', ic: 'color/icon/role/info', ti: 'color/text/role/info', btn: 'info' },
  Success: { bg: 'color/background/success/subtlest', bd: 'color/border/success', ic: 'color/icon/role/success', ti: 'color/text/role/success', btn: 'success' },
  Warning: { bg: 'color/background/warning/subtlest', bd: 'color/border/warning', ic: 'color/icon/role/warning', ti: 'color/text/role/warning', btn: 'warning' },
  Error: { bg: 'color/background/error/subtlest', bd: 'color/border/error', ic: 'color/icon/role/error', ti: 'color/text/role/error', btn: 'error' },
  Neutral: { bg: 'color/surface/subtle', bd: 'color/border/default', ic: 'color/icon/subtle', ti: 'color/text/default', btn: 'neutral' }
};

const COPY = {
  Info: {
    EN: ['Shift update scheduled', 'New attendance rules take effect on Monday.', 'Review'],
    AR: ['تحديث مجدول للمناوبات', 'تبدأ قواعد الحضور الجديدة يوم الإثنين.', 'مراجعة']
  },
  Success: {
    EN: ['Device synced', 'All biometric logs were uploaded successfully.', 'View'],
    AR: ['تمت مزامنة الجهاز', 'تم رفع جميع سجلات البصمة بنجاح.', 'عرض']
  },
  Warning: {
    EN: ['Unsaved changes', 'Some shift edits have not been published yet.', 'Publish'],
    AR: ['تغييرات غير محفوظة', 'بعض تعديلات المناوبة لم تُنشر بعد.', 'نشر']
  },
  Error: {
    EN: ['Connection lost', 'Check your network settings and try again.', 'Retry'],
    AR: ['انقطع الاتصال', 'تحقّق من إعدادات الشبكة وأعد المحاولة.', 'إعادة المحاولة']
  },
  Neutral: {
    EN: ['System tip', 'Use saved filter views to compare branches faster.', 'Learn more'],
    AR: ['نصيحة للنظام', 'استخدم الفلاتر المحفوظة لمقارنة الفروع أسرع.', 'المزيد']
  }
};

const area = figma.createSection();
area.name = 'Alert — Component';
page.appendChild(area);

const comps = [];
for (const st of ['Info', 'Success', 'Warning', 'Error', 'Neutral']) {
  const tk = TOK[st];
  for (const lang of ['EN', 'AR']) {
    const rtl = lang === 'AR';
    const c = figma.createComponent();
    c.name = `Status=${st}, Language=${lang}`;
    area.appendChild(c);
    c.layoutMode = 'HORIZONTAL';
    c.counterAxisAlignItems = 'CENTER';
    c.primaryAxisSizingMode = 'AUTO';
    c.counterAxisSizingMode = 'FIXED';
    c.resize(640, 80);
    c.setBoundVariable('width', V['size/container/lg']);
    c.primaryAxisSizingMode = 'FIXED';
    c.counterAxisSizingMode = 'AUTO';
    bind(c, ['paddingTop', 'paddingBottom'], V['spacing/lg']);
    bind(c, ['paddingLeft', 'paddingRight'], V['spacing/xl']);
    c.setBoundVariable('itemSpacing', V['spacing/lg']);
    bind(c, rads, V['radius/md']);
    c.fills = [paint(V[tk.bg])];
    c.strokes = [paint(V[tk.bd])];
    c.strokeAlign = 'INSIDE';
    bind(c, strokes, V['border/width/default']);
    if (rtl) c.setExplicitVariableModeForCollection(typo, '5258:0');

    const icon = G[st].createInstance();
    icon.name = 'icon';
    icon.setBoundVariable('width', V['size/icon/lg']);
    icon.setBoundVariable('height', V['size/icon/lg']);
    for (const v of icon.findAll(n => 'fills' in n && Array.isArray(n.fills) && n.fills.length && n.type !== 'INSTANCE' && n.type !== 'FRAME')) {
      v.fills = [paint(V[tk.ic])];
    }

    const content = figma.createFrame();
    content.name = 'content';
    content.layoutMode = 'VERTICAL';
    content.primaryAxisSizingMode = 'AUTO';
    content.fills = [];
    content.setBoundVariable('itemSpacing', V['spacing/xs']);

    const ti = figma.createText();
    ti.name = 'title';
    await ti.setTextStyleIdAsync(TITLE_MD.id);
    ti.characters = COPY[st][lang][0];
    ti.fills = [paint(V[tk.ti])];
    ti.textAutoResize = 'HEIGHT';
    if (rtl) ti.textAlignHorizontal = 'RIGHT';
    content.appendChild(ti);
    ti.layoutSizingHorizontal = 'FILL';

    const de = figma.createText();
    de.name = 'description';
    await de.setTextStyleIdAsync(BODY_MD.id);
    de.characters = COPY[st][lang][1];
    de.fills = [paint(V['color/text/default'])];
    de.textAutoResize = 'HEIGHT';
    if (rtl) de.textAlignHorizontal = 'RIGHT';
    content.appendChild(de);
    de.layoutSizingHorizontal = 'FILL';

    const act = makeBtn(lang, tk.btn, COPY[st][lang][2]);
    const cb = makeCloseBtn();

    const nodes = [icon, content, act, cb];
    (rtl ? nodes.reverse() : nodes).forEach(n => c.appendChild(n));
    content.layoutSizingHorizontal = 'FILL';

    comps.push(c);
  }
}

const AL = figma.combineAsVariants(comps, area);
AL.name = 'Alert';
AL.description = 'An inline banner that communicates important contextual status inside a page, section, form or dialog. Spec: 3-web-components/components/alert/alert.md';

const titleP = AL.addComponentProperty('Title', 'TEXT', 'Shift update scheduled');
const descP = AL.addComponentProperty('Description', 'TEXT', 'New attendance rules take effect on Monday.');
const showTitleP = AL.addComponentProperty('Show title', 'BOOLEAN', true);
const actP = AL.addComponentProperty('Action', 'BOOLEAN', true);
const closeP = AL.addComponentProperty('Close button', 'BOOLEAN', true);

for (const c of AL.children) {
  const g = n => c.findOne(x => x.name === n);
  if (c.name.endsWith('EN')) {
    g('title').componentPropertyReferences = { characters: titleP };
    g('description').componentPropertyReferences = { characters: descP };
  }
  g('title').componentPropertyReferences = {
    ...(g('title').componentPropertyReferences || {}),
    visible: showTitleP
  };
  g('action').componentPropertyReferences = { visible: actP };
  g('close-button').componentPropertyReferences = { visible: closeP };
}

AL.layoutMode = 'NONE';
let y = 40, maxX = 0;
for (const st of ['Info', 'Success', 'Warning', 'Error', 'Neutral']) {
  let x = 40, rh = 0;
  for (const lang of ['EN', 'AR']) {
    const v = AL.children.find(n => n.name === `Status=${st}, Language=${lang}`);
    v.x = x;
    v.y = y;
    x += v.width + 40;
    rh = Math.max(rh, v.height);
  }
  maxX = Math.max(maxX, x);
  y += rh + 40;
}
AL.resizeWithoutConstraints(maxX, y);
AL.x = 80;
AL.y = 80;
area.resizeWithoutConstraints(Math.max(1500, AL.x + AL.width + 80), Math.max(800, AL.y + AL.height + 80));

return {
  status: 'created',
  page: page.id,
  section: area.id,
  set: AL.id,
  variants: AL.children.length
};
