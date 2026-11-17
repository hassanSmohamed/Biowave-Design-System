// Build Phase 2 documentation pages (00–09, 11) for Accordion in Web Components
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

const page = await figma.getNodeByIdAsync('706:22199');
await page.loadAsync();
await figma.setCurrentPageAsync(page);
const SET = await figma.getNodeByIdAsync('732:4818');

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
  f.resize(s.w || 640, s.h || 120);
  f.fills = [];
  return f;
}

const D = {
  name: 'Accordion',
  setId: '732:4818',
  rebuild: true,
  sub: 'Collapsible content panel with an interactive header trigger and expandable body container',
  ver: '1.0',
  desc: 'An accordion is a vertically stacked set of interactive headings that each expand to reveal a section of associated content. Accordions let users scan high-level section titles and selectively expand the details they need, reducing vertical clutter in dense settings (settings panels, FAQs, complex forms, inspection checklists).',
  col: 'Language',
  rows: ['Expanded'],
  cellW: 680,
  axisW: 200,
  sheetFill: false,
  parts: ['container', 'header', 'leading-icon', 'title', 'subtitle', 'chevron', 'divider', 'body'],
  intro: [{ v: { Expanded: 'false', Language: 'EN' } }],
  propsNote: 'One set: Expanded (false · true) × Language (EN · AR) = 4 variants. Title and Subtitle are text properties on EN variants; Show subtitle and Leading icon toggle optional parts.',
  props: [
    ['Expanded', 'VARIANT', 'false · true', 'false', 'collapsed or expanded state'],
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Web · EN / Web · AR; mirrored header layout'],
    ['Title', 'TEXT', '—', 'Section title', 'plain-language heading'],
    ['Subtitle', 'TEXT', '—', 'Optional description', 'secondary hint text'],
    ['Show subtitle', 'BOOLEAN', '—', 'false', 'toggle subtitle'],
    ['Leading icon', 'BOOLEAN', '—', 'false', 'toggle leading category icon']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations semantic tokens.',
  tokens: [
    ['container · fill', 'all', 'color/surface/default'],
    ['container · border', 'all', '1 px color/border/default · radius/md (8 px)'],
    ['header · padding', 'all', 'inline & block spacing/xl (16 px) · gap spacing/lg (12 px)'],
    ['header · fill (hover)', 'all', 'color/background/transparent/hovered'],
    ['title · text & color', 'all', 'title/md · color/text/default'],
    ['subtitle · text & color', 'all', 'body/sm · color/text/subtle'],
    ['chevron · icon & color', 'all', 'size/icon/md (20 px) · color/icon/subtle · expand_more'],
    ['divider · stroke & fill', 'Expanded=true', '1 px color/border/subtle'],
    ['body · padding & gap', 'Expanded=true', 'spacing/xl (16 px) · gap spacing/lg (12 px)']
  ],
  vars: [
    {
      title: 'Expanded state',
      desc: 'Collapsed by default saving vertical space; expands on click to reveal details.',
      tiles: [
        ['Expanded = false', { v: { Expanded: 'false', Language: 'EN' } }],
        ['Expanded = true', { v: { Expanded: 'true', Language: 'EN' } }]
      ]
    },
    {
      title: 'Header options',
      desc: 'Support optional leading icon and optional subtitle to surface summary information.',
      tiles: [
        ['With Subtitle', { v: { Expanded: 'false', Language: 'EN' }, props: { 'Show subtitle': true } }],
        ['With Leading Icon', { v: { Expanded: 'false', Language: 'EN' }, props: { 'Leading icon': true } }],
        ['Icon + Subtitle', { v: { Expanded: 'true', Language: 'EN' }, props: { 'Leading icon': true, 'Show subtitle': true } }]
      ]
    }
  ],
  statesNote: 'Interactive header trigger supports default, hovered, pressed and focused states; disabled items prevent expansion in code.',
  motionNote: 'Panel height animates open/close over motion/duration/md (200 ms) with standard easing. Chevron rotates 180° over motion/duration/sm (150 ms).',
  motion: [
    ['Collapsed → Expanded', 'md', { v: { Expanded: 'false', Language: 'EN' } }, { v: { Expanded: 'true', Language: 'EN' } }]
  ],
  use: [
    'Use an accordion to organise dense settings, FAQs or inspection forms into scan-friendly collapsible sections.',
    { v: { Expanded: 'true', Language: 'EN' } }
  ],
  notUse: 'Do not use for primary screen navigation (use Tabs), nor hide critical urgent alerts inside collapsed panels.',
  dos: [
    ['Keep section titles concise, informative and parallel', { v: { Expanded: 'false', Language: 'EN' } }],
    ['Surface key summary metrics in the subtitle when helpful', { v: { Expanded: 'false', Language: 'EN' }, props: { 'Show subtitle': true } }]
  ],
  donts: [
    ['Do not put destructive actions or primary page submit buttons inside collapsed panels', { v: { Expanded: 'true', Language: 'EN' } }],
    ['Do not nest accordions within accordions', { v: { Expanded: 'false', Language: 'EN' } }]
  ],
  content: [
    ['title', 'Scannable entity title ("Personal information", "Security")', '40 chars'],
    ['subtitle', 'Helpful context or status ("Completed", "Optional")', '30 chars'],
    ['body content', 'Clear, well-structured form or descriptive content', '500 chars']
  ],
  contentEx: [
    ['Personal information · Completed', 'المعلومات الشخصية · مكتمل', 'Section 1: Details'],
    ['Security settings · 2-factor active', 'إعدادات الأمان · التحقق بخطوتين مفعّل', 'Click here to edit security']
  ],
  devices: [
    ['Desktop', 'Container fills width or adapts to parent layout card with hover cues.', { v: { Expanded: 'true', Language: 'EN' } }]
  ],
  platform: [
    ['Trigger', 'Header functions as an accessible button with aria-expanded'],
    ['Spacing', 'Standard 16 px padding and 8 px border-radius'],
    ['Touch / Pointer', 'Header min-height 48 px satisfies touch target requirements']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Web · AR; chevron moves to the left edge, title and subtitle align right, and leading icon is positioned on the far right.',
  rtl: [
    [
      ['LTR (EN)', { v: { Expanded: 'true', Language: 'EN' } }],
      ['RTL (AR)', { v: { Expanded: 'true', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Accordion header uses role="button" with aria-expanded="true|false" and aria-controls linking to the content region.',
  keys: [
    ['Tab', 'Focuses the accordion header trigger'],
    ['Enter / Space', 'Toggles accordion panel expanded state'],
    ['ArrowUp / ArrowDown', 'Navigates focus between accordion headers in a group']
  ],
  sr: 'Screen readers announce header text, expanded/collapsed state, and position in group.',
  focus: 'Visible 2 px focus ring (color/border/focus) wraps the active header trigger.',
  contrast: [
    ['title (color/text/default) on surface', '≥ 15.3:1', '≥ 13.5:1'],
    ['subtitle (color/text/subtle) on surface', '≥ 5.7:1', '≥ 6.1:1'],
    ['chevron (color/icon/subtle) on surface', '≥ 4.5:1', '≥ 4.8:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-15', 'Initial (Wave 10): Expanded (false · true) × Language (EN · AR), Title, Subtitle, Leading icon', 'No']
  ]
};

const src = figma.root.getSharedPluginData('biowave', 'w8core')
  .replace(/figma\.createAutoLayout\(/g, 'mkAL(')
  .replace('await lf(inst);', '')
  .replace(/const W6=[^\n]+/, "const W6=await figma.variables.getVariableByIdAsync('VariableID:99599514c759fa9e28a58abf278f73814f1a0d18/4987:213'), W2=await figma.variables.getVariableByIdAsync('VariableID:099f79a0492cc7bb141b6647f26b8637d2dd7021/4987:218');");
const AF = Object.getPrototypeOf(async function () {}).constructor;
return await (new AF('D', 'EX', 'mkAL', src))(D, EX, mkAL);
