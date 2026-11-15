// Build Phase 2 documentation pages (00–09, 11) for Empty state in Web Components
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

const emptyPage = await figma.getNodeByIdAsync('694:220192');
await emptyPage.loadAsync();
const SET = await figma.getNodeByIdAsync('694:220298');

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

async function EX(s) {
  if (s.v) {
    const i = pick(SET, s.v).createInstance();
    setPr(i, s.props);
    return i;
  }
  const f = figma.createFrame();
  f.resize(s.w || 400, s.h || 240);
  f.fills = [];
  return f;
}

const D = {
  name: 'Empty state',
  setId: '694:220298',
  rebuild: true,
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
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Web · EN / Web · AR; mirrored action row'],
    ['Title', 'TEXT', '—', 'No matching results', 'title (plain-language heading)'],
    ['Description', 'TEXT', '—', 'Try adjusting your search or clearing the active filters.', 'description (1–2 sentence guidance)'],
    ['Show visual', 'BOOLEAN', '—', 'true', 'Toggle leading circular icon badge'],
    ['Primary action', 'BOOLEAN', '—', 'true', 'Toggle primary recovery Button'],
    ['Secondary action', 'BOOLEAN', '—', 'true', 'Toggle secondary Button']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations semantic tokens. Nested Button instances carry their own tokens.',
  tokens: [
    ['container · padding', 'MD · SM', 'block spacing/layout/section-sm (32 px) / spacing/2xl (24 px) · inline spacing/2xl (24 px)'],
    ['container · gap', 'MD · SM', 'spacing/xl (16 px) · spacing/lg (12 px)'],
    ['visual · badge size', 'MD · SM', 'size/avatar/xl (56 px) · size/avatar/lg (40 px)'],
    ['visual · fill & radius', 'all', 'color/background/neutral/subtlest · radius/full'],
    ['visual · icon', 'MD · SM', 'size/icon/lg (24 px) / size/icon/md (20 px) · color/icon/subtle'],
    ['title · text & color', 'MD · SM', 'heading/sm (MD) / title/md (SM) · color/text/default'],
    ['description · text & color', 'all', 'body/md · color/text/subtle · max-width size/panel/lg (360 px)'],
    ['actions · gap', 'all', 'spacing/md (8 px)']
  ],
  vars: [
    {
      title: 'Size',
      desc: 'MD for full-page sections, tables and tabs; SM for compact cards, side panels and filter popovers.',
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
  statesNote: 'The empty state container is static; interactive hover, focus and pressed states belong to its nested primary and secondary Button instances.',
  motionNote: 'Fades in (opacity 0 → 1) over motion/duration/sm (150 ms) with decelerate easing when replacing a skeleton or cleared list.',
  motion: [
    ['Loading → Empty', 'sm', { empty: true, w: 400, h: 240 }, { v: { Size: 'MD', Language: 'EN' } }]
  ],
  use: [
    'Use an empty state when a table, list, dashboard widget or search query returns zero items, pairing a clear explanation with the next action.',
    { v: { Size: 'MD', Language: 'EN' } }
  ],
  notUse: 'Not while data is still loading (use Skeleton), nor when a request failed due to a server/network error that belongs in an inline Alert.',
  dos: [
    ['Explain both why the view is empty and how to populate it', { v: { Size: 'MD', Language: 'EN' }, props: { 'Secondary action': false } }],
    ['Use Size = SM inside compact cards or narrow panels', { v: { Size: 'SM', Language: 'EN' }, props: { 'Secondary action': false } }]
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
    ['Desktop', 'Centred vertically and horizontally inside the empty table or section container.', { v: { Size: 'MD', Language: 'EN' } }]
  ],
  platform: [
    ['Alignment', 'Centred text and visual badge; description constrained to 360 px (size/panel/lg) for readability'],
    ['Actions', 'Horizontal Button row (md buttons on MD, sm buttons on SM)'],
    ['Sizes', 'MD (default) for pages/tables · SM for cards/drawers']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Web · AR; title and description remain centred, and the horizontal action row reverses reading order (primary action on the right).',
  rtl: [
    [
      ['LTR (EN)', { v: { Size: 'MD', Language: 'EN' } }],
      ['RTL (AR)', { v: { Size: 'MD', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Title renders as a semantic heading (h2/h3) matching the page hierarchy; the decorative visual badge is hidden from assistive technology (aria-hidden="true").',
  keys: [
    ['Tab', 'Moves focus to the primary action button and then the secondary action button'],
    ['Enter / Space', 'Activates the focused action button']
  ],
  sr: 'Visual icon badge has aria-hidden="true". When rendered dynamically after a filter/search, wrap or announce the result count via a polite status region.',
  focus: 'Nested Button instances display standard 2 px color/border/focus rings.',
  contrast: [
    ['title (color/text/default) on surface', '≥ 15.3:1', '≥ 13.5:1'],
    ['description (color/text/subtle) on surface', '≥ 5.7:1', '≥ 6.1:1'],
    ['visual icon (color/icon/subtle) on neutral/subtlest badge', '≥ 4.6:1', '≥ 4.9:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Size (MD · SM) × Language (EN · AR), Title, Description, Show visual, Primary & Secondary actions', 'No']
  ]
};

const src = figma.root.getSharedPluginData('biowave', 'w8core')
  .replace(/figma\.createAutoLayout\(/g, 'mkAL(')
  .replace('await lf(inst);', '')
  .replace(/const W6=[^\n]+/, "const W6=await figma.variables.getVariableByIdAsync('VariableID:99599514c759fa9e28a58abf278f73814f1a0d18/4987:213'), W2=await figma.variables.getVariableByIdAsync('VariableID:099f79a0492cc7bb141b6647f26b8637d2dd7021/4987:218');");
const AF = Object.getPrototypeOf(async function () {}).constructor;
return await (new AF('D', 'EX', 'mkAL', src))(D, EX, mkAL);
