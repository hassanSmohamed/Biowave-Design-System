<!-- GENERATED from side-sheet.md @ 59663c69d545389b — do not edit; change the source and run: npm run contract -- web side-sheet -->
# Side sheet · اللوحة الجانبية — Web — code contract

> **Everything you need to build Side sheet on Web, and nothing else.** Read this file only. Generated from [`side-sheet.md`](side-sheet.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](side-sheet.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Side sheet · اللوحة الجانبية |
| Platform | Web · React + MUI |
| Built on | MUI `Drawer` (`variant="temporary"` for modal, `"persistent"` for standard; portal, focus trap, `Slide` transition), styled from semantic tokens |
| Import | `import { SideSheet } from '@biowave/web'` |
| Version | 1.0 · 2026-11-13 |
| Source code | `src/components/side-sheet/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`side-sheet.md`](side-sheet.md) @ `59663c69d545389b` |

## 1. What it is

A side sheet is a panel that slides in from the end of the window (the right in English, the left in Arabic) and floats above the page with a small gap from the edge. It shows the details of something on the page or holds a task that is too long for a dialog — edit a device, set up an integration, review a request — while the page stays visible behind it. It replaces the legacy Slide Out Panel.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `scrim` | Modal only | Dims the page and closes the sheet on click or tap |
| 2 | `container` | Yes | Raised surface, inset from the window edge, all corners rounded |
| 3 | `header` | Yes | Holds the back button, title and close button; stays at the top |
| 4 | `back-button` | No | Goes back one level when the sheet has more than one view |
| 5 | `title` | Yes | What the sheet is about: "Edit device", "Request details" |
| 6 | `close-button` | Yes | Closes the sheet |
| 7 | `body` | Yes | The content; scrolls under the header and above the footer |
| 8 | `footer` | No | The main action full width, or a Button group (Cancel + Save); stays at the bottom |

**Options** (names and values are the props in §2):

- 4.1 `size`
- 4.2 `mode`
- 4.3 `back-button`
- 4.4 `footer`

## 2. API

### SideSheet
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `open` | boolean | | — | ✓ | Shows the sheet |
| `onClose` | `(reason: 'close-button' \| 'escape' \| 'scrim') => void` | | — | ✓ | Every way of closing that is not an action |
| `title` | string | (A6) | — | ✓ | `title` |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `mode` | enum | `modal` · `standard` | `modal` | | A4.2 |
| `onBack` | `() => void` | | — | | Shows the `back-button` (A4.3) |
| `footer` | `ReactNode` | one full-width `Button` or a `ButtonGroup` | — | | A4.4 |
| `children` | `ReactNode` | | — | ✓ | `body` |
| `initialFocusRef` | `RefObject<HTMLElement>` | | — | | First focus override |

**Invalid combinations** (`console.warn` in development, then the fallback renders):
| Combination | Fallback |
|---|---|
| `mode="standard"` below the Desktop breakpoint | renders `modal` (no warning — A8) |
| `footer` with more than one primary Button | warn; renders as given |

## 3. Dimensions

```
                                         ┌──── width sm size-container-xs · md size-container-sm · lg size-container-lg ────┐
   page (dimmed)                    ┬    ┌────────────────────────────────────────────┐ ┬ spacing-md
                                    │    │ [←]  Edit device                     [✕]   │   header padding spacing-2xl · title-lg
                                    │    │ ────────────────────────────────────────── │   divider while scrolled
                                    │    │  body · padding spacing-layout-container   │   radius-4xl all corners · elevation-4
                                    │    │  sections gap spacing-layout-stack         │
                                    │    │  [               Save changes           ]  │   footer padding spacing-layout-container
                                    ┴    └────────────────────────────────────────────┘ ┴ spacing-md
                                                                                       ├──┤ spacing-md
```

| Part | Property | Token |
|---|---|---|
| `scrim` | fill | `color-overlay-default` (modal only) |
| `container` | width | `sm` `size-container-xs` · `md` `size-container-sm` · `lg` `size-container-lg`; never wider than the window minus the inset on both sides |
| `container` | inset from the window (modal) | `spacing-md` on the top, bottom and inline end |
| `container` | background · radius · elevation (modal) | `color-surface-raised` · `radius-4xl` all corners (floating, O-04) · `elevation-4` |
| `container` | standard mode (Web) | no inset, full height, `radius-none`, no shadow; border-inline-start `border-width-default` `color-border-subtle`; the page width shrinks by the sheet width |
| `container` | stacking | `layer-modal` (modal) · `layer-raised` (standard) |
| `header` | padding · gap | `spacing-2xl` (side sheet header, spacing.md) · gap `spacing-md` |
| `title` | text style | `title-lg` · `color-text-default`; wraps to 2 lines |
| `back-button · close-button` | component | Icon button `transparent` · `neutral` · `md`; icons `arrow_back` (mirrors) · `close` |
| `body` | padding · overflow | padding-inline `spacing-layout-container`, padding-block-end `spacing-layout-container` · scrolls |
| `body` | gap between sections | `spacing-layout-stack` |
| `footer` | padding · actions | `spacing-layout-container` · one Button `filled brand lg` full width, or Button group end-aligned |
| `divider` |  | Divider default under the header and above the footer, only while the body scrolls |

Layout rules: height = window height minus the inset; header and footer hug; body fills and scrolls.

## 4. Tokens by part and state

Every value is a semantic token; there is no `side-sheet.tokens.json`.

| Part | Property | Default | Notes |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | modal |
| `container` | background | `color-surface-raised` | |
| `container` | shadow | `elevation-4` | modal; none in standard |
| `container` | border-inline-start | `color-border-subtle` | standard only (Web) |
| `title` | color | `color-text-default` | |
| `back-button` · `close-button` | — | Icon button B3 (`transparent`, `neutral`) | |
| `footer` | actions | Button B3 | |
| divider | stroke | Divider B3 (`default`) | while scrolled |

Dark theme: same tokens; no exceptions.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `color-border-subtle` | `var(--bw-color-border-subtle)` · `cssVars.color.border.subtle` | #EDEDED | #292929 |
| `color-overlay-default` | `var(--bw-color-overlay-default)` · `cssVars.color.overlay.default` | #54545499 | #545454B3 |
| `color-surface-raised` | `var(--bw-color-surface-raised)` · `cssVars.color.surface.raised` | #FFFFFF | #292929 |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `elevation-4` | `var(--bw-elevation-4)` · `cssVars.elevation.4` | 0px 16px 48px -4px rgb(7 19 35 / 18%) | 0px 16px 48px -4px rgb(0 0 0 / 45%) |
| `layer-modal` | `var(--bw-layer-modal)` · `cssVars.layer.modal` | 1400 | 1400 |
| `layer-raised` | `var(--bw-layer-raised)` · `cssVars.layer.raised` | 1 | 1 |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-lg` | `var(--bw-motion-duration-lg)` · `cssVars.motion.duration.lg` | 300 | 300 |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-easing-emphasized-accelerate` | `var(--bw-motion-easing-emphasized-accelerate)` · `cssVars.motion.easing.emphasized-accelerate` | [0.3,0,0.8,0.15] | [0.3,0,0.8,0.15] |
| `motion-easing-emphasized-decelerate` | `var(--bw-motion-easing-emphasized-decelerate)` · `cssVars.motion.easing.emphasized-decelerate` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-4xl` | `var(--bw-radius-4xl)` · `cssVars.radius.4xl` | 24 | 24 |
| `radius-none` | `var(--bw-radius-none)` · `cssVars.radius.none` | 0 | 0 |
| `size-container-lg` | `var(--bw-size-container-lg)` · `cssVars.size.container.lg` | 640 | 640 |
| `size-container-sm` | `var(--bw-size-container-sm)` · `cssVars.size.container.sm` | 480 | 480 |
| `size-container-xs` | `var(--bw-size-container-xs)` · `cssVars.size.container.xs` | 384 | 384 |
| `spacing-2xl` | `var(--bw-spacing-2xl)` · `cssVars.spacing.2xl` | 20 | 20 |
| `spacing-layout-container` | `var(--bw-spacing-layout-container)` · `cssVars.spacing.layout.container` |  |  |
| `spacing-layout-stack` | `var(--bw-spacing-layout-stack)` · `cssVars.spacing.layout.stack` |  |  |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwSideSheet` | sheet slides in from the inline end · scrim opacity 0 → 1 (modal) · page width (standard) | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | close, Esc, scrim, action | slides out · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| View → second view | `onBack` set / content change | body cross-fade | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: slide and fade become `motion-duration-instant`.

## 6. RTL

```
LTR  page ……………………  │ [←] Edit device              [✕] │   ← slides in from the right
RTL  │ [✕]              تعديل الجهاز [→] │  …………………… page   ← slides in from the left
```

| Part | In RTL |
|---|---|
| position | Opens from the inline end: right in LTR, left in RTL; slides from that edge |
| header | Back button at the start, close at the end (mirrored order) |
| `back-button` icon | Mirrors (`arrow_back` points right in RTL) |
| `close-button` icon | Does not mirror |
| standard border | On the inline start of the sheet |

## 7. Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | Modal: `role="dialog"` `aria-modal="true"` `aria-labelledby` → title. Standard: `<aside aria-labelledby>` (complementary landmark), no focus trap |
| Focus | Modal: `initialFocusRef`, else the first focusable field, else the close button; trapped; returns to the opener on close. Standard: focus moves to the title on open, not trapped |
| Page behind | Modal: `inert` / `aria-hidden` through MUI, scroll locked |
| Buttons | Close "Close" / "إغلاق"; back "Back" / "رجوع" (Icon button tooltips) |
| Screen reader output | "Edit device, dialog" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Modal: inside the sheet only. Standard: normal page order |
| Esc | Closes (modal and standard) |
| Enter / Space | Activate the focused control |

## 8. Examples

```tsx
import { SideSheet, Button } from '@biowave/web';

<SideSheet open={open} onClose={close} title="Edit device"
  footer={<Button fullWidth size="lg" onClick={save}>Save changes</Button>}>
  <DeviceForm />
</SideSheet>

// Arabic, standard mode next to a table
<SideSheet open={open} onClose={close} title="تفاصيل الطلب" mode="standard" size="lg">
  <RequestDetails />
</SideSheet>
```

## 9. How to build it

### Goal

`SideSheet` from `@biowave/web` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Navigation drawer (Primary navigation, Wave 12)
- Resizable or pinned sheets
- The "Discard changes?" dialog itself (the consumer opens a Dialog in `onClose` / `onDismissAttempt`)

### Approach

- **Base:** MUI `Drawer` `anchor="right"` (MUI flips it to the left under the RTL theme), `variant` from `mode` (`temporary` · `persistent`); `SlideProps` timing from the motion tokens; `PaperProps` with the B2 inset (`margin`), radius, background and shadow; `slotProps.backdrop` fill `color-overlay-default`.
- **Standard mode:** the consumer layout gets a `SideSheetLayout` wrapper that reserves the sheet width (`padding-inline-end`) with the same transition; `useMediaQuery` on the Desktop breakpoint switches to modal.
- **Structure:** header (`IconButton` back · title · `IconButton` close), scroll body with scroll-driven dividers, footer.
- **Gotcha:** MUI `Drawer` paper uses `elevation={16}` — set `elevation={0}` and apply `elevation-4`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/side-sheet/SideSheet.tsx        new (SideSheet, SideSheetLayout)
3-web-components/src/components/side-sheet/SideSheet.test.tsx   new
3-web-components/src/components/side-sheet/index.ts             new
3-web-components/src/index.ts                                   change: export (alphabetical)
3-web-components/README.md                                      change: Side sheet row (Code)
CHANGELOG.md                                                    change: one entry
```

## 10. Tests

- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens for each `size` and `mode`
- [ ] Every transition in B4; reduced motion → `motion-duration-instant`
- [ ] Opens from the right in LTR and the left in RTL; back icon mirrors, close does not
- [ ] Modal: focus in, trapped, returned; Esc and scrim call `onClose` with the right reason
- [ ] Standard: page content narrows by the sheet width; no focus trap; `aside` landmark; falls back to modal below Desktop
- [ ] Body scrolls with header and footer fixed; dividers only while scrolled
- [ ] Every invalid combination in B1 warns and falls back
- [ ] a11y: axe on `baseElement` with the sheet open, light/dark × en/ar, both modes
- [ ] No raw values (lint over the component folder)

Implement every item in B9, plus:
- [ ] `SideSheetLayout` reserves exactly the sheet width in standard mode and releases it on close
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

1. Fill [C8 Execution log](side-sheet.md#c8-execution-log-filled-by-the-executor) in `side-sheet.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `side-sheet.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
