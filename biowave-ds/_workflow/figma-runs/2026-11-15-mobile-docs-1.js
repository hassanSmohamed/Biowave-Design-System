// Wave 9 Phase 2 (Part 1) — Build Alert & Snackbar Documentation (00–09, 11) in Biowave DS — Mobile Components
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

// 1. Alert (Mobile)
const alertPage = findPage('↳ Alert');
await alertPage.loadAsync();
const alertSet = alertPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Alert');

async function EX_Alert(s) {
  if (s.v) {
    const i = pick(alertSet, s.v).createInstance();
    setPr(i, s.props);
    if (s.w) i.resize(s.w, i.height);
    return i;
  }
  const f = figma.createFrame();
  f.resize(s.w || 640, s.h || 88);
  f.fills = [];
  return f;
}

const D_Alert = {
  name: 'Alert',
  setId: alertSet.id,
  os: 'Mobile',
  mode: '3869:7',
  rebuild: false,
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
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Mobile · EN / Mobile · AR; mirrored layout'],
    ['Title', 'TEXT', '—', 'Shift update scheduled', 'title (optional short heading)'],
    ['Description', 'TEXT', '—', 'New attendance rules take effect on Monday.', 'description'],
    ['Show title', 'BOOLEAN', '—', 'true', 'Toggle title visibility (false for single-line banner)'],
    ['Action', 'BOOLEAN', '—', 'true', 'Toggle trailing Button (48×48 dp touch target)'],
    ['Close button', 'BOOLEAN', '—', 'true', 'onDismiss present (trailing Icon Button)']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations semantic tokens. Nested Button and Icon Button carry their own tokens.',
  tokens: [
    ['container · fill', 'Info · Success · Warning · Error · Neutral', 'color/background/{role}/subtlest · color/surface/subtle (Neutral)'],
    ['container · border', 'Info · Success · Warning · Error · Neutral', 'color/border/{role} · border/width/default'],
    ['container · radius', 'all', 'radius/md (8 dp)'],
    ['container · padding', 'all', 'block spacing/lg (12 dp) · inline spacing/xl (16 dp)'],
    ['container · gap', 'all', 'spacing/lg (12 dp)'],
    ['icon · size & color', 'all', 'size/icon/lg (24 dp) · color/icon/role/{role}'],
    ['title · text & color', 'all', 'title/md · color/text/role/{role}'],
    ['description · text & color', 'all', 'body/lg · color/text/default']
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
      title: 'Layout & action combinations',
      desc: 'Single-line concise banner without title, titled banner with description, with optional action button and dismiss control.',
      tiles: [
        ['Single-line (Show title = false)', { v: { Status: 'Info', Language: 'EN' }, props: { 'Show title': false, Action: false, 'Close button': false } }],
        ['Titled without action', { v: { Status: 'Success', Language: 'EN' }, props: { Action: false } }],
        ['Titled with action and close', { v: { Status: 'Warning', Language: 'EN' } }],
        ['Dismiss-only (no action)', { v: { Status: 'Error', Language: 'EN' }, props: { Action: false } }]
      ]
    }
  ],
  statesNote: 'Alert mounts inline and stays until dismissed or resolved. Action and close buttons have default, hovered, focused and pressed states from Button and Icon Button.',
  motionNote: 'Enter: opacity 0 → 1 over motion/duration/md (200 ms). Exit / dismiss: opacity 1 → 0 over motion/duration/sm (100 ms). Instant under reduced motion.',
  motion: [
    ['Hidden → Visible', 'md', { empty: true, w: 640, h: 88 }, { v: { Status: 'Warning', Language: 'EN' } }],
    ['Visible → Dismissed', 'sm', { v: { Status: 'Warning', Language: 'EN' } }, { empty: true, w: 640, h: 88 }]
  ],
  use: [
    'Use an alert for persistent contextual feedback, warnings or notices within a form, dialog, section or page.',
    { v: { Status: 'Warning', Language: 'EN' } }
  ],
  notUse: 'Not for brief action confirmations (use Snackbar), blocking destructive decisions (use Dialog), or zero-item empty pages (use Empty state).',
  dos: [
    ['Place the alert directly above the relevant form fields or page section', { v: { Status: 'Error', Language: 'EN' } }],
    ['Keep description copy focused on what happened and how to resolve it', { v: { Status: 'Info', Language: 'EN' } }]
  ],
  donts: [
    ['Do not stack more than two alerts on one screen — consolidate messages', { v: { Status: 'Warning', Language: 'EN' } }],
    ['Do not hide critical errors behind dismissible alerts if the user cannot recover', { v: { Status: 'Error', Language: 'EN' }, props: { 'Close button': true } }]
  ],
  content: [
    ['title', 'Short heading (1–4 words); omit period', '32 chars'],
    ['description', 'Clear explanation + next step; full sentences', '120 chars'],
    ['action', 'Specific verb (Retry, View details, Learn more)', '16 chars']
  ],
  contentEx: [
    ['Connection lost · Retry', 'انقطع الاتصال · إعادة المحاولة', 'Oops, something went wrong with the server! Click here.'],
    ['Shift update scheduled', 'تحديث المناوبة مجدول', 'Notice regarding future policy updates in our company.']
  ],
  devices: [
    ['Phone', 'Fills screen width with 16 dp page margin.', { v: { Status: 'Warning', Language: 'EN' } }]
  ],
  platform: [
    ['Placement', 'Inline within scrollable content; pushes sibling elements downward'],
    ['Width', 'Matches container width (full-width on mobile with 16 dp margins)'],
    ['Touch targets', 'Action button and close button provide 48×48 dp minimum hit area']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Mobile · AR, icon flips to right edge, text is right-aligned, and action/close buttons move to left edge.',
  rtl: [
    [
      ['LTR (EN)', { v: { Status: 'Info', Language: 'EN' } }],
      ['RTL (AR)', { v: { Status: 'Info', Language: 'AR' } }]
    ],
    [
      ['LTR (Warning)', { v: { Status: 'Warning', Language: 'EN' } }],
      ['RTL (Warning)', { v: { Status: 'Warning', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Urgent error alerts use role="alert" (assertive live region); info and success use role="status" (polite live region).',
  keys: [
    ['Tab', 'Moves focus to action button, then to close button'],
    ['Enter / Space', 'Activates action or dismisses the alert'],
    ['Esc', 'Dismisses focused dismissible alert']
  ],
  sr: 'Screen reader announces role and copy; status icon is excluded (ExcludeSemantics). Close button has localised "Dismiss alert" / "إغلاق التنبيه" label.',
  focus: 'Focus ring (border/width/focus, color/border/focus) on action and close buttons.',
  contrast: [
    ['info text/icon on info subtlest', '7.36:1', '9.21:1'],
    ['success text/icon on success subtlest', '5.73:1', '10.02:1'],
    ['warning text/icon on warning subtlest', '7.68:1', '8.85:1'],
    ['error text/icon on error subtlest', '6.95:1', '8.58:1'],
    ['neutral text on subtle surface', '18.48:1', '13.58:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Status (Info · Success · Warning · Error · Neutral) × Language (EN · AR), Title, Description, Action, Close button', 'No']
  ]
};

const alertDoc = await runDoc(D_Alert, EX_Alert, mkAL);

// 2. Snackbar (Mobile)
const snackPage = findPage('↳ Snackbar');
await snackPage.loadAsync();
const snackSet = snackPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Snackbar');

async function EX_Snack(s) {
  if (s.v) {
    const i = pick(snackSet, s.v).createInstance();
    setPr(i, s.props);
    return i;
  }
  const f = figma.createFrame();
  f.resize(s.w || 420, s.h || 56);
  f.fills = [];
  return f;
}

const D_Snack = {
  name: 'Snackbar',
  setId: snackSet.id,
  os: 'Mobile',
  mode: '3869:7',
  rebuild: false,
  sub: 'Brief floating notification bar at the viewport edge that confirms a completed action',
  ver: '1.0',
  desc: 'A snackbar (also called a toast) is a brief, non-modal notification bar that floats near the bottom edge of the mobile screen to confirm an action ("Shift saved", "Employee archived") and optionally offer one quick recovery action ("Undo").',
  col: 'Language',
  rows: ['Action'],
  cellW: 520,
  axisW: 200,
  sheetFill: false,
  parts: ['container', 'icon', 'message', 'action-button', 'close-button'],
  intro: [{ v: { Action: 'With action', Language: 'EN' } }],
  propsNote: 'One set: Action (None · With action) × Language (EN · AR) = 4 variants. Message and Action label are text properties on EN variants; Show icon and Close button toggle optional leading/trailing elements.',
  props: [
    ['Action', 'VARIANT', 'None · With action', 'None', 'Whether a compact recovery action button (Undo) is shown'],
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Mobile · EN / Mobile · AR; mirrored layout'],
    ['Message', 'TEXT', '—', 'Shift changes saved', 'message (concise confirmation)'],
    ['Action label', 'TEXT', '—', 'Undo', 'actionLabel (when Action = With action)'],
    ['Show icon', 'BOOLEAN', '—', 'true', 'Toggle leading check icon'],
    ['Close button', 'BOOLEAN', '—', 'true', 'Toggle trailing inverse close button']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations inverse surface/text/icon tokens and Elevation/3.',
  tokens: [
    ['container · fill', 'all', 'color/surface/inverse'],
    ['container · radius & shadow', 'all', 'radius/md (8 dp) · Elevation/3'],
    ['container · padding & gap', 'all', 'block spacing/md (8 dp) · inline spacing/xl (16 dp) · gap spacing/lg (12 dp)'],
    ['container · width & min-height', 'Mobile', 'min size/container/xs (384 dp) · max size/container/sm (480 dp) · min-height size/control/height/lg (48 dp)'],
    ['icon · size & color', 'all', 'size/icon/md (20 dp) · color/icon/inverse'],
    ['message · text & color', 'all', 'body/md · color/text/inverse'],
    ['action-button · label', 'With action', 'label/md · color/text/inverse'],
    ['close-button · size & icon', 'all', 'size/control/height/md (40 dp) · color/icon/inverse']
  ],
  vars: [
    {
      title: 'Action',
      desc: 'Message-only snackbar for simple confirmations; With action when the user can immediately Undo or View.',
      tiles: [
        ['Action = None', { v: { Action: 'None', Language: 'EN' } }],
        ['Action = With action', { v: { Action: 'With action', Language: 'EN' } }]
      ]
    },
    {
      title: 'Optional icon and close button',
      desc: 'Hide the leading icon for minimal text-only toasts, or keep Close button visible when an action is present.',
      tiles: [
        ['Show icon = false', { v: { Action: 'None', Language: 'EN' }, props: { 'Show icon': false } }],
        ['Action without close button', { v: { Action: 'With action', Language: 'EN' }, props: { 'Close button': false } }]
      ]
    }
  ],
  statesNote: 'Auto-dismisses after 5 s (message only) or 10 s (with action). Touching or focusing inside the snackbar pauses the auto-dismiss timer. Only one snackbar is visible at a time.',
  motionNote: 'Enter: slides up 16 dp and fades 0 → 1 over motion/duration/md (200 ms) with emphasized decelerate easing. Exit: fades 1 → 0 over motion/duration/sm (100 ms) with accelerate easing.',
  motion: [
    ['Hidden → Visible', 'md', { empty: true, w: 420, h: 56 }, { v: { Action: 'With action', Language: 'EN' } }],
    ['Visible → Dismissed', 'sm', { v: { Action: 'None', Language: 'EN' } }, { empty: true, w: 420, h: 56 }]
  ],
  use: [
    'Use a snackbar for brief confirmations after an action completes ("Saved", "Copied to clipboard", "Employee archived · Undo").',
    { v: { Action: 'With action', Language: 'EN' } }
  ],
  notUse: 'Not for persistent warnings or validation errors the user must read to fix a form (use Alert), nor for destructive confirmations before acting (use Dialog).',
  dos: [
    ['Keep the message to a few words and offer Undo for reversible actions', { v: { Action: 'With action', Language: 'EN' } }],
    ['Use a simple message-only snackbar for routine confirmations', { v: { Action: 'None', Language: 'EN' } }]
  ],
  donts: [
    ['Do not write multi-sentence error instructions inside a transient snackbar', { v: { Action: 'None', Language: 'EN' }, props: { Message: 'Failed to validate payroll fields on rows 4, 9 and 12.' } }],
    ['Do not label the action button "Dismiss" — use the close icon button instead', { v: { Action: 'With action', Language: 'EN' }, props: { 'Action label': 'Dismiss' } }]
  ],
  content: [
    ['message', 'Past-tense statement of what just happened; no period', '55 chars'],
    ['action-button', 'Single verb (Undo, View, Retry)', '12 chars']
  ],
  contentEx: [
    ['Shift changes saved · Undo', 'تم حفظ تعديلات المناوبة · تراجع', 'Successfully saved your changes to the database!'],
    ['Report link copied', 'تم نسخ رابط التقرير', 'Link was copied to your clipboard. OK']
  ],
  devices: [
    ['Phone', 'Floats near bottom edge (16 dp inset) above navigation bar / safe area.', { v: { Action: 'With action', Language: 'EN' } }]
  ],
  platform: [
    ['Placement', 'Bottom-centred above safe area / navigation bar (16 dp inset)'],
    ['Width', 'Min 384 dp (size/container/xs) · Max 480 dp (size/container/sm)'],
    ['Queueing', 'One visible at a time; a new snackbar replaces the current one']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Mobile · AR, the check icon sits on the right, message text aligns right, and Undo + close button sit on the left.',
  rtl: [
    [
      ['LTR (EN)', { v: { Action: 'With action', Language: 'EN' } }],
      ['RTL (AR)', { v: { Action: 'With action', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Announces politely via Semantics(liveRegion: true) without stealing focus from the current task.',
  keys: [
    ['Esc', 'Dismisses the active snackbar immediately'],
    ['Tab', 'Reaches the Undo action and close button while pausing auto-dismiss'],
    ['Enter / Space', 'Activates Undo or dismisses the snackbar']
  ],
  sr: 'Semantics(liveRegion: true) polite announcement. Close button has localised "Dismiss notification" / "إغلاق الإشعار" label.',
  focus: 'Does not steal focus when appearing. Touch targets meet 48×48 dp hit area.',
  contrast: [
    ['message (color/text/inverse) on inverse surface', '18.42:1', '19.8:1'],
    ['icon (color/icon/inverse) on inverse surface', '18.42:1', '19.8:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Action (None · With action) × Language (EN · AR), Message, Action label, Show icon, Close button', 'No']
  ]
};

const snackDoc = await runDoc(D_Snack, EX_Snack, mkAL);

return { alertDoc, snackDoc };
