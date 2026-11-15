// Build Phase 2 documentation pages (00–09, 11) for Alert in Web Components
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

const alertPage = await figma.getNodeByIdAsync('691:218883');
await alertPage.loadAsync();
const SET = await figma.getNodeByIdAsync('691:219739');

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
    if (s.w) i.resize(s.w, i.height);
    return i;
  }
  const f = figma.createFrame();
  f.resize(s.w || 640, s.h || 80);
  f.fills = [];
  return f;
}

const D = {
  name: 'Alert',
  setId: '691:219739',
  rebuild: true,
  sub: 'Inline status banner for important contextual feedback inside a page, section, form or dialog',
  ver: '1.0',
  desc: 'An alert is an inline status banner placed inside page, section, form or dialog content to surface important contextual information (info, success, warning, error, neutral). Unlike a snackbar, it stays in the layout until the underlying condition is resolved or the user explicitly dismisses it.',
  col: 'Language',
  rows: ['Status'],
  cellW: 680,
  axisW: 200,
  sheetFill: false,
  parts: ['container', 'icon', 'title', 'description', 'action', 'close-button'],
  intro: [{ v: { Status: 'Warning', Language: 'EN' } }],
  propsNote: 'One set: Status (5) × Language (2) = 10 variants. Title and Description are text properties on EN variants; Show title, Action and Close button toggle optional parts.',
  props: [
    ['Status', 'VARIANT', 'Info · Success · Warning · Error · Neutral', 'Info', 'status (info · success · warning · error · neutral)'],
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Web · EN / Web · AR; mirrored layout'],
    ['Title', 'TEXT', '—', 'Shift update scheduled', 'title (optional short heading)'],
    ['Description', 'TEXT', '—', 'New attendance rules take effect on Monday.', 'children / description'],
    ['Show title', 'BOOLEAN', '—', 'true', 'Toggle title visibility (false for single-line banner)'],
    ['Action', 'BOOLEAN', '—', 'true', 'Toggle trailing compact Button'],
    ['Close button', 'BOOLEAN', '—', 'true', 'onDismiss present (trailing Icon Button)']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations semantic tokens. Nested Button and Icon Button carry their own tokens.',
  tokens: [
    ['container · fill', 'Info · Success · Warning · Error · Neutral', 'color/background/{role}/subtlest'],
    ['container · border', 'Info · Success · Warning · Error · Neutral', 'color/border/{role} · border/width/default'],
    ['container · radius', 'all', 'radius/md (8 px)'],
    ['container · padding', 'all', 'block spacing/lg (12 px) · inline spacing/xl (16 px)'],
    ['container · gap', 'all', 'spacing/lg (12 px)'],
    ['icon · size & color', 'all', 'size/icon/lg (24 px) · color/icon/role/{role}'],
    ['title · text & color', 'all', 'title/md · color/text/role/{role}'],
    ['description · text & color', 'all', 'body/md · color/text/default']
  ],
  vars: [
    {
      title: 'Status',
      desc: 'Five semantic roles pair a distinct status icon with role-tinted fill, border and heading colour so status is never conveyed by colour alone.',
      tiles: [
        ['Status = Info', { v: { Status: 'Info', Language: 'EN' } }],
        ['Status = Success', { v: { Status: 'Success', Language: 'EN' } }],
        ['Status = Warning', { v: { Status: 'Warning', Language: 'EN' } }],
        ['Status = Error', { v: { Status: 'Error', Language: 'EN' } }],
        ['Status = Neutral', { v: { Status: 'Neutral', Language: 'EN' } }]
      ]
    },
    {
      title: 'Single-line vs titled & optional controls',
      desc: 'Hide the title for concise one-line announcements, or hide the action / close button when not needed.',
      tiles: [
        ['Single-line (Show title = false)', { v: { Status: 'Info', Language: 'EN' }, props: { 'Show title': false, Action: false } }],
        ['Titled with action', { v: { Status: 'Warning', Language: 'EN' }, props: { 'Show title': true, Action: true } }],
        ['Blocking error (Close button = false)', { v: { Status: 'Error', Language: 'EN' }, props: { 'Close button': false } }]
      ]
    }
  ],
  statesNote: 'The alert banner itself is static; interactive hover, focus and pressed states live on the nested Button (action) and Icon Button (close-button). Long copy wraps cleanly without truncation.',
  motionNote: 'Enter: opacity 0 → 1 over motion/duration/sm (150 ms) with decelerate easing. Exit on dismiss: opacity 1 → 0 over motion/duration/xs (100 ms) with accelerate easing.',
  motion: [
    ['Hidden → Visible', 'sm', { empty: true, w: 640, h: 80 }, { v: { Status: 'Warning', Language: 'EN' } }],
    ['Visible → Dismissed', 'xs', { v: { Status: 'Info', Language: 'EN' }, props: { 'Show title': false, Action: false } }, { empty: true, w: 640, h: 60 }]
  ],
  use: [
    'Use an alert for form validation summaries, contextual warnings inside a Dialog or Side sheet, or persistent section notices that remain until resolved or dismissed.',
    { v: { Status: 'Error', Language: 'EN' } }
  ],
  notUse: 'Not for brief post-action confirmations like "Saved" (use Snackbar), blocking yes/no decisions (use Dialog), empty containers (use Empty state), or inline row status pills (use Badge / Tag).',
  dos: [
    ['Match status to severity and pair with a clear recovery action', { v: { Status: 'Error', Language: 'EN' } }],
    ['Use single-line alerts (Show title = false) for short one-sentence notices', { v: { Status: 'Info', Language: 'EN' }, props: { 'Show title': false, Action: false } }]
  ],
  donts: [
    ['Do not use Error status for routine informational tips', { v: { Status: 'Error', Language: 'EN' }, props: { Title: 'Did you know?', Description: 'You can filter shifts by branch.' } }],
    ['Do not repeat the title word-for-word in the description', { v: { Status: 'Warning', Language: 'EN' }, props: { Title: 'Unsaved changes', Description: 'Unsaved changes.' } }]
  ],
  content: [
    ['title', 'Short noun phrase or summary of the condition; sentence case, no period', '60 chars'],
    ['description', '1–2 sentences explaining what happened and how to resolve it', '160 chars'],
    ['action', '1–2 word verb phrase naming the fix (Retry, Verify card)', '20 chars']
  ],
  contentEx: [
    ['Payment method requires verification · Verify card', 'وسيلة الدفع تحتاج إلى التحقق · تحقّق من البطاقة', 'Error! Click here'],
    ['Connection lost · Check your network and try again.', 'انقطع الاتصال · تحقّق من الشبكة وأعد المحاولة.', 'Something went wrong.']
  ],
  devices: [
    ['Desktop', 'Full-width inline banner inside page, form or dialog container.', { v: { Status: 'Warning', Language: 'EN' } }]
  ],
  platform: [
    ['Placement', 'Inline inside page section, form header, Dialog or Side sheet body'],
    ['Width', 'Fills parent content column (640 px reference on canvas)'],
    ['Interaction', 'Optional trailing Button (sm) and Icon Button (sm) for keyboard + pointer']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Web · AR, the leading status icon sits on the right, text aligns right, and action + close button sit on the left.',
  rtl: [
    [
      ['LTR (EN)', { v: { Status: 'Warning', Language: 'EN' } }],
      ['RTL (AR)', { v: { Status: 'Warning', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Error and warning alerts use role="alert" (assertive/polite live region) so screen readers announce them immediately on appearance; info, success and neutral alerts use role="status".',
  keys: [
    ['Tab', 'Moves focus to the action button and then the close button'],
    ['Enter / Space', 'Activates the focused action or dismisses the alert via the close button']
  ],
  sr: 'error / warning: role="alert"; info / success / neutral: role="status". Close button has aria-label="Dismiss alert" / "إغلاق التنبيه". Status icon is aria-hidden="true".',
  focus: 'Action Button and Close Icon Button display a 2 px color/border/focus ring; the banner container itself is not focusable.',
  contrast: [
    ['title (color/text/role/*) on subtlest fill', '≥ 5.4:1', '≥ 6.1:1'],
    ['description (color/text/default) on subtlest fill', '≥ 11.2:1', '≥ 11.8:1'],
    ['icon (color/icon/role/*) on subtlest fill', '≥ 3.8:1', '≥ 4.5:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Status (5) × Language (2), Title, Description, Show title, Action, Close button', 'No']
  ]
};

const src = figma.root.getSharedPluginData('biowave', 'w8core')
  .replace(/figma\.createAutoLayout\(/g, 'mkAL(')
  .replace('await lf(inst);', '')
  .replace(/const W6=[^\n]+/, "const W6=await figma.variables.getVariableByIdAsync('VariableID:99599514c759fa9e28a58abf278f73814f1a0d18/4987:213'), W2=await figma.variables.getVariableByIdAsync('VariableID:099f79a0492cc7bb141b6647f26b8637d2dd7021/4987:218');");
const AF = Object.getPrototypeOf(async function () {}).constructor;
return await (new AF('D', 'EX', 'mkAL', src))(D, EX, mkAL);
