// Build Phase 2 documentation pages (00–09, 11) for Skeleton + add all 4 Wave 9 cards on Components List (75:85) + return all D11 node IDs
const mkAL = (dir) => {
  const f = figma.createFrame();
  f.layoutMode = dir || 'VERTICAL';
  return f;
};
for (const f of [
  ['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold'],
  ['IBM Plex Sans Arabic', 'Regular'], ['IBM Plex Sans Arabic', 'Medium'], ['IBM Plex Sans Arabic', 'SemiBold'], ['IBM Plex Sans Arabic', 'Bold']
]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const skelPage = await figma.getNodeByIdAsync('694:219741');
await skelPage.loadAsync();
const SET = await figma.getNodeByIdAsync('694:219746');
const libCols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const spCol = libCols.find(c => c.name === '3. Spacing');
const spVars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(spCol.key);
const spMd = await figma.variables.importVariableByKeyAsync(spVars.find(v => v.name === 'spacing/md').key);
const spLg = await figma.variables.importVariableByKeyAsync(spVars.find(v => v.name === 'spacing/lg').key);

const pick = (set, o) =>
  set.children.find(c => Object.entries(o).every(([k, v]) => c.name.split(', ').includes(k + '=' + v))) ||
  set.defaultVariant;

async function EX(s) {
  if (s.compose === 'row') {
    const row = mkAL('HORIZONTAL');
    row.fills = [];
    row.counterAxisAlignItems = 'CENTER';
    row.setBoundVariable('itemSpacing', spLg);
    const av = pick(SET, { Shape: 'Circle' }).createInstance();
    const lines = mkAL('VERTICAL');
    lines.fills = [];
    lines.setBoundVariable('itemSpacing', spMd);
    if (s.rtl) lines.counterAxisAlignItems = 'MAX';
    const l1 = pick(SET, { Shape: 'Line' }).createInstance();
    l1.resize(220, l1.height);
    const l2 = pick(SET, { Shape: 'Line' }).createInstance();
    l2.resize(140, l2.height);
    lines.appendChild(l1);
    lines.appendChild(l2);
    if (s.rtl) {
      row.appendChild(lines);
      row.appendChild(av);
    } else {
      row.appendChild(av);
      row.appendChild(lines);
    }
    return row;
  }
  if (s.v) {
    const i = pick(SET, s.v).createInstance();
    if (s.w) i.resize(s.w, i.height);
    return i;
  }
  const f = figma.createFrame();
  f.resize(s.w || 320, s.h || 80);
  f.fills = [];
  return f;
}

const D = {
  name: 'Skeleton',
  setId: '694:219746',
  rebuild: true,
  sub: 'Low-fidelity structural placeholder that mirrors the layout of content while data is loading',
  ver: '1.0',
  desc: 'A skeleton is a low-fidelity placeholder shape (line, circle or block) that mirrors the layout of a page, card, list row or table while data is being fetched. It reduces perceived latency and prevents layout shift (CLS) when real content arrives.',
  col: 'Shape',
  rows: [],
  cellW: 420,
  axisW: 120,
  sheetFill: false,
  parts: ['bone'],
  intro: [{ compose: 'row' }],
  propsNote: 'One set with 3 atomic shape variants: Shape = Line (text row), Circle (avatar/icon) and Block (card/chart/media). Designers resize width/height or set Fill container when composing layouts.',
  props: [
    ['Shape', 'VARIANT', 'Line · Circle · Block', 'Line', 'shape (line · circle · block)'],
    ['Width / Height', 'DIMENSION', 'Resizable / Fill container', '384×16 · 40×40 · 320×112', 'width & height override in code'],
    ['Animated', 'CODE ONLY', 'true · false', 'true', 'animated pulse (motion/duration/xl · paused in reduced motion)']
  ],
  tokensNote: 'No component tokens: every bone binds directly to Foundations neutral background, radius and size tokens.',
  tokens: [
    ['bone · fill (base)', 'all', 'color/background/neutral/subtlest'],
    ['bone · fill (pulse peak)', 'animated (code)', 'color/background/neutral/default'],
    ['bone · radius', 'Line · Circle · Block', 'radius/xs (4 px) · radius/full (9999 px) · radius/md (8 px)'],
    ['bone · default size', 'Line', 'width size/container/2xs (384 px) · height size/icon/xs (16 px)'],
    ['bone · default size', 'Circle', 'width & height size/avatar/lg (40 px)'],
    ['bone · default size', 'Block', 'width size/panel/md (320 px) · height size/illustration/md (112 px)']
  ],
  vars: [
    {
      title: 'Shape',
      desc: 'Three primitive shapes combine to represent any loading interface: Line for text, Circle for avatars/icons, and Block for cards, images or charts.',
      tiles: [
        ['Shape = Line', { v: { Shape: 'Line' } }],
        ['Shape = Circle', { v: { Shape: 'Circle' } }],
        ['Shape = Block', { v: { Shape: 'Block' } }]
      ]
    },
    {
      title: 'Composed row pattern',
      desc: 'Combine a Circle bone with two Line bones of varied widths to mirror a list item or employee row.',
      tiles: [
        ['List row composition (LTR)', { compose: 'row' }],
        ['List row composition (RTL)', { compose: 'row', rtl: true }]
      ]
    }
  ],
  statesNote: 'Skeleton has a single loading state while mounted and unmounts immediately when real content or an Empty state / Alert replaces it.',
  motionNote: 'Pulse animation cycles opacity (1 → 0.45 → 1) over motion/duration/xl with ease-in-out. Cross-fades to loaded content over motion/duration/sm (150 ms). Static under prefers-reduced-motion.',
  motion: [
    ['Loading → Loaded', 'sm', { compose: 'row' }, { empty: true, w: 280, h: 48 }]
  ],
  use: [
    'Use skeleton shapes when initial page, card, list or table data takes 300 ms – 5 s to fetch and the layout geometry is predictable.',
    { compose: 'row' }
  ],
  notUse: 'Not for button-level actions (use Button loading state), indeterminate process progress (use Progress / Spinner), or loads under 200 ms.',
  dos: [
    ['Match skeleton dimensions closely to the loaded content to prevent layout shift', { compose: 'row' }],
    ['Use Block bones for rectangular cards or chart areas', { v: { Shape: 'Block' } }]
  ],
  donts: [
    ['Do not render a single tiny Circle bone for an entire multi-column table', { v: { Shape: 'Circle' } }],
    ['Do not keep skeletons visible indefinitely after a request fails — show an Alert or Empty state', { v: { Shape: 'Line' } }]
  ],
  content: [
    ['bone', 'Contains zero visible text — never place "Loading..." copy inside a skeleton bone', '0 chars'],
    ['line width', 'Vary stacked line widths (e.g. 100%, 80%, 55%) to mimic natural text', '—']
  ],
  contentEx: [
    ['aria-busy="true" on parent container', 'aria-busy="true" على الحاوية الأب', 'Text "Loading..." inside bone'],
    ['3–6 skeleton rows matching table height', '٣–٦ صفوف هيكلية تطابق الجدول', '20+ pulsing bones on one screen']
  ],
  devices: [
    ['Desktop', 'Fills parent card, list row or table cell width on desktop.', { compose: 'row' }]
  ],
  platform: [
    ['Sizing', 'Line (384×16 default), Circle (40×40 default), Block (320×112 default) — resize freely in instances'],
    ['Animation', 'Opacity pulse (respects prefers-reduced-motion: reduce)'],
    ['Replacement', 'Replaced in-place by loaded data, Empty state or Alert']
  ],
  rtlNote: 'Individual skeleton shapes are symmetrical; when composed into rows or cards in RTL, the parent auto-layout mirrors so avatars sit on the right and varied-width text lines align to the right edge.',
  rtl: [
    [
      ['LTR row composition', { compose: 'row' }],
      ['RTL row composition', { compose: 'row', rtl: true }]
    ]
  ],
  a11yUse: 'Individual skeleton bones carry aria-hidden="true" so screen readers do not announce every placeholder rectangle; the parent loading region sets aria-busy="true".',
  keys: [
    ['None', 'Skeletons are non-interactive and skipped by keyboard Tab navigation']
  ],
  sr: 'Each bone renders with aria-hidden="true". Set aria-busy="true" on the parent container while loading and remove it once content renders.',
  focus: 'Not focusable (tabIndex is not set).',
  contrast: [
    ['bone (color/background/neutral/subtlest) on surface', 'Decorative placeholder (exempt from WCAG 1.4.11)', 'Decorative placeholder (exempt from WCAG 1.4.11)']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Shape = Line · Circle · Block', 'No']
  ]
};

const src = figma.root.getSharedPluginData('biowave', 'w8core')
  .replace(/figma\.createAutoLayout\(/g, 'mkAL(')
  .replace('await lf(inst);', '')
  .replace(/const W6=[^\n]+/, "const W6=await figma.variables.getVariableByIdAsync('VariableID:99599514c759fa9e28a58abf278f73814f1a0d18/4987:213'), W2=await figma.variables.getVariableByIdAsync('VariableID:099f79a0492cc7bb141b6647f26b8637d2dd7021/4987:218');");
const AF = Object.getPrototypeOf(async function () {}).constructor;
const skelDocRes = await (new AF('D', 'EX', 'mkAL', src))(D, EX, mkAL);

// Now add the 4 Wave 9 cards to Components List page (75:85, row 648:9907)
const CARDS = [
  { name: 'Alert', setId: '691:219739', pageId: '691:218883' },
  { name: 'Snackbar', setId: '694:220191', pageId: '694:219747' },
  { name: 'Empty state', setId: '694:220298', pageId: '694:220192' },
  { name: 'Skeleton', setId: '694:219746', pageId: '694:219741' }
];

const report = {};
for (const item of CARDS) {
  const cp = await figma.getNodeByIdAsync(item.pageId);
  await cp.loadAsync();
  const compSec = cp.children.find(n => n.type === 'SECTION' && n.name === item.name + ' — Component');
  const docSec = cp.children.find(n => n.type === 'SECTION' && n.name === item.name + ' — Documentation');
  report[item.name] = {
    pageId: cp.id,
    compSectionId: compSec ? compSec.id : null,
    setId: item.setId,
    docSectionId: docSec ? docSec.id : null,
    docPageIds: docSec ? docSec.children.map(p => ({ name: p.name.split(' / ')[1], id: p.id })) : []
  };
}

const clPage = await figma.getNodeByIdAsync('75:85');
await clPage.loadAsync();
await figma.setCurrentPageAsync(clPage);
const row = await figma.getNodeByIdAsync('648:9907');
const MAX_SCALE = 1.4;
const addedCards = [];

for (const item of CARDS) {
  let c = row.children.find(n => n.name === item.name + ' Card');
  if (!c) {
    const last = row.children[row.children.length - 1];
    c = last.clone();
    row.appendChild(c);
    c.name = item.name + ' Card';
  }
  const tk = Object.keys(c.componentProperties).find(k => k.startsWith('Title'));
  if (tk) c.setProperties({ [tk]: item.name });

  const sl = c.findOne(n => n.type === 'SLOT');
  if (sl) {
    [...sl.children].forEach(n => n.remove());
    const set = await figma.getNodeByIdAsync(item.setId);
    const n = set.defaultVariant.createInstance();
    sl.appendChild(n);
    const aw = sl.width - (sl.paddingLeft || 0) - (sl.paddingRight || 0);
    const ah = sl.height - (sl.paddingTop || 0) - (sl.paddingBottom || 0);
    n.rescale(Math.min(aw / n.width, ah / n.height, MAX_SCALE) * 0.9);
  }

  const link = c.findAll(n => n.type === 'TEXT').find(t => /View Component/.test(t.characters));
  if (link) link.hyperlink = { type: 'NODE', value: item.pageId };
  addedCards.push({ name: c.name, id: c.id });
}

return {
  skelDocRes,
  addedCards,
  report
};
