// Build Phase 2 documentation pages (00–09, 11) for Card in Web Components
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

const page = await figma.getNodeByIdAsync('706:22358');
await page.loadAsync();
await figma.setCurrentPageAsync(page);
const SET = await figma.getNodeByIdAsync('706:22981');

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
  f.resize(s.w || 320, s.h || 240);
  f.fills = [];
  return f;
}

const D = {
  name: 'Card',
  setId: '706:22981',
  rebuild: true,
  sub: 'Foundational surface container grouping related information, media, and actions',
  ver: '1.0',
  desc: 'A card is a flexible surface container used to group related information, media, and interactive controls into a single entry point. Cards establish clear visual hierarchy across dashboards, grid views, and mobile feeds, supporting three visual variants: Outlined, Elevated, and Filled.',
  col: 'Language',
  rows: ['Variant', 'Selected'],
  cellW: 400,
  axisW: 220,
  sheetFill: false,
  parts: ['container', 'header', 'avatar', 'title', 'subtitle', 'media', 'body', 'footer'],
  intro: [{ v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }],
  propsNote: 'One set: Variant (Outlined · Elevated · Filled) × Selected (false · true) × Language (EN · AR) = 12 variants. Title and Subtitle are text properties on EN variants; Show header, Show media, Show footer and Interactive toggle parts and behavior.',
  props: [
    ['Variant', 'VARIANT', 'Outlined · Elevated · Filled', 'Outlined', 'container visual styling'],
    ['Selected', 'VARIANT', 'false · true', 'false', 'highlighted selection boundary'],
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Web · EN / Web · AR; mirrored layout'],
    ['Title', 'TEXT', '—', 'Card title', 'entity heading'],
    ['Subtitle', 'TEXT', '—', 'Card description', 'supporting context / metadata'],
    ['Show header', 'BOOLEAN', '—', 'true', 'toggle header with avatar & titles'],
    ['Show media', 'BOOLEAN', '—', 'false', 'toggle cover media container'],
    ['Show footer', 'BOOLEAN', '—', 'true', 'toggle action button bar'],
    ['Interactive', 'BOOLEAN', '—', 'false', 'toggle click & hover elevation']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations semantic tokens.',
  tokens: [
    ['Outlined · fill & border', 'all', 'color/surface/default · 1 px color/border/default · radius/lg (12 px)'],
    ['Elevated · fill & shadow', 'all', 'color/surface/default · Elevation/1 · 1 px color/border/subtle'],
    ['Filled · fill & border', 'all', 'color/surface/subtle · no border · radius/lg (12 px)'],
    ['Selected · border', 'all', '2 px color/border/brand'],
    ['container · padding', 'all', 'spacing/lg (20 px) all sides · gap spacing/md (16 px)'],
    ['title · text & color', 'all', 'title/md · color/text/default'],
    ['subtitle · text & color', 'all', 'body/sm · color/text/subtle'],
    ['body · text & color', 'all', 'body/md · color/text/default'],
    ['footer · gap', 'all', 'spacing/sm (12 px)']
  ],
  vars: [
    {
      title: 'Variant',
      desc: 'Outlined (default) for dashboard grids and forms; Elevated for soft separation; Filled for nested grouping.',
      tiles: [
        ['Variant = Outlined', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }],
        ['Variant = Elevated', { v: { Variant: 'Elevated', Selected: 'false', Language: 'EN' } }],
        ['Variant = Filled', { v: { Variant: 'Filled', Selected: 'false', Language: 'EN' } }]
      ]
    },
    {
      title: 'Selection state',
      desc: 'Selected cards apply a 2 px brand border (color/border/brand) to mark chosen items in pickers.',
      tiles: [
        ['Selected = false', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }],
        ['Selected = true', { v: { Variant: 'Outlined', Selected: 'true', Language: 'EN' } }],
        ['Elevated + Selected', { v: { Variant: 'Elevated', Selected: 'true', Language: 'EN' } }]
      ]
    },
    {
      title: 'Slot configurations',
      desc: 'Headers, cover media and footer buttons can be toggled depending on the card content type.',
      tiles: [
        ['With Cover Media', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' }, props: { 'Show media': true } }],
        ['Content only (no header/footer)', { v: { Variant: 'Filled', Selected: 'false', Language: 'EN' }, props: { 'Show header': false, 'Show footer': false } }],
        ['Full card (header + media + footer)', { v: { Variant: 'Elevated', Selected: 'false', Language: 'EN' }, props: { 'Show media': true } }]
      ]
    }
  ],
  statesNote: 'Interactive cards lift elevation from Elevation/1 to Elevation/2 on hover and display standard 2 px focus rings when focused.',
  motionNote: 'Hover elevation transitions over motion/duration/short-2 (150 ms) with standard easing. Selection border snaps instantly.',
  motion: [
    ['Default → Hovered', 'short-2', { v: { Variant: 'Elevated', Selected: 'false', Language: 'EN' } }, { v: { Variant: 'Elevated', Selected: 'false', Language: 'EN' } }]
  ],
  use: [
    'Use cards to group diverse, interrelated data, media, and actions into modular units that fit responsive grids.',
    { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }
  ],
  notUse: 'Do not use for homogeneous lists of text rows (use Data table or List), nor nest interactive cards inside other interactive cards.',
  dos: [
    ['Keep card heights consistent within the same dashboard row', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }],
    ['Use Outlined cards for complex dashboards with clear boundaries', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }]
  ],
  donts: [
    ['Do not overcrowd a single card with more than two primary action buttons', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }],
    ['Do not mix Outlined, Elevated and Filled variants haphazardly in the same grid', { v: { Variant: 'Elevated', Selected: 'false', Language: 'EN' } }]
  ],
  content: [
    ['title', 'Scannable entity title ("Employee details", "Billing cycle")', '40 chars'],
    ['subtitle', 'Secondary metadata or status', '30 chars'],
    ['body content', 'Concise summary copy, metrics, or key-value fields', '300 chars']
  ],
  contentEx: [
    ['Employee card · Active shift', 'بطاقة الموظف · المناوبة النشطة', 'Click to view employee details'],
    ['Standard plan · Annual renewal', 'الباقة الأساسية · تجديد سنوي', 'Selected option']
  ],
  devices: [
    ['Desktop', 'Flexible responsive widths across 3-column and 4-column dashboard grids.', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }]
  ],
  platform: [
    ['Grid integration', 'Seamlessly aligns to 12-column page layout grids'],
    ['Padding', 'Standard 20 px padding maintains comfortable breathing room'],
    ['Interactive', 'Whole-card actionable surface wraps neatly with accessible focus ring']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Web · AR; header text aligns right, avatar mirrors to the right, actions align in RTL reading order.',
  rtl: [
    [
      ['LTR (EN)', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }],
      ['RTL (AR)', { v: { Variant: 'Outlined', Selected: 'false', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Cards use semantic article container elements; interactive cards support keyboard Tab navigation and Enter activation.',
  keys: [
    ['Tab', 'Moves focus to interactive card or through action buttons inside the card'],
    ['Enter / Space', 'Activates the focused interactive card or button']
  ],
  sr: 'Screen readers announce card title, subtitle, and selected state via aria-selected="true" when selectable.',
  focus: 'Visible 2 px focus ring (color/border/focus) wraps the card perimeter.',
  contrast: [
    ['title (color/text/default) on surface', '≥ 15.3:1', '≥ 13.5:1'],
    ['subtitle (color/text/subtle) on surface', '≥ 5.7:1', '≥ 6.1:1'],
    ['brand border (color/border/brand) on background', '≥ 4.5:1', '≥ 4.5:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-15', 'Initial (Wave 10): Variant (Outlined · Elevated · Filled) × Selected (false · true) × Language (EN · AR), Slots, Interactive', 'No']
  ]
};

const src = figma.root.getSharedPluginData('biowave', 'w8core')
  .replace(/figma\.createAutoLayout\(/g, 'mkAL(')
  .replace('await lf(inst);', '')
  .replace(/const W6=[^\n]+/, "const W6=await figma.variables.getVariableByIdAsync('VariableID:99599514c759fa9e28a58abf278f73814f1a0d18/4987:213'), W2=await figma.variables.getVariableByIdAsync('VariableID:099f79a0492cc7bb141b6647f26b8637d2dd7021/4987:218');");
const AF = Object.getPrototypeOf(async function () {}).constructor;
return await (new AF('D', 'EX', 'mkAL', src))(D, EX, mkAL);
