// Build Phase 2 documentation pages (00–09, 11) for Snackbar in Web Components
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

const snackPage = await figma.getNodeByIdAsync('694:219747');
await snackPage.loadAsync();
const SET = await figma.getNodeByIdAsync('694:220191');

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
  f.resize(s.w || 420, s.h || 56);
  f.fills = [];
  return f;
}

const D = {
  name: 'Snackbar',
  setId: '694:220191',
  rebuild: true,
  sub: 'Brief floating notification bar at the viewport edge that confirms a completed action',
  ver: '1.0',
  desc: 'A snackbar (also called a toast) is a brief, non-modal notification bar that floats near the bottom edge of the viewport to confirm an action ("Shift saved", "Employee archived") and optionally offer one quick recovery action ("Undo"). It auto-dismisses after 4–6 seconds and never blocks the page.',
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
    ['Language', 'VARIANT', 'EN · AR', 'EN', 'Typography mode Web · EN / Web · AR; mirrored layout'],
    ['Message', 'TEXT', '—', 'Shift changes saved', 'message (concise confirmation)'],
    ['Action label', 'TEXT', '—', 'Undo', 'action.label (when Action = With action)'],
    ['Show icon', 'BOOLEAN', '—', 'true', 'Toggle leading check icon'],
    ['Close button', 'BOOLEAN', '—', 'true', 'Toggle trailing inverse close button']
  ],
  tokensNote: 'No component tokens: every value binds directly to Foundations inverse surface/text/icon tokens and Elevation/3.',
  tokens: [
    ['container · fill', 'all', 'color/surface/inverse'],
    ['container · radius & shadow', 'all', 'radius/md (8 px) · Elevation/3'],
    ['container · padding & gap', 'all', 'block spacing/md (8 px) · inline spacing/xl (16 px) · gap spacing/lg (12 px)'],
    ['container · min/max width', 'Web', 'min size/panel/sm (280 px) · max size/panel/xl (480 px)'],
    ['icon · size & color', 'all', 'size/icon/md (20 px) · color/icon/inverse'],
    ['message · text & color', 'all', 'body/md · color/text/inverse'],
    ['action-button · label', 'With action', 'label/md · color/text/inverse'],
    ['close-button · size & icon', 'all', 'size/control/height/sm (32 px) · color/icon/inverse']
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
  statesNote: 'Auto-dismisses after 4 s (message only) or 6 s (with action). Hovering or focusing inside the snackbar pauses the auto-dismiss timer until pointer leave / blur. Only one snackbar is visible at a time.',
  motionNote: 'Enter: slides up 8 px and fades 0 → 1 over motion/duration/sm (150 ms) with decelerate easing. Exit: fades 1 → 0 over motion/duration/xs (100 ms) with accelerate easing.',
  motion: [
    ['Hidden → Visible', 'sm', { empty: true, w: 420, h: 56 }, { v: { Action: 'With action', Language: 'EN' } }],
    ['Visible → Dismissed', 'xs', { v: { Action: 'None', Language: 'EN' } }, { empty: true, w: 420, h: 56 }]
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
    ['Desktop', 'Floats at bottom-end of viewport (24 px inset) with 280–480 px width.', { v: { Action: 'With action', Language: 'EN' } }]
  ],
  platform: [
    ['Placement', 'Bottom-end (bottom-right in LTR, bottom-left in RTL), 24 px from viewport edges'],
    ['Width', 'Min 280 px (size/panel/sm) · Max 480 px (size/panel/xl)'],
    ['Queueing', 'One visible at a time; a new snackbar replaces the current one']
  ],
  rtlNote: 'In Arabic (Language = AR), Typography mode switches to Web · AR, the check icon sits on the right, message text aligns right, and Undo + close button sit on the left.',
  rtl: [
    [
      ['LTR (EN)', { v: { Action: 'With action', Language: 'EN' } }],
      ['RTL (AR)', { v: { Action: 'With action', Language: 'AR' } }]
    ]
  ],
  a11yUse: 'Uses role="status" and aria-live="polite" with aria-atomic="true" so screen readers announce the confirmation without stealing keyboard focus from the trigger.',
  keys: [
    ['Esc', 'Dismisses the active snackbar immediately'],
    ['Tab', 'Reaches the Undo action and close button while pausing auto-dismiss'],
    ['Enter / Space', 'Activates Undo or dismisses the snackbar']
  ],
  sr: 'role="status", aria-live="polite", aria-atomic="true". Close button has aria-label="Dismiss notification" / "إغلاق الإشعار".',
  focus: 'Does not steal focus when appearing. Keyboard users can reach the action button; focus inside pauses the auto-dismiss timer.',
  contrast: [
    ['message (color/text/inverse) on inverse surface', '≥ 15.3:1', '≥ 14.8:1'],
    ['icon (color/icon/inverse) on inverse surface', '≥ 15.3:1', '≥ 14.8:1']
  ],
  changes: null,
  changelog: [
    ['1.0', '2026-11-14', 'Initial (Wave 9): Action (None · With action) × Language (EN · AR), Message, Action label, Show icon, Close button', 'No']
  ]
};

const src = figma.root.getSharedPluginData('biowave', 'w8core')
  .replace(/figma\.createAutoLayout\(/g, 'mkAL(')
  .replace('await lf(inst);', '')
  .replace(/const W6=[^\n]+/, "const W6=await figma.variables.getVariableByIdAsync('VariableID:99599514c759fa9e28a58abf278f73814f1a0d18/4987:213'), W2=await figma.variables.getVariableByIdAsync('VariableID:099f79a0492cc7bb141b6647f26b8637d2dd7021/4987:218');");
const AF = Object.getPrototypeOf(async function () {}).constructor;
return await (new AF('D', 'EX', 'mkAL', src))(D, EX, mkAL);
