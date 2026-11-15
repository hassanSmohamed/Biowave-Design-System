<!-- GENERATED from snackbar.md @ 431c83964b32cfdd — do not edit; change the source and run: npm run contract -- web snackbar -->
# Snackbar · شريط إشعار — Web — code contract

> **Everything you need to build Snackbar on Web, and nothing else.** Read this file only. Generated from [`snackbar.md`](snackbar.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](snackbar.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Snackbar · شريط إشعار |
| Platform | Web · React + MUI |
| Built on | MUI `Snackbar` + styled inverse surface (`color-surface-inverse`, `Elevation/3`), using Biowave `Button` (`text`) and `IconButton` |
| Import | `import { Snackbar } from '@biowave/web'` |
| Version | 1.0 · 2026-11-14 |
| Source code | `src/components/snackbar/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`snackbar.md`](snackbar.md) @ `431c83964b32cfdd` |

## 1. What it is

A snackbar is a brief, non-blocking transient bar at `layer-toast` (1500) that confirms the result of an action ("Changes saved", "Device removed — Undo") at the bottom of the screen without interrupting workflow. Unlike an Alert, it floats above the UI and dismisses automatically after a few seconds (unless an interactive action requires more time).

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | High-contrast inverse floating surface (`color-surface-inverse`) with `Elevation/3` shadow |
| 2 | `icon` | No | Optional leading status/context icon (`Show icon`), tinted `color-icon-inverse` |
| 3 | `message` | Yes | Concise 1–2 line confirmation of what just happened |
| 4 | `action` | No | Optional single text action (`Undo`, `Retry`, `View`) — maximum 1 button |
| 5 | `close-button` | No | Optional `✕` dismiss button for manual dismissal |

**Options** (names and values are the props in §2):

- 4.1 `action`
- 4.2 Toggles

## 2. API

### Snackbar (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `open` | `boolean` | — | ✓ | Controls visibility |
| `message` | `string` | — | ✓ | 1–2 line status message |
| `icon` | `ReactNode` | `—` | | Optional leading icon (`color-icon-inverse`) |
| `action` | `{ label: string; onClick: () => void }` | `—` | | Optional single text action (`Undo`, `Retry`) |
| `onClose` | `() => void` | — | ✓ | Called on timeout, dismiss click or Esc |
| `autoHideDuration` | `number \| null` | `5000` (min `10000` when `action` present) | | Auto-dismiss delay in ms (`null` disables) |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `actionLabel` without callback | Ignores action button, warns |
| `autoHideDuration` < 4000 ms with an `action` | Clamps to 10 000 ms (WCAG 2.2.1) and warns |

## 3. Dimensions

| Part | Property | Token |
|---|---|---|
| `container` | width · min-height | min `size-container-xs` (384) · max `size-container-sm` (480) · `size-control-height-lg` (48) |
| `container` | radius · elevation | `radius-md` (8) · `Elevation/3` |
| `container` | padding-inline · padding-block | `spacing-xl` (16) · `spacing-md` (8) |
| `container` | gap `icon`–`message` · `content`–actions | `spacing-lg` (12) · `spacing-xl` (16) |
| leading `icon` | size | `size-icon-md` (20) |
| `message` | text style | `body-sm` |
| `action` · `close-button` | gap between them | `spacing-xs` (4) |

## 4. Tokens by part and state

Every value is a semantic token; there is no `snackbar.tokens.json` (FB-04).

| Part | Property | Token |
|---|---|---|
| `container` | surface fill | `color-surface-inverse` |
| `container` | shadow · z-index | `Elevation/3` · `layer-toast` (1500) |
| `message` | text fill | `color-text-inverse` |
| leading `icon` · `close-button` | icon fill | `color-icon-inverse` |
| `action` | button variant · colour | Text `Button` · `inverse` (`color-text-inverse`) |

Contrast (Light / Dark): `color-text-inverse` and `color-icon-inverse` on `color-surface-inverse` — **18.42:1 Light / 19.8:1 Dark**.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `color-icon-inverse` | `var(--bw-color-icon-inverse)` · `cssVars.color.icon.inverse` | #FFFFFF | #0A0A0A |
| `color-surface-inverse` | `var(--bw-color-surface-inverse)` · `cssVars.color.surface.inverse` | #141414 | #FFFFFF |
| `color-text-inverse` | `var(--bw-color-text-inverse)` · `cssVars.color.text.inverse` | #FFFFFF | #0A0A0A |
| `layer-toast` | `var(--bw-layer-toast)` · `cssVars.layer.toast` | 1500 | 1500 |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-emphasized-decelerate` | `var(--bw-motion-easing-emphasized-decelerate)` · `cssVars.motion.easing.emphasized-decelerate` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `motion-easing-standard-accelerate` | `var(--bw-motion-easing-standard-accelerate)` · `cssVars.motion.easing.standard-accelerate` | [0.3,0,1,1] | [0.3,0,1,1] |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-container-sm` | `var(--bw-size-container-sm)` · `cssVars.size.container.sm` | 480 | 480 |
| `size-container-xs` | `var(--bw-size-container-xs)` · `cssVars.size.container.xs` | 384 | 384 |
| `size-control-height-lg` | `var(--bw-size-control-height-lg)` · `cssVars.size.control.height.lg` | 48 | 48 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `spacing-lg` | `var(--bw-spacing-lg)` · `cssVars.spacing.lg` | 12 | 12 |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xl` | `var(--bw-spacing-xl)` · `cssVars.spacing.xl` | 16 | 16 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | Trigger fired | translateY (`16 → 0`), opacity `0 → 1` | `motion-duration-md` (200 ms) | `motion-easing-emphasized-decelerate` |
| Visible → Hidden | Timeout / Esc / close | opacity `1 → 0`, translateY (`0 → 8`) | `motion-duration-sm` (100 ms) | `motion-easing-standard-accelerate` |

Reduced motion: opacity fade only (`motion-duration-sm` / instant), no vertical slide.

## 6. RTL

| Part | In RTL |
|---|---|
| horizontal row | Leading `icon` at right edge; `message` right-aligned; `action` and `close-button` at left edge |
| icons | Status check/warning icons do not mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Floating live container `role="status"` (`aria-live="polite"`); pauses timer on `onMouseEnter` / `onFocus`; Esc dismisses |
| Focus | Optional action & close reachable by Tab without trapping focus inside the page |

## 8. Examples

```tsx
// EN — confirmation with Undo
<Snackbar open={open} message="Device settings updated." action={{ label: 'Undo', onClick: onUndo }} onClose={onClose} />

// AR — simple confirmation (direction comes from the provider)
<Snackbar open={open} message="تم إرسال الطلب." onClose={onClose} />
```

## 9. How to build it

### Goal

The Web `Snackbar` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Persistent inline banners (`Alert`)
- Multi-action prompts (`Dialog`)

### Approach

- **Base:** MUI `Snackbar` + styled inverse surface (`color-surface-inverse`, `Elevation/3`, `layer-toast`), using Biowave `Button` (`text`, `inverse`) and `IconButton`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/snackbar/Snackbar.tsx · Snackbar.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Light + dark · en + ar: inverse surface/text/icon contrast tokens (`color-surface-inverse`, `color-text-inverse`)
- [ ] Single-line vs wrapped 2-line message; `action` callback fires and dismisses
- [ ] Auto-dismiss pauses on hover/focus and extends when `action` is present
- [ ] RTL horizontal mirroring works automatically
- [ ] Accessibility live-region announcement and touch/contrast checks pass

Implement every item in B9, plus:
- [ ] Contrast check passes in Light and Dark (`18.42:1` / `19.8:1`)
- [ ] Action timer clamps to ≥ 10 s and pauses on hover/focus
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
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

1. Fill [C8 Execution log](snackbar.md#c8-execution-log-filled-by-the-executor) in `snackbar.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `snackbar.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
