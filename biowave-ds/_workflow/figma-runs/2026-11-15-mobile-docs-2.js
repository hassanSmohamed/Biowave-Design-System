// Wave 9 Phase 2 (Part 2) — Build Empty state & Skeleton Documentation (00–09, 11) in Biowave DS — Mobile Components
// and add 4 component cards to Components List (14:2) under Cards (14:104)
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

const findPage = n => figma.root.children.find(p => p.name.trim() === n);
const pick = (set, o) =>
  set.children.find(c => Object.entries(o).every(([k, v]) => c.name.split(', ').includes(k + '=' + v))) ||
  set.defaultVariant;

const setPr = (i, map) => {
  const p = {};
  for (const [pre, val] of Object.entries(map || {})) {
    const k = Object.keys(i.componentProperties).find(x => x === pre || x.split('#')[0] === pre);
    if (k) p[k] = val;
  }
  if (Object.keys(p).length) i.setProperties(p);
};

const src = figma.root.getSharedPluginData('biowave', 'w8core')
  .replace(/figma\.createAutoLayout\(/g, 'mkAL(')
  .replace('await lf(inst);', '');
const AF = Object.getPrototypeOf(async function () {}).constructor;
const runDoc = new AF('D', 'EX', 'mkAL', src);

// 1. Empty state (Mobile)
const emptyPage = findPage('↳ Empty state');
await emptyPage.loadAsync();
const emptySet = emptyPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Empty state');

async function EX_Empty(s) {
  if (s.v) {
    const i = pick(emptySet, s.v).createInstance();
    setPr(i, s.props);
    return i;
  }
  const f = figma.createFrame();
  f.resize(s.w || 384, s.h || 240);
  f.fills = [];
  return f;
}

const D_Empty = {
  name: 'Empty state',
  setId: emptySet.id,
  os: 'Mobile',
  mode: '3869:7',
  rebuild: false,
  sub: 'Centred placeholder shown when a page, section, table, card or search result has no items to display',
  ver: '1.0',
  desc: 'An empty state explains why a view, section, table, card or filter result is blank and provides a clear primary path forward so users are never left facing an unexplained dead end.',
  col: 'Language',
  rows: ['Size'],
  cellW: 520,
  axisW: 200,
  sheetFill: false,
  parts: ['visual', 'icon', 'text-stack', 'title', 'description', 'actions', 'primary-action', 'secondary-action'],
  intro: [{ v: { Size: 'MD', Language: 'EN' } }],
  propsNote: 'One set: Size (MD · SM) × Language (EN · AR) = 4 variants. Title and Description are text properties on EN variants; Show visual, Primary action and Secondary action toggle optional slots.',
  props: [
    ['Size', 'VARIANT', 'MD · SM', 'MD', 'MD for full pages and tabs; SM for cards, panels and dialogs'],
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Mobile · EN / Mobile · AR; mirrored actions'],
    ['Title', 'TEXT', '—', 'No matching results', 'title (concise reason why view is empty)'],
    ['Description', 'TEXT', '—', 'Try adjusting your filters or search terms.', 'description (guidance on next step)'],
    ['Show visual', 'BOOLEAN', '—', 'true', 'Toggle decorative circular icon badge'],
    ['Primary action', 'BOOLEAN', '—', 'true', 'Toggle primary Filled button (48×48 dp touch target)'],
    ['Secondary action', 'BOOLEAN', '—', 'true', 'Toggle secondary Outlined button (48×48 dp touch target)']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations semantic tokens. Action buttons carry Button tokens.',
  tokens: [
    ['visual · fill', 'all', 'color/surface/subtle · radius/full'],
    ['visual · padding & icon', 'MD · SM', 'spacing/3xl (24 dp) / size/icon/3xl (48 dp) · spacing/xl (16 dp) / size/icon/2xl (40 dp)'],
    ['icon · color', 'all', 'color/icon/subtlest'],
    ['container · width & padding', 'MD · SM', 'max size/container/sm (480 dp) / spacing/3xl (24 dp) · max size/container/xs (384 dp) / spacing/xl (16 dp)'],
    ['title · text & color', 'MD · SM', 'title/lg · title/md · color/text/default'],
    ['description · text & color', 'MD · SM', 'body/lg / color/text/subtle · body/md / color/text/subtlest'],
    ['actions · gap', 'all', 'spacing/md (8 dp)']
  ],
  vars: [
    {
      title: 'Size',
      desc: 'MD for full screens, list views and root navigation tabs; SM for bottom sheets, cards and search flyouts.',
      tiles: [
        ['Size = MD (Page / Section)', { v: { Size: 'MD', Language: 'EN' } }],
        ['Size = SM (Compact / Sheet)', { v: { Size: 'SM', Language: 'EN' } }]
      ]
    },
    {
      title: 'Action combinations',
      desc: 'Single primary action, primary + secondary pair, or informational without actions.',
      tiles: [
        ['Single action', { v: { Size: 'SM', Language: 'EN' }, props: { 'Secondary action': false } }],
        ['Two actions', { v: { Size: 'MD', Language: 'EN' } }],
        ['No visual (text + action only)', { v: { Size: 'SM', Language: 'EN' }, props: { 'Show visual': false } }],
        ['Informational (no actions)', { v: { Size: 'SM', Language: 'EN' }, props: { 'Primary action': false, 'Secondary action': false } }]
      ]
    }
  ],
  statesNote: 'Static centered layout. Action buttons provide default, hovered, focused and pressed states from Button.',
  motionNote: 'Enter: subtle fade in over motion/duration/md (200 ms). Instant under reduced motion.',
  motion: [
    ['Hidden → Visible', 'md', { empty: true, w: 384, h: 240 }, { v: { Size: 'MD', Language: 'EN' } }]
  ],
  use: [
    'Use an empty state when a collection, filter, search, inbox or schedule currently holds zero items.',
    { v: { Size: 'MD', Language: 'EN' } }
  ],
  notUse: 'Not for loading states (use Skeleton), partial system errors with data present (use Alert), or simple empty table cells (render "—").',
  dos: [
    ['Offer a constructive next action that helps the user add or find content', { v: { Size: 'MD', Language: 'EN' } }],
    ['Use SM size inside bottom sheets and compact cards', { v: { Size: 'SM', Language: 'EN' } }]
  ],
  donts: [
    ['Do not blame the user with phrases like "You have not done anything yet"', { v: { Size: 'SM', Language: 'EN' }, props: { Title: 'Nothing found' } }],
    ['Do not provide dead-end empty states with no guidance or action button', { v: { Size: 'SM', Language: 'EN' }, props: { 'Primary action': false, 'Secondary action': false } }]
  ],
  content: [
    ['title', 'Positive, outcome-focused heading; no period', '36 chars'],
    ['description', 'Constructive guidance on how to populate the view', '100 chars'],
    ['primary-action', 'Specific imperative verb (Add employee, Clear filters, Log shift)', '18 chars']
  ],
  contentEx: [
    ['No matching results · Clear filters', 'لا توجد نتائج مطابقة · مسح الفلاتر', 'Empty list! Zero items found.'],
    ['No shifts scheduled · Create shift', 'لا توجد مناوبات مجدولة · إنشاء مناوبة', 'Nothing to see here right now.']
  ],
  devices: [
    ['Phone', 'Centered in screen viewport with 16 dp side margin.', { v: { Size: 'MD', Language: 'EN' } }]
  ],
  platform: [
    ['Placement', 'Vertically and horizontally centered within parent viewport or container'],
    ['Padding', '24 dp margin on mobile phones to ensure touch-friendly button breathing room'],
    ['Actions', 'Primary + secondary action buttons stack or wrap gracefully']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Mobile · AR, text remains centered, and primary / secondary button order mirrors so primary action sits at reading start.',
  rtl: [
    [
      ['LTR (EN)', { v: { Size: 'MD', Language: 'EN' } }],
      ['RTL (AR)', { v: { Size: 'MD', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Decorative visual badge is excluded (ExcludeSemantics); title is marked as heading; action buttons enforce 48×48 dp touch target.',
  keys: [
    ['Tab', 'Focuses primary action button, then secondary action button'],
    ['Enter / Space', 'Activates the focused action']
  ],
  sr: 'Screen reader reads heading then description; visual icon is decorative and skipped.',
  focus: 'Focus ring (border/width/focus, color/border/focus) on action buttons.',
  contrast: [
    ['title (color/text/default) on base background', '19.8:1', '17.2:1'],
    ['description (color/text/subtle) on base background', '14.55:1', '13.31:1'],
    ['description SM (color/text/subtlest) on base background', '7.57:1', '9.81:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Size (MD · SM) × Language (EN · AR), Title, Description, Show visual, Primary action, Secondary action', 'No']
  ]
};

const emptyDoc = await runDoc(D_Empty, EX_Empty, mkAL);

// 2. Skeleton (Mobile)
const skelPage = findPage('↳ Skeleton');
await skelPage.loadAsync();
const skelSet = skelPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Skeleton');

async function EX_Skel(s) {
  if (s.compose === 'row') {
    const row = figma.createFrame();
    row.name = 'skeleton-row';
    row.layoutMode = 'HORIZONTAL';
    row.counterAxisAlignItems = 'CENTER';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.fills = [];
    row.itemSpacing = 16;
    const c = pick(skelSet, { Shape: 'Circle' }).createInstance();
    const stack = figma.createFrame();
    stack.layoutMode = 'VERTICAL';
    stack.fills = [];
    stack.itemSpacing = 8;
    const l1 = pick(skelSet, { Shape: 'Line' }).createInstance();
    l1.resize(s.rtl ? 180 : 200, l1.height);
    const l2 = pick(skelSet, { Shape: 'Line' }).createInstance();
    l2.resize(s.rtl ? 110 : 130, l2.height);
    stack.appendChild(l1);
    stack.appendChild(l2);
    if (s.rtl) {
      stack.counterAxisAlignItems = 'MAX';
      row.appendChild(stack);
      row.appendChild(c);
    } else {
      row.appendChild(c);
      row.appendChild(stack);
    }
    return row;
  }
  if (s.v) return pick(skelSet, s.v).createInstance();
  const f = figma.createFrame();
  f.resize(s.w || 280, s.h || 48);
  f.fills = [];
  return f;
}

const D_Skel = {
  name: 'Skeleton',
  setId: skelSet.id,
  os: 'Mobile',
  mode: '3869:7',
  rebuild: false,
  sub: 'Low-contrast placeholder shapes that mirror content geometry while data loads',
  ver: '1.0',
  desc: 'A skeleton screen is a low-fidelity wireframe placeholder that previews the approximate layout geometry of text, avatars and media while data loads over the network, reducing perceived latency.',
  col: 'Shape',
  rows: [],
  cellW: 420,
  axisW: 160,
  sheetFill: false,
  parts: ['line', 'circle', 'block'],
  intro: [{ compose: 'row' }],
  propsNote: 'One set: Shape (Line · Circle · Block) = 3 variants. Width and height resize freely in instances to match target content.',
  props: [
    ['Shape', 'VARIANT', 'Line · Circle · Block', 'Line', 'Geometric bone shape mirroring text, avatars or cards']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations background and radius tokens.',
  tokens: [
    ['bone · fill', 'all', 'color/background/base/subtle'],
    ['bone · radius', 'Line · Circle · Block', 'radius/xs (2 dp) · radius/full · radius/md (8 dp)'],
    ['Line · default size', 'Line', 'size/container/xs (384 dp) × spacing/xl (16 dp)'],
    ['Circle · default size', 'Circle', 'size/control/height/md (40 × 40 dp)'],
    ['Block · default size', 'Block', 'size/container/xxs (320 dp) × 112 dp (pad size/control/height/xl)']
  ],
  vars: [
    {
      title: 'Shape',
      desc: 'Three basic geometric primitives (Line for text rows, Circle for avatars/badges, Block for cards/media).',
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
  motionNote: 'Shimmer/pulse animation cycles over motion/duration/progress (1000 ms). Static under MediaQuery.disableAnimations.',
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
    ['Do not render a single tiny Circle bone for an entire screen', { v: { Shape: 'Circle' } }],
    ['Do not keep skeletons visible indefinitely after a request fails — show an Alert or Empty state', { v: { Shape: 'Line' } }]
  ],
  content: [
    ['bone', 'Contains zero visible text — never place "Loading..." copy inside a skeleton bone', '0 chars'],
    ['line width', 'Vary stacked line widths (e.g. 100%, 80%, 55%) to mimic natural text', '—']
  ],
  contentEx: [
    ['Semantics(label: "Loading") on parent container', 'Semantics(label: "جاري التحميل") على الحاوية الأب', 'Text "Loading..." inside bone'],
    ['3–6 skeleton rows matching list height', '٣–٦ صفوف هيكلية تطابق القائمة', '20+ pulsing bones on one screen']
  ],
  devices: [
    ['Phone', 'Fills parent card or list row width on phone.', { compose: 'row' }]
  ],
  platform: [
    ['Sizing', 'Line (384×16 default), Circle (40×40 default), Block (320×112 default) — resize freely in instances'],
    ['Animation', 'Shimmer/opacity pulse (respects MediaQuery.disableAnimations)'],
    ['Replacement', 'Replaced in-place by loaded data, Empty state or Alert']
  ],
  rtlNote: 'Individual skeleton shapes are symmetrical; when composed into rows or cards in RTL, the parent auto-layout mirrors so avatars sit on the right and varied-width text lines align to the right edge.',
  rtl: [
    [
      ['LTR row composition', { compose: 'row' }],
      ['RTL row composition', { compose: 'row', rtl: true }]
    ]
  ],
  a11yUse: 'Individual skeleton bones use ExcludeSemantics so screen readers do not announce every placeholder rectangle; the parent loading region provides a single localised Semantics label.',
  keys: [
    ['None', 'Skeletons are non-interactive and skipped by keyboard focus']
  ],
  sr: 'Each bone is wrapped in ExcludeSemantics; parent container announces loading state.',
  focus: 'Not focusable.',
  contrast: [
    ['bone (color/background/base/subtle) on surface', 'Decorative placeholder (exempt from WCAG 1.4.11)', 'Decorative placeholder (exempt from WCAG 1.4.11)']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Shape = Line · Circle · Block', 'No']
  ]
};

const skelDoc = await runDoc(D_Skel, EX_Skel, mkAL);

// 3. Add 4 cards to Mobile Components List (page 14:2) in Cards (14:104)
const NAMES = ['Alert', 'Snackbar', 'Empty state', 'Skeleton'];
const report = {};
for (const nm of NAMES) {
  const cp = findPage('↳ ' + nm);
  await cp.loadAsync();
  const cs = cp.findOne(n => n.type === 'COMPONENT_SET' && n.name === nm);
  const compSec = cp.children.find(n => n.type === 'SECTION' && n.name === nm + ' — Component');
  const docSec = cp.children.find(n => n.type === 'SECTION' && n.name === nm + ' — Documentation');
  report[nm] = {
    pageId: cp.id,
    compSectionId: compSec ? compSec.id : null,
    setId: cs ? cs.id : null,
    docSectionId: docSec ? docSec.id : null,
    docPageIds: docSec ? docSec.children.map(p => ({ name: p.name.split(' / ')[1], id: p.id })) : []
  };
}

const clPage = await figma.getNodeByIdAsync('14:2') || findPage('Components List');
await clPage.loadAsync();
await figma.setCurrentPageAsync(clPage);

const cardsFrame = await figma.getNodeByIdAsync('14:104');
let row = cardsFrame.children.find(n => n.name === 'Wave 9 / Feedback & Loading cards');
if (!row) {
  row = figma.createFrame();
  row.name = 'Wave 9 / Feedback & Loading cards';
  row.layoutMode = 'HORIZONTAL';
  row.layoutWrap = 'WRAP';
  row.itemSpacing = 16;
  row.counterAxisSpacing = 16;
  row.fills = [];
  cardsFrame.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';
}

const navRow = await figma.getNodeByIdAsync('151:8569');
const templateCard = navRow.children[0];
const MAX_SCALE = 1.4;
const addedCards = [];

for (const nm of NAMES) {
  const info = report[nm];
  let c = row.children.find(n => n.name === nm + ' Card');
  if (!c) {
    c = templateCard.clone();
    row.appendChild(c);
    c.name = nm + ' Card';
  }
  const tk = Object.keys(c.componentProperties).find(k => k.startsWith('Title'));
  if (tk) c.setProperties({ [tk]: nm });

  const sl = c.findOne(n => n.type === 'SLOT');
  if (sl) {
    [...sl.children].forEach(n => n.remove());
    const set = await figma.getNodeByIdAsync(info.setId);
    const n = set.defaultVariant.createInstance();
    sl.appendChild(n);
    const aw = sl.width - (sl.paddingLeft || 0) - (sl.paddingRight || 0);
    const ah = sl.height - (sl.paddingTop || 0) - (sl.paddingBottom || 0);
    n.rescale(Math.min(aw / n.width, ah / n.height, MAX_SCALE) * 0.9);
  }

  const link = c.findAll(n => n.type === 'TEXT').find(t => /View Component/.test(t.characters));
  if (link) link.hyperlink = { type: 'NODE', value: info.pageId };
  addedCards.push({ name: c.name, id: c.id });
}

return { emptyDoc, skelDoc, addedCards, report };
