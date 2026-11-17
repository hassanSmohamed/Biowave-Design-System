// Wave 10 — Build Card Documentation (00–09, 11) in Biowave DS — Tablet Components
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

const cardPage = findPage('↳ Card');
await cardPage.loadAsync();
await figma.setCurrentPageAsync(cardPage);

// Remove stray frame if any
const stray = cardPage.findChild(n => n.name === 'Frame');
if (stray) stray.remove();

const cardSet = cardPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Card');

async function EX_Card(s) {
  if (s.v) {
    const i = pick(cardSet, s.v).createInstance();
    setPr(i, s.props);
    return i;
  }
  const f = figma.createFrame();
  f.resize(s.w || 320, s.h || 240);
  f.fills = [];
  return f;
}

const D_Card = {
  name: 'Card',
  setId: cardSet.id,
  os: 'Tablet',
  mode: '3869:8',
  rebuild: true,
  sub: 'Foundational surface container grouping related information, media, and actions',
  ver: '1.0',
  desc: 'A card is a flexible surface container used to group related information, media, and interactive controls into a single entry point. Cards establish clear visual hierarchy across tablet dashboards, grid views, and split-pane lists, supporting three visual variants: Outlined, Elevated, and Filled.',
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
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Tablet · EN / Tablet · AR; mirrored layout'],
    ['Title', 'TEXT', '—', 'Card title', 'entity heading'],
    ['Subtitle', 'TEXT', '—', 'Card description', 'supporting context / metadata'],
    ['Show header', 'BOOLEAN', '—', 'true', 'toggle header with avatar & titles'],
    ['Show media', 'BOOLEAN', '—', 'false', 'toggle cover media container'],
    ['Show footer', 'BOOLEAN', '—', 'true', 'toggle action button bar'],
    ['Interactive', 'BOOLEAN', '—', 'false', 'toggle click & hover elevation']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations semantic tokens.',
  tokens: [
    ['Outlined · fill & border', 'all', 'color/surface/default · 1 px color/border/default · radius/xl (16 px)'],
    ['Elevated · fill & shadow', 'all', 'color/surface/default · Elevation/1 · 1 px color/border/subtle'],
    ['Filled · fill & border', 'all', 'color/surface/subtle · no border · radius/xl (16 px)'],
    ['Selected · border', 'all', '2 px color/border/brand'],
    ['container · padding', 'all', 'spacing/2xl (24 px) all sides · gap spacing/xl (16 px)'],
    ['title · text & color', 'all', 'title/md · color/text/default'],
    ['subtitle · text & color', 'all', 'body/sm · color/text/subtle'],
    ['body · text & color', 'all', 'body/md · color/text/default'],
    ['footer · gap', 'all', 'spacing/lg (12 px)']
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
  statesNote: 'Interactive cards lift elevation from Elevation/1 to Elevation/2 on tap/hover and display standard 2 px focus rings when focused.',
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
    ['Keep card hierarchies clear and prioritize one primary action in the footer', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }],
    ['Use consistent card variant styling within the same screen section', { v: { Variant: 'Elevated', Selected: 'false', Language: 'EN' } }]
  ],
  donts: [
    ['Do not overload a card with competing primary buttons', { v: { Variant: 'Filled', Selected: 'false', Language: 'EN' } }],
    ['Do not put full-width paragraphs of text without clear chunking', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }]
  ],
  content: [
    ['title', 'Clear, scannable entity title ("Patient profile", "Shift details")', '40 chars'],
    ['subtitle', 'Supporting metadata ("Created today", "Dr. Sarah Adams")', '30 chars'],
    ['body', 'Compact summary or interactive controls', '160 chars']
  ],
  contentEx: [
    ['Patient profile · Admitted', 'ملف المريض · تم الدخول', 'Details here'],
    ['Lab report · Results ready', 'تقرير المختبر · النتائج جاهزة', 'Click for report']
  ],
  devices: [
    ['Tablet landscape', 'Container fits 2-column or 3-column responsive layout grid.', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }]
  ],
  platform: [
    ['Touch target', 'Footer buttons enforce 48×48 dp minimum touch target on Tablet'],
    ['Elevation', 'Elevation/1 provides subtle depth separation on large screens'],
    ['Border radius', 'radius/xl (16 px) maintains organic modern look across surface containers']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Tablet · AR; avatar moves to the right edge, text aligns right, and footer buttons flip order to follow RTL reading flow.',
  rtl: [
    [
      ['LTR (EN)', { v: { Variant: 'Outlined', Selected: 'false', Language: 'EN' } }],
      ['RTL (AR)', { v: { Variant: 'Outlined', Selected: 'false', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Cards use container semantics with aria-labelledby referencing the title and aria-selected on selectable cards.',
  keys: [
    ['Tab', 'Moves focus between interactive elements inside the card or focuses card container if interactive'],
    ['Enter / Space', 'Activates the focused action or selects the card']
  ],
  sr: 'Screen readers announce card title, selected state, and internal action buttons in logical order.',
  focus: 'Visible 2 px focus ring (color/border/focus) wraps interactive cards and buttons when focused.',
  contrast: [
    ['title (color/text/default) on surface', '≥ 15.3:1', '≥ 13.5:1'],
    ['subtitle (color/text/subtle) on surface', '≥ 5.7:1', '≥ 6.1:1'],
    ['border (color/border/default) on background', '≥ 3.2:1', '≥ 3.5:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-17', 'Initial (Wave 10): Variant (3) × Selected (2) × Language (2) = 12 variants, Title, Subtitle, Show header/media/footer', 'No']
  ]
};

let src = figma.root.getSharedPluginData('biowave', 'w8core')
  .replace(/figma\.createAutoLayout\(/g, 'mkAL(')
  .replace('await lf(inst);', '');

src = "try {\n" + src + "\n} catch(err) { return { ok: false, error: err.message, stack: err.stack }; }";

const AF = Object.getPrototypeOf(async function () {}).constructor;
const runDoc = new AF('D', 'EX', 'mkAL', src);
return await runDoc(D_Card, EX_Card, mkAL);