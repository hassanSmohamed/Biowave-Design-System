// Wave 9 Phase 2 (Part 1) — Build Alert & Snackbar Documentation (00–09, 11) in Biowave DS — Tablet Components
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

// 1. Alert (Tablet)
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
  os: 'Tablet',
  mode: '3869:8',
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
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Tablet · EN / Tablet · AR; mirrored layout'],
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
      title: 'Single-line vs titled & optional controls',
      desc: 'Hide the title for concise one-line announcements, or hide the action / close button when not needed.',
      tiles: [
        ['Single-line (Show title = false)', { v: { Status: 'Info', Language: 'EN' }, props: { 'Show title': false, Action: false } }],
        ['Titled with action', { v: { Status: 'Warning', Language: 'EN' }, props: { 'Show title': true, Action: true } }],
        ['Blocking error (Close button = false)', { v: { Status: 'Error', Language: 'EN' }, props: { 'Close button': false } }]
      ]
    }
  ],
  statesNote: 'The alert banner itself is static; interactive pressed and focus states live on the nested Button (action) and Icon Button (close-button) with 48×48 dp touch targets.',
  motionNote: 'Enter: opacity 0 → 1 over motion/duration/md (200 ms) with decelerate easing. Exit on dismiss: opacity 1 → 0 over motion/duration/sm (100 ms) with accelerate easing.',
  motion: [
    ['Hidden → Visible', 'md', { empty: true, w: 640, h: 88 }, { v: { Status: 'Warning', Language: 'EN' } }],
    ['Visible → Dismissed', 'sm', { v: { Status: 'Info', Language: 'EN' }, props: { 'Show title': false, Action: false } }, { empty: true, w: 640, h: 68 }]
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
    ['Tablet landscape', 'Full-width inline banner inside tablet page, form or dialog container.', { v: { Status: 'Warning', Language: 'EN' } }]
  ],
  platform: [
    ['Placement', 'Inline inside page section, form header, Dialog or Side sheet body'],
    ['Touch targets', 'Action Button and Close Icon Button enforce 48×48 dp touch targets'],
    ['Typography', 'body/lg description for comfortable tablet reading distance']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Tablet · AR, the leading status icon sits on the right, text aligns right, and action + close button sit on the left.',
  rtl: [
    [
      ['LTR (EN)', { v: { Status: 'Warning', Language: 'EN' } }],
      ['RTL (AR)', { v: { Status: 'Warning', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Error and warning alerts announce immediately via live region semantics; info, success and neutral alerts announce politely.',
  keys: [
    ['Tab', 'Moves focus to the action button and then the close button'],
    ['Enter / Space', 'Activates the focused action or dismisses the alert via the close button']
  ],
  sr: 'Semantics(liveRegion: true) announcement; close button has localised "Dismiss alert" / "إغلاق التنبيه" semantic label. Status icon is decorative.',
  focus: 'Action Button and Close Icon Button enforce 48×48 dp minimum touch targets and 2 dp focus rings.',
  contrast: [
    ['title (color/text/role/*) on subtlest fill', '≥ 5.73:1', '≥ 8.58:1'],
    ['description (color/text/default) on subtlest fill', '≥ 12.47:1', '≥ 11.8:1'],
    ['icon (color/icon/role/*) on subtlest fill', '≥ 3.8:1', '≥ 4.5:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Status (5) × Language (2), Title, Description, Show title, Action, Close button', 'No']
  ]
};

const alertDoc = await runDoc(D_Alert, EX_Alert, mkAL);

// 2. Snackbar (Tablet)
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
  os: 'Tablet',
  mode: '3869:8',
  rebuild: true,
  sub: 'Brief floating notification bar at the viewport edge that confirms a completed action',
  ver: '1.0',
  desc: 'A snackbar (also called a toast) is a brief, non-modal notification bar that floats near the bottom edge of the tablet screen to confirm an action ("Shift saved", "Employee archived") and optionally offer one quick recovery action ("Undo").',
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
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Tablet · EN / Tablet · AR; mirrored layout'],
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
    ['container · width & min-height', 'Tablet', 'min size/container/xs (384 dp) · max size/container/sm (480 dp) · min-height size/control/height/lg (48 dp)'],
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
    ['Tablet landscape', 'Floats near bottom edge (24 dp inset) avoiding navigation rail and floating action buttons.', { v: { Action: 'With action', Language: 'EN' } }]
  ],
  platform: [
    ['Placement', 'Bottom-centred or bottom-end above safe area (24 dp inset)'],
    ['Width', 'Min 384 dp (size/container/xs) · Max 480 dp (size/container/sm)'],
    ['Queueing', 'One visible at a time; a new snackbar replaces the current one']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Tablet · AR, the check icon sits on the right, message text aligns right, and Undo + close button sit on the left.',
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
