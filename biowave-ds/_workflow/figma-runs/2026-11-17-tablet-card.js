// Build Card Component Set in Biowave DS — Tablet Components
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
  "radius/sm": "44047be92c065ef35e4aa9ed6732645870ae38c9",
  "radius/md": "0758e506cdfd4d7a4eef6369a4851133d7eab5a4",
  "radius/xl": "a5042304656c42bab9b62a4f4ab9c6b1831b487c",
  "radius/full": "cde1a4778562f488d8f32680d4d00f7957cc2a21",
  "spacing/none": "4879183c164f25d975ac0a8664388a77a2073b80",
  "spacing/xs": "9ea993d003d5368c5100b038d51c7c8f3e95c115",
  "spacing/sm": "8332b62aa90dea8417383c59a11eee680e0f1db5",
  "spacing/md": "58c93e3cec1b6ba603371a027483e101adcef4f0",
  "spacing/lg": "6976021b7dd1218f670faa6dd403943fbe7b2638",
  "spacing/xl": "5fa0c2ce8ae034e9696038d2704e520fd8383e55",
  "spacing/2xl": "a7775480bb9a7d53f9f512cbf08b5854451df564",
  "size/control/height/md": "cb6d23a09de76b9cea37c24579dbb2a9e6e6a079",
  "size/icon/md": "eb459c673e6ca16e3c81b240f04b467717953a9a"
};

const V = {};
for (const [n, k] of Object.entries(K)) {
  V[n] = await figma.variables.importVariableByKeyAsync(k);
}

const paint = v => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const rads = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];
const bind = (n, ks, v) => { for (const k of ks) n.setBoundVariable(k, v); };

const TITLE_MD = await figma.importStyleByKeyAsync('80e371f8315ffdb2da029152a20e42afcd924824');
const BODY_MD = await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69');
const BODY_SM = await figma.importStyleByKeyAsync('49f1d79a1ea0f0083dde003404f6295314f8804b');

const elevStyleId = "S:fd8b5244c1a24e80f6e0ca3b3aea0d95c40b94b1,4987:5717";

const btnEn = await figma.getNodeByIdAsync("77:14918");
const btnAr = await figma.getNodeByIdAsync("77:17006");

const makeBtn = (lang, variant, color, label) => {
  const set = lang === 'AR' ? btnAr : btnEn;
  const v = set.children.find(x => x.name === `Variant=${variant}, Color=${color}, State=default, Size=sm`);
  const inst = v.createInstance();
  inst.name = `${variant}-action`;
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

// Page setup
let page = figma.root.children.find(p => p.name.trim() === '↳ Card');
if (!page) {
  page = figma.createPage();
  page.name = '     ↳ Card';
  const idx = figma.root.children.findIndex(p => p.name.includes('Accordion'));
  if (idx !== -1) figma.root.insertChild(idx + 1, page);
}
await figma.setCurrentPageAsync(page);

// Clean existing component section if present
const existingSec = page.children.find(c => c.name === 'Card — Component');
if (existingSec) existingSec.remove();

const sec = figma.createSection();
sec.name = 'Card — Component';
sec.x = 0;
sec.y = 0;
page.appendChild(sec);

// Build variant helper
const makeCardVariant = async (variant, selected, lang) => {
  const comp = figma.createComponent();
  comp.name = `Variant=${variant}, Selected=${selected}, Language=${lang}`;
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(320, 320);
  bind(comp, rads, V['radius/xl']);
  comp.clipsContent = true;

  comp.setBoundVariable('paddingLeft', V['spacing/2xl']);
  comp.setBoundVariable('paddingRight', V['spacing/2xl']);
  comp.setBoundVariable('paddingTop', V['spacing/2xl']);
  comp.setBoundVariable('paddingBottom', V['spacing/2xl']);
  comp.setBoundVariable('itemSpacing', V['spacing/xl']);

  // Append to section immediately so it is parented
  sec.appendChild(comp);

  // Styling based on Variant & Selected
  if (variant === 'Outlined') {
    comp.fills = [paint(V['color/surface/default'])];
    comp.strokes = [paint(selected ? V['color/border/brand'] : V['color/border/default'])];
    comp.strokeWeight = selected ? 2 : 1;
  } else if (variant === 'Elevated') {
    comp.fills = [paint(V['color/surface/default'])];
    if (selected) {
      comp.strokes = [paint(V['color/border/brand'])];
      comp.strokeWeight = 2;
    } else {
      comp.strokes = [paint(V['color/border/subtle'])];
      comp.strokeWeight = 1;
    }
    await comp.setEffectStyleIdAsync(elevStyleId);
  } else if (variant === 'Filled') {
    comp.fills = [paint(V['color/surface/subtle'])];
    if (selected) {
      comp.strokes = [paint(V['color/border/brand'])];
      comp.strokeWeight = 2;
    } else {
      comp.strokes = [];
    }
  }

  // Header frame (avatar, title, subtitle)
  const header = figma.createFrame();
  header.name = 'header';
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'AUTO';
  header.layoutAlign = 'STRETCH';
  header.counterAxisAlignItems = 'CENTER';
  header.setBoundVariable('itemSpacing', V['spacing/lg']);
  header.fills = [];

  // Avatar placeholder
  const avatar = figma.createFrame();
  avatar.name = 'avatar';
  avatar.resize(40, 40);
  bind(avatar, ['width', 'height'], V['size/control/height/md']);
  bind(avatar, rads, V['radius/full']);
  avatar.fills = [paint(V['color/surface/subtle'])];

  // Title group
  const textGroup = figma.createFrame();
  textGroup.name = 'header-text';
  textGroup.layoutMode = 'VERTICAL';
  textGroup.layoutGrow = 1;
  textGroup.setBoundVariable('itemSpacing', V['spacing/xs']);
  textGroup.fills = [];

  const title = figma.createText();
  title.name = 'title';
  title.characters = lang === 'AR' ? 'عنوان البطاقة' : 'Card title';
  await title.setRangeTextStyleIdAsync(0, title.characters.length, TITLE_MD.id);
  title.fills = [paint(V['color/text/default'])];
  title.layoutAlign = 'STRETCH';
  if (lang === 'AR') title.textAlignHorizontal = 'RIGHT';

  const subtitle = figma.createText();
  subtitle.name = 'subtitle';
  subtitle.characters = lang === 'AR' ? 'وصف تفصيلي أو بيانات إضافية' : 'Secondary description or metadata';
  await subtitle.setRangeTextStyleIdAsync(0, subtitle.characters.length, BODY_SM.id);
  subtitle.fills = [paint(V['color/text/subtle'])];
  subtitle.layoutAlign = 'STRETCH';
  if (lang === 'AR') subtitle.textAlignHorizontal = 'RIGHT';

  textGroup.appendChild(title);
  textGroup.appendChild(subtitle);

  if (lang === 'AR') {
    header.appendChild(textGroup);
    header.appendChild(avatar);
  } else {
    header.appendChild(avatar);
    header.appendChild(textGroup);
  }
  comp.appendChild(header);

  // Media slot (optional)
  const media = figma.createFrame();
  media.name = 'media';
  media.layoutAlign = 'STRETCH';
  media.resize(280, 100);
  bind(media, rads, V['radius/sm']);
  media.fills = [paint(V['color/surface/subtle'])];
  comp.appendChild(media);

  // Body slot
  const body = figma.createFrame();
  body.name = 'body';
  body.layoutMode = 'VERTICAL';
  body.primaryAxisSizingMode = 'AUTO';
  body.counterAxisSizingMode = 'FIXED';
  body.layoutAlign = 'STRETCH';
  body.setBoundVariable('itemSpacing', V['spacing/lg']);
  body.fills = [];

  const bodyContent = figma.createText();
  bodyContent.name = 'body-content';
  bodyContent.characters = lang === 'AR'
    ? 'المحتوى الأساسي يوضع هنا. تجمع البطاقات المعلومات والوسائط والإجراءات المترابطة داخل حاوية منسقة.'
    : 'Primary content goes here. Cards group related information, media, and interactive controls into a clean container.';
  await bodyContent.setRangeTextStyleIdAsync(0, bodyContent.characters.length, BODY_MD.id);
  bodyContent.fills = [paint(V['color/text/default'])];
  bodyContent.layoutAlign = 'STRETCH';
  if (lang === 'AR') bodyContent.textAlignHorizontal = 'RIGHT';

  body.appendChild(bodyContent);
  comp.appendChild(body);

  // Footer frame (optional actions)
  const footer = figma.createFrame();
  footer.name = 'footer';
  footer.layoutMode = 'HORIZONTAL';
  footer.primaryAxisSizingMode = 'FIXED';
  footer.counterAxisSizingMode = 'AUTO';
  footer.layoutAlign = 'STRETCH';
  footer.counterAxisAlignItems = 'CENTER';
  footer.setBoundVariable('itemSpacing', V['spacing/lg']);
  footer.fills = [];

  const primaryBtn = makeBtn(lang, 'filled', 'brand', lang === 'AR' ? 'تأكيد' : 'Confirm');
  const secondaryBtn = makeBtn(lang, 'outlined', 'neutral', lang === 'AR' ? 'إلغاء' : 'Cancel');

  if (lang === 'AR') {
    footer.appendChild(primaryBtn);
    footer.appendChild(secondaryBtn);
  } else {
    footer.appendChild(secondaryBtn);
    footer.appendChild(primaryBtn);
  }
  comp.appendChild(footer);

  return comp;
};

// Generate 12 variants
const variants = [];
const VARIANTS = ['Outlined', 'Elevated', 'Filled'];
const SELECTED = [false, true];
const LANGS = ['EN', 'AR'];

for (const variant of VARIANTS) {
  for (const sel of SELECTED) {
    for (const lang of LANGS) {
      const c = await makeCardVariant(variant, sel, lang);
      variants.push(c);
    }
  }
}

// Arrange grid in section
let curX = 64;
let curY = 64;
let col = 0;
for (const v of variants) {
  v.x = curX;
  v.y = curY;
  curX += v.width + 48;
  col++;
  if (col === 4) {
    col = 0;
    curX = 64;
    curY += 340 + 48;
  }
}

const compSet = figma.combineAsVariants(variants, sec);
compSet.name = 'Card';
compSet.description = 'Foundational surface container grouping related information, media, and actions. Spec: 4-tablet-components/components/card/card.md';

// Add component properties
const titleP = compSet.addComponentProperty('Title', 'TEXT', 'Card title');
const subP = compSet.addComponentProperty('Subtitle', 'TEXT', 'Card description');
const showHeaderP = compSet.addComponentProperty('Show header', 'BOOLEAN', true);
const showMediaP = compSet.addComponentProperty('Show media', 'BOOLEAN', false);
const showFooterP = compSet.addComponentProperty('Show footer', 'BOOLEAN', true);

// Link properties on variants
for (const v of compSet.children) {
  const h = v.findOne(n => n.name === 'header');
  const m = v.findOne(n => n.name === 'media');
  const f = v.findOne(n => n.name === 'footer');
  const t = v.findOne(n => n.name === 'title');
  const st = v.findOne(n => n.name === 'subtitle');

  if (h) h.componentPropertyReferences = { visible: showHeaderP };
  if (m) m.componentPropertyReferences = { visible: showMediaP };
  if (f) f.componentPropertyReferences = { visible: showFooterP };

  if (v.name.includes('Language=EN')) {
    if (t) t.componentPropertyReferences = { characters: titleP };
    if (st) st.componentPropertyReferences = { characters: subP };
  }
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
