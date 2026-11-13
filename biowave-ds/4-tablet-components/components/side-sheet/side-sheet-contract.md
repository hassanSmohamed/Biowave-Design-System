<!-- GENERATED from side-sheet.md @ f2f4f4335b1115a1 — do not edit; change the source and run: npm run contract -- tablet side-sheet -->
# Side sheet · اللوحة الجانبية — Tablet — code contract

> **Everything you need to build Side sheet on Tablet, and nothing else.** Read this file only. Generated from [`side-sheet.md`](side-sheet.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](side-sheet.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Side sheet · اللوحة الجانبية |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Custom: `showGeneralDialog` with a `SlideTransition` from the inline end (Flutter M3 has no side sheet widget); `BwIconButton`, `BwButton` |
| Import | `BwSideSheet`, `showBwSideSheet` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/side-sheet/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`side-sheet.md`](side-sheet.md) @ `f2f4f4335b1115a1` |

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

### showBwSideSheet / BwSideSheet
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `String` | (A6) | — | ✓ | `title` |
| `size` | `BwSideSheetSize` | `sm` · `md` · `lg` | `md` | | A4.1 |
| `onBack` | `VoidCallback?` | | — | | Shows the `back-button` |
| `footer` | `Widget?` | one `BwButton(fullWidth: true)` or a `BwButtonGroup` | — | | A4.4 |
| `content` | `Widget` | | — | ✓ | `body` |
| `dismissible` | `bool` | | `true` | | Scrim tap, Esc, swipe to the edge |
| `onDismissAttempt` | `Future<bool> Function()?` | | — | | Called when `dismissible` is false (unsaved changes) |

Platform naming: web `children` = Flutter `content`; Tablet has no `mode` (modal only, A8).

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `size: lg` in portrait | assert-free: uses `md` (A8) |

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

| Part | Property | Token | Flutter |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` (modal only) | `barrierColor: overlayDefault` |
| `container` | width | `sm` `size-container-xs` · `md` `size-container-sm` · `lg` `size-container-lg`; never wider than the window minus the inset on both sides | `BoxConstraints(maxWidth: BwSize.containerXs / containerSm / containerLg)` |
| `container` | inset from the window (modal) | `spacing-md` on the top, bottom and inline end | `EdgeInsetsDirectional.all(BwSpacing.md)` + `SafeArea` |
| `container` | background · radius · elevation (modal) | `color-surface-raised` · `radius-4xl` all corners (floating, O-04) · `elevation-4` | `DecoratedBox` + `BorderRadiusDirectional.all(Radius.circular(BwRadius.xl4))` + `context.bw.elevation.e4` |
| `container` | standard mode (Web) | no inset, full height, `radius-none`, no shadow; border-inline-start `border-width-default` `color-border-subtle`; the page width shrinks by the sheet width | — |
| `container` | stacking | `layer-modal` (modal) · `layer-raised` (standard) | route above the page |
| `header` | padding · gap | `spacing-2xl` (side sheet header, spacing.md) · gap `spacing-md` | `EdgeInsetsDirectional.all(BwSpacing.xl2)` |
| `title` | text style | `title-lg` · `color-text-default`; wraps to 2 lines | `context.bw.text.titleLg` |
| `back-button · close-button` | component | Icon button `transparent` · `neutral` · `md`; icons `arrow_back` (mirrors) · `close` | `BwIconButton` |
| `body` | padding · overflow | padding-inline `spacing-layout-container`, padding-block-end `spacing-layout-container` · scrolls | `SingleChildScrollView` |
| `body` | gap between sections | `spacing-layout-stack` | `context.bw.layout.stack` |
| `footer` | padding · actions | `spacing-layout-container` · one Button `filled brand lg` full width, or Button group end-aligned | `BwButton(fullWidth: true)` / `BwButtonGroup` |
| `divider` |  | Divider default under the header and above the footer, only while the body scrolls | `BwDivider` |

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

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-overlay-default` | `context.bw.colors.overlayDefault` | #54545499 | #545454B3 |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `elevation-4` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 16px 48px -4px rgb(7 19 35 / 18%) | 0px 16px 48px -4px rgb(0 0 0 / 45%) |
| `layer-modal` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1400 | 1400 |
| `layer-raised` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 300 | 300 |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-easing-emphasized-accelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.3,0,0.8,0.15] | [0.3,0,0.8,0.15] |
| `motion-easing-emphasized-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-4xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `radius-none` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `size-container-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 640 | 640 |
| `size-container-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 480 | 480 |
| `size-container-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 384 | 384 |
| `spacing-2xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `spacing-layout-container` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |
| `spacing-layout-stack` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwSideSheet` | sheet slides in from the inline end · scrim opacity 0 → 1 (modal) · page width (standard) | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | close, Esc, scrim, action, swipe to the edge | slides out · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
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
| Role / semantics | Modal route `Semantics(scopesRoute: true, namesRoute: true, label: title)` |
| Focus | First field, else the close button, with a hardware keyboard; returns to the opener |
| Swipe alternative | Close button and Esc (WCAG 2.5.7) |
| Target size | ≥ 48dp |
| Screen reader output | "Edit device, sheet" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Inside the sheet only |
| Esc | Closes when `dismissible` (else `onDismissAttempt`) |

## 8. Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

showBwSideSheet(context: context, sheet: BwSideSheet(
  title: 'Edit device',
  content: const DeviceForm(),
  footer: BwButton(fullWidth: true, size: BwButtonSize.lg, onPressed: save, child: const Text('Save changes')),
));

// Arabic — opens from the left
showBwSideSheet(context: context, sheet: BwSideSheet(title: 'تفاصيل الطلب', size: BwSideSheetSize.lg, content: const RequestDetails()));
```

## 9. How to build it

### Goal

`BwSideSheet` / `showBwSideSheet` from `package:biowave_tablet` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Navigation drawer (Primary navigation, Wave 12)
- Resizable or pinned sheets
- The "Discard changes?" dialog itself (the consumer opens a Dialog in `onClose` / `onDismissAttempt`)

### Approach

- **Base:** `showGeneralDialog(barrierColor: overlayDefault, barrierDismissible: dismissible, transitionDuration: BwDuration.lg, transitionBuilder:)` with a `SlideTransition` from `Offset(±1, 0)` by `Directionality` and `CurvedAnimation(curve: BwEasing.emphasizedDecelerate, reverseCurve: BwEasing.emphasizedAccelerate)`; reverse duration `BwDuration.md` through a custom `PageRoute` if `showGeneralDialog` cannot set it (record in C8).
- **Layout:** `Align(alignment: AlignmentDirectional.centerEnd)` → `SafeArea` → `Padding(BwSpacing.md)` → `ConstrainedBox(maxWidth:)` → `Material(color: surfaceRaised, shape:, elevation shadow)`.
- **Swipe:** horizontal drag towards the edge closes (`GestureDetector` on the container).
- **Dismiss guard:** `PopScope` + `onDismissAttempt` as Bottom sheet.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/side_sheet/bw_side_sheet.dart   new
4-tablet-components/test/side_sheet_test.dart                         new
4-tablet-components/test/goldens/side_sheet/                          new goldens
4-tablet-components/lib/biowave_tablet.dart                           change: export (alphabetical)
4-tablet-components/README.md                                         change: Side sheet row (Code)
CHANGELOG.md                                                          change: one entry
```

## 10. Tests

- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens for each `size`
- [ ] Every transition in B4; reduced motion → `BwDuration.instant`
- [ ] Opens from the right in LTR and the left in RTL; back icon mirrors, close does not
- [ ] Scrim tap, Esc and swipe to the edge close when `dismissible`; otherwise call `onDismissAttempt`
- [ ] `lg` in portrait renders `md`; never wider than the screen minus the inset
- [ ] Body scrolls with header and footer fixed; the focused field stays above the keyboard
- [ ] a11y: `meetsGuideline` tap target and contrast; semantics names the route
- [ ] No raw values (lint over the component folder)

Implement every item in B9, plus:
- [ ] Portrait and landscape goldens (en, ar)
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check` pass
- [ ] AC-6 Exported from the package entry file; README status updated; nothing outside C5 changed

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (48dp), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
cd 4-tablet-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](side-sheet.md#c8-execution-log-filled-by-the-executor) in `side-sheet.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `side-sheet.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
