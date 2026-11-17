// Build Accordion Component Set in Biowave DS [PDS-264] — Web Components
for (const f of [
  ['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'],
  ['IBM Plex Sans Arabic', 'Regular'], ['IBM Plex Sans Arabic', 'Medium'], ['IBM Plex Sans Arabic', 'SemiBold']
]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const K = {
  "color/surface/default": "2013a1c60d84d2bac2524fd0c32229e20cc341a1",
  "color/surface/subtle": "5963036a1ce77158a13d05d89008d80267f7be1f",
  "color/border/default": "ad520e82898707a0d3112a12f6f9439566c6d6c4",
  "color/border/subtle": "07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112",
  "color/border/brand": "50ddd3d7028ede7c14f73576869a28588b0c3b7d",
  "color/text/default": "4ea63d9ab5254c4df4eba4d26f771377a07929c4",
  "color/text/subtle": "dac97f2fd2a80ccffd6283bcc06c623f64ebe90a",
  "color/text/disabled": "f88c10f90f454d356c14cc3240da0f04eafbbedd",
  "color/icon/default": "b0844bd913aafe8789a44bc7b647058cdae299df",
  "color/icon/subtle": "fc66c13d6c036489bf774535cd8dbbf749795748",
  "radius/md": "0758e506cdfd4d7a4eef6369a4851133d7eab5a4",
  "spacing/none": "4879183c164f25d975ac0a8664388a77a2073b80",
  "spacing/xs": "9ea993d003d5368c5100b038d51c7c8f3e95c115",
  "spacing/sm": "8332b62aa90dea8417383c59a11eee680e0f1db5",
  "spacing/md": "58c93e3cec1b6ba603371a027483e101adcef4f0",
  "spacing/lg": "6976021b7dd1218f670faa6dd403943fbe7b2638",
  "spacing/xl": "5fa0c2ce8ae034e9696038d2704e520fd8383e55",
  "size/control/height/lg": "14c0f56d2add6f7149374e67cf4d3a2656aeb5dc",
  "size/icon/md": "eb459c673e6ca16e3c81b240f04b467717953a9a"
};

const V = {};
for (const [n, k] of Object.entries(K)) {
  V[n] = await figma.variables.importVariableByKeyAsync(k);
}

const typo = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const grid = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205');

const paint = v => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const rads = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];
const bind = (n, ks, v) => { for (const k of ks) n.setBoundVariable(k, v); };

const TITLE_MD = await figma.importStyleByKeyAsync('80e371f8315ffdb2da029152a20e42afcd924824');
const BODY_MD = await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69');
const BODY_SM = await figma.importStyleByKeyAsync('49f1d79a1ea0f0083dde003404f6295314f8804b');

const CHEVRON_G = await figma.importComponentByKeyAsync('7614dc418009adcc275d35ff07afcb7b4f62b1fd'); // expand_more
const INFO_G = await figma.importComponentByKeyAsync('e08b509b26ac62a48693567e87f8b43551150599');    // help / info

// Page setup
let page = figma.root.children.find(p => p.name.trim() === '↳ Accordion');
if (!page) {
  page = figma.createPage();
  page.name = '↳ Accordion';
  const idx = figma.root.children.findIndex(p => p.name.includes('Skeleton') || p.name.includes('Empty state'));
  if (idx !== -1) figma.root.insertChild(idx + 1, page);
}
await page.loadAsync();
await figma.setCurrentPageAsync(page);
if (typo) page.setExplicitVariableModeForCollection(typo, '3869:6'); // Web · EN
if (grid) page.setExplicitVariableModeForCollection(grid, '3889:0'); // Web

// Clean existing component section if present
const existingSec = page.children.find(c => c.name === 'Accordion — Component');
if (existingSec) existingSec.remove();

const sec = figma.createSection();
sec.name = 'Accordion — Component';
sec.x = 0;
sec.y = 0;
page.appendChild(sec);

// Build variant helper
const makeVariant = async (expanded, lang) => {
  const comp = figma.createComponent();
  comp.name = `Expanded=${expanded}, Language=${lang}`;
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(640, 100);
  comp.itemSpacing = 0;
  bind(comp, rads, V['radius/md']);
  comp.strokes = [paint(V['color/border/default'])];
  comp.strokeWeight = 1;
  comp.fills = [paint(V['color/surface/default'])];
  comp.clipsContent = true;

  // Header frame
  const header = figma.createFrame();
  header.name = 'header';
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'AUTO';
  header.layoutAlign = 'STRETCH';
  header.counterAxisAlignItems = 'CENTER';
  header.minHeight = 48;
  header.setBoundVariable('paddingLeft', V['spacing/xl']);
  header.setBoundVariable('paddingRight', V['spacing/xl']);
  header.setBoundVariable('paddingTop', V['spacing/xl']);
  header.setBoundVariable('paddingBottom', V['spacing/xl']);
  header.setBoundVariable('itemSpacing', V['spacing/lg']);
  header.fills = [];

  // Leading icon
  const iconInst = INFO_G.createInstance();
  iconInst.name = 'leading-icon';
  iconInst.resize(20, 20);
  bind(iconInst, ['width', 'height'], V['size/icon/md']);
  for (const v of iconInst.findAll(n => n.type === 'VECTOR')) {
    v.fills = [paint(V['color/icon/subtle'])];
  }

  // Text group
  const textGroup = figma.createFrame();
  textGroup.name = 'text-group';
  textGroup.layoutMode = 'VERTICAL';
  textGroup.primaryAxisSizingMode = 'AUTO';
  textGroup.counterAxisSizingMode = 'FIXED';
  textGroup.layoutGrow = 1;
  textGroup.setBoundVariable('itemSpacing', V['spacing/xs']);
  textGroup.fills = [];

  const title = figma.createText();
  title.name = 'title';
  title.characters = lang === 'AR' ? 'عنوان القسم' : 'Section title';
  await title.setRangeTextStyleIdAsync(0, title.characters.length, TITLE_MD.id);
  title.fills = [paint(V['color/text/default'])];
  title.layoutAlign = 'STRETCH';
  if (lang === 'AR') title.textAlignHorizontal = 'RIGHT';

  const subtitle = figma.createText();
  subtitle.name = 'subtitle';
  subtitle.characters = lang === 'AR' ? 'وصف أو نص توضيحي إضافي' : 'Optional description or helper text';
  await subtitle.setRangeTextStyleIdAsync(0, subtitle.characters.length, BODY_SM.id);
  subtitle.fills = [paint(V['color/text/subtle'])];
  subtitle.layoutAlign = 'STRETCH';
  if (lang === 'AR') subtitle.textAlignHorizontal = 'RIGHT';

  textGroup.appendChild(title);
  textGroup.appendChild(subtitle);

  // Chevron icon
  const chevron = CHEVRON_G.createInstance();
  chevron.name = 'chevron';
  chevron.resize(20, 20);
  bind(chevron, ['width', 'height'], V['size/icon/md']);
  for (const v of chevron.findAll(n => n.type === 'VECTOR')) {
    v.fills = [paint(V['color/icon/subtle'])];
  }
  if (expanded) {
    chevron.rotation = 180;
  }

  if (lang === 'AR') {
    header.appendChild(chevron);
    header.appendChild(textGroup);
    header.appendChild(iconInst);
  } else {
    header.appendChild(iconInst);
    header.appendChild(textGroup);
    header.appendChild(chevron);
  }
  comp.appendChild(header);

  // If expanded, add divider and body
  if (expanded) {
    const divider = figma.createFrame();
    divider.name = 'divider';
    divider.layoutAlign = 'STRETCH';
    divider.resize(640, 1);
    divider.fills = [paint(V['color/border/subtle'])];
    comp.appendChild(divider);

    const body = figma.createFrame();
    body.name = 'body';
    body.layoutMode = 'VERTICAL';
    body.primaryAxisSizingMode = 'AUTO';
    body.counterAxisSizingMode = 'FIXED';
    body.layoutAlign = 'STRETCH';
    body.setBoundVariable('paddingLeft', V['spacing/xl']);
    body.setBoundVariable('paddingRight', V['spacing/xl']);
    body.setBoundVariable('paddingTop', V['spacing/xl']);
    body.setBoundVariable('paddingBottom', V['spacing/xl']);
    body.setBoundVariable('itemSpacing', V['spacing/lg']);
    body.fills = [];

    const content = figma.createText();
    content.name = 'content';
    content.characters = lang === 'AR'
      ? 'هذا هو المحتوى القابل للطي. يمكنك إضافة حقول نماذج أو نصوص توضيحية أو جداول أو عناصر قائمة داخل هذه المساحة القابلة للتوسيع.'
      : 'This is the accordion content panel. You can place form fields, descriptive copy, tables, or list items inside this expandable area.';
    await content.setRangeTextStyleIdAsync(0, content.characters.length, BODY_MD.id);
    content.fills = [paint(V['color/text/default'])];
    content.layoutAlign = 'STRETCH';
    if (lang === 'AR') content.textAlignHorizontal = 'RIGHT';

    body.appendChild(content);
    comp.appendChild(body);
  }

  return comp;
};

const v1 = await makeVariant(false, 'EN');
const v2 = await makeVariant(true, 'EN');
const v3 = await makeVariant(false, 'AR');
const v4 = await makeVariant(true, 'AR');

const variants = [v1, v2, v3, v4];
let curX = 64;
let curY = 64;
for (const v of variants) {
  v.x = curX;
  v.y = curY;
  curY += v.height + 48;
}

const compSet = figma.combineAsVariants(variants, sec);
compSet.name = 'Accordion';
compSet.description = 'Collapsible content panel with an interactive header trigger and expandable body container. Spec: 3-web-components/components/accordion/accordion.md';

// Add component properties
const titleP = compSet.addComponentProperty('Title', 'TEXT', 'Section title');
const subP = compSet.addComponentProperty('Subtitle', 'TEXT', 'Optional description');
const showSubP = compSet.addComponentProperty('Show subtitle', 'BOOLEAN', false);
const leadIconP = compSet.addComponentProperty('Leading icon', 'BOOLEAN', false);

// Link properties on variants
for (const v of compSet.children) {
  const t = v.findOne(n => n.name === 'title');
  const st = v.findOne(n => n.name === 'subtitle');
  const ic = v.findOne(n => n.name === 'leading-icon');

  if (v.name.includes('Language=EN')) {
    if (t) t.componentPropertyReferences = { characters: titleP };
    if (st) st.componentPropertyReferences = { characters: subP, visible: showSubP };
  } else {
    if (st) st.componentPropertyReferences = { visible: showSubP };
  }
  if (ic) ic.componentPropertyReferences = { visible: leadIconP };
}

sec.resizeWithoutConstraints(compSet.width + 128, compSet.height + 128);

return {
  ok: true,
  page: page.name,
  pageId: page.id,
  sectionId: sec.id,
  compSetId: compSet.id,
  variantsCount: compSet.children.length
};
