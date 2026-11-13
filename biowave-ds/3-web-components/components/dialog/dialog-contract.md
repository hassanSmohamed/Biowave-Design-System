<!-- GENERATED from dialog.md @ 75f260d6590872e1 — do not edit; change the source and run: npm run contract -- web dialog -->
# Dialog · نافذة حوار — Web — code contract

> **Everything you need to build Dialog on Web, and nothing else.** Read this file only. Generated from [`dialog.md`](dialog.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](dialog.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Dialog · نافذة حوار |
| Platform | Web · React + MUI |
| Built on | MUI `Dialog` (portal, focus trap, scroll lock, `Fade` transition), styled only from semantic tokens; Biowave `Button` and `IconButton` for actions and close |
| Import | `import { Dialog } from '@biowave/web'` |
| Version | 1.0 · 2026-11-13 |
| Source code | `src/components/dialog/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`dialog.md`](dialog.md) @ `75f260d6590872e1` |

## 1. What it is

A dialog is a window that opens on top of the page and blocks it until the user answers. It asks one clear question ("Delete this shift?") or holds one short task (rename a report, pick a date), and it always ends with the user choosing an action or closing it. Because it interrupts, use it only when the user must decide or act before going on.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `scrim` | Yes | Dims the page behind the dialog and blocks it |
| 2 | `container` | Yes | Raised surface with rounded corners that holds the parts below |
| 3 | `title` | Yes | The question or the task, in a few words |
| 4 | `close-button` | No | Icon button that closes the dialog without an action. Shown when closing is safe |
| 5 | `alert` | No | One Alert under the title for a warning the user must read before acting |
| 6 | `body` | Yes | The content: text, a short list or a few form fields. Scrolls when it is taller than the window |
| 7 | `footer` | Yes | One to three actions, the main action at the end. A divider shows above it while the body scrolls |

**Options** (names and values are the props in §2):

- 4.1 `size`
- 4.2 `kind`
- 4.3 `close-button`
- 4.4 `alert`
- 4.5 `dismissible`

## 2. API

### Dialog
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `open` | boolean | | — | ✓ | Shows the dialog |
| `onClose` | `(reason: 'close-button' \| 'escape' \| 'scrim') => void` | | — | ✓ | Called for every way of closing that is not an action |
| `title` | string | plain text (A6) | — | ✓ | `title` |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `kind` | enum | `basic` · `destructive` | `basic` | | A4.2 — sets the main action colour and the first focus |
| `closeButton` | boolean | | `true` | | A4.3 |
| `dismissible` | boolean | | `true` | | A4.5 — Esc and scrim click call `onClose`; when `false` they do nothing |
| `alert` | `ReactNode` | one Biowave `Alert` | — | | A4.4 |
| `primaryAction` | `{ label: string; onClick: () => void; loading?: boolean; disabled?: boolean }` | | — | ✓ | Main action at the end of the footer |
| `secondaryAction` | `{ label: string; onClick: () => void }` | | — | | Usually "Cancel" |
| `tertiaryAction` | `{ label: string; onClick: () => void }` | | — | | Rare third action, at the start of the footer |
| `children` | `ReactNode` | text, list, form fields | — | ✓ | `body` |
| `initialFocusRef` | `RefObject<HTMLElement>` | | — | | Overrides the first focus (B6) |

Platform naming: web `children` = Flutter `content`; `onClick` = `onPressed`; `primaryAction` = `BwDialogAction`.

**Invalid combinations** (`console.warn` in development, then the fallback renders):
| Combination | Fallback |
|---|---|
| `closeButton={false}` and no `secondaryAction` | warn "Dialog needs a way out"; `closeButton` is shown |
| `tertiaryAction` without `secondaryAction` | warn; the tertiary action is rendered as the secondary |
| `alert` holding more than one element | warn; only the first is rendered |
| `primaryAction.loading` with `dismissible` | Esc and scrim click are ignored while loading (not a warning) |

## 3. Dimensions

```
             spacing-layout-container                  spacing-layout-container
            ├────┤                                              ├────┤
        ┬   ┌──────────────────────────────────────────────────────────┐   radius-3xl · elevation-4
        │   │    Disconnect LMS?                              [✕]      │   title heading-sm · gap spacing-xl
        │   │    ▒▒ alert ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒      │   ↕ spacing-xl
        │   │    Body text, list or form fields                        │   body-md
        │   │ ──────────────────────────────────────────────────────── │   divider only while the body scrolls
        │   │                              [ Cancel ][ Disconnect ]    │   Button md · gap spacing-md
        ┴   └──────────────────────────────────────────────────────────┘
            width sm size-container-xs · md size-container-md · lg size-container-xl
```

| Part | Property | Value |
|---|---|---|
| `scrim` | fill · stacking | `color-overlay-default` · `layer-modal` (below the container) |
| `container` | width | `sm` `size-container-xs` · `md` `size-container-md` · `lg` `size-container-xl`; never wider than the window minus `spacing-layout-container` on each side |
| `container` | max height | window height minus `spacing-layout-container` top and bottom |
| `container` | radius · elevation · stacking | `radius-3xl` · `elevation-4` · `layer-modal` |
| `container` | padding | `spacing-layout-container` on all sides (header, alert, body and footer share it) |
| `container` | gap between header, alert, body and footer | `spacing-xl` |
| `title` | text style | `heading-sm` (Web dialog title, typography.md) |
| `title` | wrapping | wraps, max 2 lines, never truncated |
| `close-button` | component | Icon button `variant=transparent` · `color=neutral` · `size=md`, icon `close`; aligned to the first line of the title; gap to the title `spacing-xl` |
| `alert` | component | one Alert, full width |
| `body` | text style | `body-md` for plain text |
| `body` | overflow | scrolls vertically; header, alert and footer stay fixed |
| `footer` | actions | Button `size=md`; secondary `variant=outlined color=neutral`, tertiary `variant=text color=neutral`, primary `variant=filled` `color=brand` (`basic`) or `color=error` (`destructive`); gap `spacing-md`; end-aligned; tertiary at the start |
| `footer` | stacking | when the actions do not fit in one row: stacked, full width, primary first, gap `spacing-md` |
| `footer` | divider | Divider (default emphasis) at the top of the footer and under the header, shown only while the body scrolls |

Layout rules: centred in the window both ways. Height hugs the content up to the max height.

## 4. Tokens by part and state

Every value is a semantic token; there is no `dialog.tokens.json` (no component tokens — the nested Button, Icon button and Divider carry their own).

| Part | Property | Default | Notes |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | |
| `container` | background | `color-surface-raised` | |
| `container` | shadow | `elevation-4` | |
| `title` | color | `color-text-default` | |
| `body` | text colour (plain text) | `color-text-default` | slot content keeps its own tokens |
| `close-button` | — | Icon button B3 (`transparent`, `neutral`) | |
| `footer` | actions | Button B3 (`outlined neutral`, `text neutral`, `filled brand` / `filled error`) | |
| `footer` · header | divider | Divider B3 (`default`) | only while the body scrolls |

Dark theme: same tokens; the surface and overlay switch values. No hover, pressed or disabled state on the dialog itself — its actions keep their own states.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `color-overlay-default` | `var(--bw-color-overlay-default)` · `cssVars.color.overlay.default` | #54545499 | #545454B3 |
| `color-surface-raised` | `var(--bw-color-surface-raised)` · `cssVars.color.surface.raised` | #FFFFFF | #292929 |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `elevation-4` | `var(--bw-elevation-4)` · `cssVars.elevation.4` | 0px 16px 48px -4px rgb(7 19 35 / 18%) | 0px 16px 48px -4px rgb(0 0 0 / 45%) |
| `layer-modal` | `var(--bw-layer-modal)` · `cssVars.layer.modal` | 1400 | 1400 |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-lg` | `var(--bw-motion-duration-lg)` · `cssVars.motion.duration.lg` | 300 | 300 |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-easing-emphasized-accelerate` | `var(--bw-motion-easing-emphasized-accelerate)` · `cssVars.motion.easing.emphasized-accelerate` | [0.3,0,0.8,0.15] | [0.3,0,0.8,0.15] |
| `motion-easing-emphasized-decelerate` | `var(--bw-motion-easing-emphasized-decelerate)` · `cssVars.motion.easing.emphasized-decelerate` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `radius-3xl` | `var(--bw-radius-3xl)` · `cssVars.radius.3xl` | 20 | 20 |
| `size-container-md` | `var(--bw-size-container-md)` · `cssVars.size.container.md` | 560 | 560 |
| `size-container-xl` | `var(--bw-size-container-xl)` · `cssVars.size.container.xl` | 768 | 768 |
| `size-container-xs` | `var(--bw-size-container-xs)` · `cssVars.size.container.xs` | 384 | 384 |
| `spacing-layout-container` | `var(--bw-spacing-layout-container)` · `cssVars.spacing.layout.container` |  |  |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xl` | `var(--bw-spacing-xl)` · `cssVars.spacing.xl` | 16 | 16 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwDialog` | scrim and container opacity 0 → 1 | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | action, close button, Esc, back, scrim | opacity 1 → 0 | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| Body at top → scrolled | body scroll | dividers appear (no animation) | `motion-duration-instant` | — |
| Main action → working | `primaryAction.loading` | Button loading (Button B4) | Button B4 | Button B4 |

Reduced motion: opacity changes become `motion-duration-instant`.

## 6. RTL

```
LTR  │ Disconnect LMS?                       [✕] │      │ [ Cancel ][ Disconnect ] │
RTL  │ [✕]                      فصل نظام إدارة التعلم؟ │      │ [ فصل ][ إلغاء ]          │
```

| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left), actions end-aligned (left) with the main action last |
| `close-button` icon (`close`) | Does not mirror |
| body | Follows the reading direction; numbers and Latin names stay LTR inside Arabic text |

## 7. Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | MUI `Dialog`: `role="dialog"`, `aria-modal="true"`; `role="alertdialog"` for `kind="destructive"` |
| Accessible name · description | `aria-labelledby` → `title`; `aria-describedby` → the body when it is plain text |
| Focus on open | `initialFocusRef` if given; else the first focusable field in the body; else the secondary action for `destructive`, the primary action for `basic` |
| Focus trap · return | MUI focus trap; on close focus returns to the element that had focus before opening |
| Page behind | `aria-hidden` and `inert` through MUI; body scroll locked |
| Close button | `IconButton label="Close"` / `"إغلاق"` (tooltip on) |
| Target size | Buttons ≥ 24px (Button B6) |
| Screen reader output | "Disconnect LMS?, dialog, Learners lose access to courses…" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves through the dialog only (wraps) |
| Esc | Closes when `dismissible`; nothing while the main action is loading |
| Enter / Space | Activate the focused action; Enter inside a form field submits when the body is a `<form>` |

## 8. Examples

```tsx
import { Dialog, Alert } from '@biowave/web';

<Dialog
  open={open} onClose={() => setOpen(false)}
  title="Disconnect LMS?" kind="destructive"
  alert={<Alert severity="warning">Learners lose access to courses until you connect again.</Alert>}
  secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
  primaryAction={{ label: 'Disconnect', onClick: disconnect, loading: busy }}>
  Type DISCONNECT to confirm.
</Dialog>

// Arabic: same props, Arabic text; direction comes from the provider
<Dialog open={open} onClose={close} title="حذف هذه الوردية؟" size="sm" kind="destructive"
  secondaryAction={{ label: 'إلغاء', onClick: close }} primaryAction={{ label: 'حذف', onClick: remove }}>
  سيتم إبلاغ الموظفين بإلغائها.
</Dialog>
```

## 9. How to build it

### Goal

`Dialog` from `@biowave/web` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Alert (Wave 9); until it exists the `alert` slot takes any widget / node
- Full-screen dialogs, stacked dialogs, draggable dialogs
- Button, Icon button and Divider code (used as they are)

### Approach

- **Base:** MUI `Dialog` with `TransitionComponent={Fade}`; `transitionDuration={{ enter: motion-duration-lg, exit: motion-duration-md }}` and the easings from `cssVars.motion`; `slotProps.backdrop` fill `color-overlay-default`; `PaperProps` background `color-surface-raised`, radius `radius-3xl`, shadow `elevation-4`, width from `size`, `maxWidth={false}`.
- **Structure:** `DialogTitle` (title + `IconButton`), the `alert` slot, `DialogContent` (body, `dividers` toggled by scroll position), `DialogActions` (Biowave `Button`s). No MUI colors.
- **First focus:** `disableAutoFocus` on MUI and a `useEffect` on enter that focuses `initialFocusRef`, the first focusable field, or the action B6 names.
- **Dismiss:** `onClose` from MUI maps `backdropClick` → `'scrim'`, `escapeKeyDown` → `'escape'`; ignored when `dismissible` is false or `primaryAction.loading` is true.
- **Footer stacking:** container query on the footer width; stacked layout uses `flex-direction: column-reverse` so the primary is first visually and last in tab order is not changed — keep DOM order secondary → primary.
- **Gotchas:** MUI `Dialog` adds `elevation` shadows from the MUI theme — override with `elevation-4`; set `PaperProps.elevation={0}` and apply the Biowave shadow.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/dialog/Dialog.tsx         new
3-web-components/src/components/dialog/Dialog.test.tsx    new
3-web-components/src/components/dialog/index.ts           new
3-web-components/src/index.ts                             change: export (alphabetical)
3-web-components/README.md                                change: Dialog row (Code)
CHANGELOG.md                                              change: one entry
```

## 10. Tests

- [ ] Light + dark · en + ar: container, scrim, title, body and actions use exactly the B2–B3 tokens for every `size`
- [ ] Every transition in B4 with the token durations and easings; reduced motion → `motion-duration-instant`
- [ ] `kind="destructive"`: main action in the error colour; first focus on the secondary action; `role="alertdialog"`
- [ ] `dismissible` on / off: scrim, Esc close or do nothing; nothing closes while `primaryAction.loading`
- [ ] Focus moves into the dialog on open, stays inside (Tab wraps) and returns to the opener on close
- [ ] Long body scrolls with header and footer fixed; dividers only while scrolled
- [ ] Footer stacks full width, primary first, when the actions do not fit (`sm` in Arabic)
- [ ] Every invalid combination in B1 warns / asserts and falls back
- [ ] a11y: axe on `baseElement` with the dialog open (portal included), light/dark × en/ar
- [ ] No raw values (lint over the component folder)

Implement every item in B9, plus:
- [ ] Opening a second Dialog while one is open warns and does not open
- [ ] `onClose` receives the right reason for each way of closing
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:web`, `npm run typecheck`, `npm run docs:check` pass
- [ ] AC-6 Exported from the package entry file; README status updated; nothing outside C5 changed

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (24px), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
npm run typecheck
npm run test:web
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](dialog.md#c8-execution-log-filled-by-the-executor) in `dialog.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `dialog.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
