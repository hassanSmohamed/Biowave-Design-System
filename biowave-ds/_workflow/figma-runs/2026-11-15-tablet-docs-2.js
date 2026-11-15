// Wave 9 Phase 2 (Part 2) — Build Empty state & Skeleton Documentation + add 4 Components List cards (page 16:2, row 192:1433) in Tablet Components
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

// 1. Empty state (Tablet)
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
  f.resize(s.w || 400, s.h || 240);
  f.fills = [];
  return f;
}

const D_Empty = {
  name: 'Empty state',
  setId: emptySet.id,
  os: 'Tablet',
  mode: '3869:8',
  rebuild: false,
  sub: 'Centred placeholder shown when a page, table, card or search result has no items to display',
  ver: '1.0',
  desc: 'An empty state is a centred placeholder shown when a page section, table, list, card or search result has zero items to display. It explains why the space is empty and gives the user a clear next step (such as creating the first item or clearing active filters).',
  col: 'Language',
  rows: ['Size'],
  cellW: 520,
  axisW: 200,
  sheetFill: false,
  parts: ['container', 'visual', 'title', 'description', 'actions'],
  intro: [{ v: { Size: 'MD', Language: 'EN' } }],
  propsNote: 'One set: Size (MD · SM) × Language (EN · AR) = 4 variants. Title and Description are text properties on EN variants; Show visual, Primary action and Secondary action toggle optional parts.',
  props: [
    ['Size', 'VARIANT', 'MD · SM', 'MD', 'size (md for full-section/table · sm for compact cards/popovers)'],
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Tablet · EN / Tablet · AR; mirrored action row'],
    ['Title', 'TEXT', '—', 'No matching results', 'title (plain-language heading)'],
    ['Description', 'TEXT', '—', 'Try adjusting your filters or search terms.', 'description (1–2 sentence guidance)'],
    ['Show visual', 'BOOLEAN', '—', 'true', 'Toggle leading circular icon badge'],
    ['Primary action', 'BOOLEAN', '—', 'true', 'Toggle primary recovery Button'],
    ['Secondary action', 'BOOLEAN', '—', 'true', 'Toggle secondary Button']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations semantic tokens. Nested Button instances carry their own tokens.',
  tokens: [
    ['container · max width', 'MD · SM', 'size/container/sm (480 dp) · size/container/xs (384 dp)'],
    ['container · padding & gap', 'MD · SM', 'spacing/3xl (24 dp) · spacing/xl (16 dp)'],
    ['visual · fill & radius', 'all', 'color/surface/subtle · radius/full'],
    ['visual · icon', 'MD · SM', 'size/icon/3xl (48 dp) / size/icon/2xl (40 dp) · color/icon/subtlest'],
    ['title · text & color', 'MD · SM', 'title/lg (MD) / title/md (SM) · color/text/default'],
    ['description · text & color', 'MD · SM', 'body/lg · color/text/subtle (MD) / body/md · color/text/subtlest (SM)'],
    ['actions · gap', 'all', 'spacing/md (8 dp)']
  ],
  vars: [
    {
      title: 'Size',
      desc: 'MD for full-page sections, tables and split-view panes; SM for compact cards, side sheets and filter popovers.',
      tiles: [
        ['Size = MD', { v: { Size: 'MD', Language: 'EN' } }],
        ['Size = SM', { v: { Size: 'SM', Language: 'EN' } }]
      ]
    },
    {
      title: 'Action and visual combinations',
      desc: 'Show one primary CTA for first-use creation, add a secondary CTA when helpful, or hide actions for read-only views.',
      tiles: [
        ['Single primary action', { v: { Size: 'MD', Language: 'EN' }, props: { 'Secondary action': false } }],
        ['Informational (no actions)', { v: { Size: 'SM', Language: 'EN' }, props: { 'Primary action': false, 'Secondary action': false } }],
        ['Text-only (Show visual = false)', { v: { Size: 'SM', Language: 'EN' }, props: { 'Show visual': false, 'Secondary action': false } }]
      ]
    }
  ],
  statesNote: 'The empty state container is static; interactive pressed and focus states belong to its nested primary and secondary Button instances (48×48 dp touch targets).',
  motionNote: 'Fades in (opacity 0 → 1) over motion/duration/md (200 ms) with decelerate easing when replacing a skeleton or cleared list.',
  motion: [
    ['Loading → Empty', 'md', { empty: true, w: 400, h: 240 }, { v: { Size: 'MD', Language: 'EN' } }]
  ],
  use: [
    'Use an empty state when a table, list, dashboard widget or search query returns zero items, pairing a clear explanation with the next action.',
    { v: { Size: 'MD', Language: 'EN' } }
  ],
  notUse: 'Not while data is still loading (use Skeleton), nor when a request failed due to a server/network error that belongs in an inline Alert.',
  dos: [
    ['Explain both why the view is empty and how to populate it', { v: { Size: 'MD', Language: 'EN' }, props: { 'Secondary action': false } }],
    ['Use Size = SM inside compact cards or narrow split panes', { v: { Size: 'SM', Language: 'EN' }, props: { 'Secondary action': false } }]
  ],
  donts: [
    ['Do not show a primary creation button if the user lacks permission to create items', { v: { Size: 'MD', Language: 'EN' }, props: { Title: 'No audit logs yet', Description: 'System events appear here automatically.' } }],
    ['Do not write vague technical titles like "0 records returned (200 OK)"', { v: { Size: 'SM', Language: 'EN' }, props: { Title: '0 records (200 OK)', 'Primary action': false, 'Secondary action': false } }]
  ],
  content: [
    ['title', 'Plain-language statement ("No shifts scheduled", "No matching results")', '45 chars'],
    ['description', '1–2 short sentences guiding the user to the next step', '140 chars'],
    ['primary action', 'Verb + noun ("Create shift", "Clear filters")', '24 chars']
  ],
  contentEx: [
    ['No matching results · Clear filters', 'لا توجد نتائج مطابقة · مسح الفلاتر', '0 results found.'],
    ['No shifts scheduled · Create shift', 'لا توجد مناوبات مجدولة · إنشاء مناوبة', 'Table is empty. Click here']
  ],
  devices: [
    ['Tablet landscape', 'Centred vertically and horizontally inside the empty table or split-view pane.', { v: { Size: 'MD', Language: 'EN' } }]
  ],
  platform: [
    ['Alignment', 'Centred text and visual badge; max width 480 dp (MD) / 384 dp (SM)'],
    ['Actions', 'Horizontal Button row with 48×48 dp touch targets'],
    ['Sizes', 'MD (default) for pages/tables · SM for cards/drawers']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Tablet · AR; title and description remain centred, and the horizontal action row reverses reading order (primary action on the right).',
  rtl: [
    [
      ['LTR (EN)', { v: { Size: 'MD', Language: 'EN' } }],
      ['RTL (AR)', { v: { Size: 'MD', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Title is marked Semantics(header: true); the decorative visual badge is wrapped in ExcludeSemantics.',
  keys: [
    ['Tab', 'Moves focus to the primary action button and then the secondary action button'],
    ['Enter / Space', 'Activates the focused action button']
  ],
  sr: 'Visual icon badge uses ExcludeSemantics. Buttons enforce 48×48 dp minimum target size.',
  focus: 'Nested Button instances display standard 2 dp color/border/focus rings.',
  contrast: [
    ['title (color/text/default) on surface', '19.8:1', '17.2:1'],
    ['description (color/text/subtle) on surface', '14.55:1', '13.31:1'],
    ['description (color/text/subtlest) on surface', '7.57:1', '9.81:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Size (MD · SM) × Language (EN · AR), Title, Description, Show visual, Primary & Secondary actions', 'No']
  ]
};

const emptyDoc = await runDoc(D_Empty, EX_Empty, mkAL);

// 2. Skeleton (Tablet)
const skelPage = findPage('↳ Skeleton');
await skelPage.loadAsync();
const skelSet = skelPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Skeleton');
const libCols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const spCol = libCols.find(c => c.name === '3. Spacing');
const spVars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(spCol.key);
const spMd = await figma.variables.importVariableByKeyAsync(spVars.find(v => v.name === 'spacing/md').key);
const spLg = await figma.variables.importVariableByKeyAsync(spVars.find(v => v.name === 'spacing/lg').key);

async function EX_Skel(s) {
  if (s.compose === 'row') {
    const row = mkAL('HORIZONTAL');
    row.fills = [];
    row.counterAxisAlignItems = 'CENTER';
    row.setBoundVariable('itemSpacing', spLg);
    const av = pick(skelSet, { Shape: 'Circle' }).createInstance();
    const lines = mkAL('VERTICAL');
    lines.fills = [];
    lines.setBoundVariable('itemSpacing', spMd);
    if (s.rtl) lines.counterAxisAlignItems = 'MAX';
    const l1 = pick(skelSet, { Shape: 'Line' }).createInstance();
    l1.resize(220, l1.height);
    const l2 = pick(skelSet, { Shape: 'Line' }).createInstance();
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
    const i = pick(skelSet, s.v).createInstance();
    if (s.w) i.resize(s.w, i.height);
    return i;
  }
  const f = figma.createFrame();
  f.resize(s.w || 320, s.h || 80);
  f.fills = [];
  return f;
}

const D_Skel = {
  name: 'Skeleton',
  setId: skelSet.id,
  os: 'Tablet',
  mode: '3869:8',
  rebuild: false,
  sub: 'Low-fidelity structural placeholder that mirrors the layout of content while data is loading',
  ver: '1.0',
  desc: 'A skeleton is a low-fidelity placeholder shape (line, circle or block) that mirrors the layout of a page, card, list row or table while data is being fetched. It reduces perceived latency and prevents layout shift when real content arrives.',
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
    ['Animate', 'CODE ONLY', 'true · false', 'true', 'shimmer/pulse animation (motion/duration/progress · paused in reduced motion)']
  ],
  tokensNote: 'No component tokens: every bone binds directly to Foundations subtle background, radius and size tokens.',
  tokens: [
    ['bone · fill (base)', 'all', 'color/background/base/subtle'],
    ['bone · fill (shimmer peak)', 'animated (code)', 'color/background/base/subtlest'],
    ['bone · radius', 'Line · Circle · Block', 'radius/xs (4 dp) · radius/full (9999 dp) · radius/md (8 dp)'],
    ['bone · default size', 'Line', 'width size/container/xs (384 dp) · height spacing/xl (16 dp)'],
    ['bone · default size', 'Circle', 'width & height size/control/height/md (40 dp)'],
    ['bone · default size', 'Block', 'width size/container/xxs (320 dp) · padding-block 2 × size/control/height/xl (112 dp)']
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
    ['Do not render a single tiny Circle bone for an entire multi-column table', { v: { Shape: 'Circle' } }],
    ['Do not keep skeletons visible indefinitely after a request fails — show an Alert or Empty state', { v: { Shape: 'Line' } }]
  ],
  content: [
    ['bone', 'Contains zero visible text — never place "Loading..." copy inside a skeleton bone', '0 chars'],
    ['line width', 'Vary stacked line widths (e.g. 100%, 80%, 55%) to mimic natural text', '—']
  ],
  contentEx: [
    ['Semantics(label: "Loading") on parent container', 'Semantics(label: "جاري التحميل") على الحاوية الأب', 'Text "Loading..." inside bone'],
    ['3–6 skeleton rows matching table height', '٣–٦ صفوف هيكلية تطابق الجدول', '20+ pulsing bones on one screen']
  ],
  devices: [
    ['Tablet landscape', 'Fills parent card, list row or table cell width on tablet.', { compose: 'row' }]
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

// 3. Add 4 cards to Tablet Components List (page 16:2, row 192:1433) and collect full D11 report
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

const clPage = await figma.getNodeByIdAsync('16:2') || findPage('Components List');
await clPage.loadAsync();
await figma.setCurrentPageAsync(clPage);
const row = await figma.getNodeByIdAsync('192:1433');
const MAX_SCALE = 1.4;
const addedCards = [];

for (const nm of NAMES) {
  const info = report[nm];
  let c = row.children.find(n => n.name === nm + ' Card');
  if (!c) {
    const last = row.children[row.children.length - 1];
    c = last.clone();
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
