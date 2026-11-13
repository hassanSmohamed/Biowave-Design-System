<!-- GENERATED from bottom-sheet.md @ 5e9b9d07b81b8da3 — do not edit; change the source and run: npm run contract -- tablet bottom-sheet -->
# Bottom sheet · اللوحة السفلية — Tablet — code contract

> **Everything you need to build Bottom sheet on Tablet, and nothing else.** Read this file only. Generated from [`bottom-sheet.md`](bottom-sheet.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](bottom-sheet.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Bottom sheet · اللوحة السفلية |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter M3 `showModalBottomSheet` (`showDragHandle: true`), styled from semantic tokens |
| Import | `BwBottomSheet`, `showBwBottomSheet` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/bottom-sheet/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`bottom-sheet.md`](bottom-sheet.md) @ `5e9b9d07b81b8da3` |

## 1. What it is

A bottom sheet slides up from the bottom edge of a touch screen and sits on top of it. It holds choices (filter by status, pick a member), a list of actions (take a photo, choose a file) or a short task (write a reason), and the user can still see the top of the screen behind it. The user closes it by finishing the task, tapping outside it or dragging it down.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `scrim` | Yes | Dims the screen behind and closes the sheet on tap |
| 2 | `container` | Yes | Raised surface attached to the bottom edge, rounded top corners only |
| 3 | `grabber` | Yes | Small bar that shows the sheet can be dragged; dragging it down closes the sheet or moves it between heights |
| 4 | `header` | No | The sheet title with a close button, or, on iOS, a row of round Close · title · Done buttons |
| 5 | `content` | Yes | The options, actions or task. Scrolls when it is taller than the sheet |
| 6 | `footer` | No | One full-width main action that applies the choice (Apply, Save). Stays at the bottom while the content scrolls |

**Options** (names and values are the props in §2):

- 4.1 `type`
- 4.2 `detent` (height)
- 4.3 `footer`
- 4.4 `dismissible`

## 2. API

### showBwBottomSheet / BwBottomSheet
`Future<T?> showBwBottomSheet<T>({required BuildContext context, required BwBottomSheet sheet})` opens a modal sheet and returns the value passed to `Navigator.pop` (the chosen option or action).

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `type` | `BwBottomSheetType` | `standard` · `list` · `action` | `standard` | | A4.1 |
| `detent` | `BwBottomSheetDetent` | `auto` · `full` | `auto` | | A4.2 |
| `title` | `String?` | (A6) | — | | `header` title; no header when null |
| `closeButton` | `bool` | | `true` | | Close button in the header |
| `content` | `Widget?` | any | — | with `standard` | `content` for `standard` |
| `options` | `List<BwSheetOption<T>>` | `label`, `value`, `trailing`, `enabled` | — | with `list` | Rows for `list`; `selected` marks the chosen value |
| `selected` | `T?` | | — | | The chosen option in a `list` |
| `actions` | `List<BwSheetAction>` | `label`, `icon`, `destructive`, `onPressed` | — | with `action` | Rows for `action` (2–6) |
| `footerAction` | `BwDialogAction?` | | — | | A4.3 — full-width primary Button |
| `dismissible` | `bool` | | `true` | | A4.4 |
| `onDismissAttempt` | `Future<bool> Function()?` | | — | | Called when `dismissible` is false and the user drags down or taps the scrim; return `true` to close (e.g. after "Discard changes?") |

Platform naming: Web has no Bottom sheet (A8 of Dialog / Side sheet).

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `type: list` without `options`, or `type: action` without `actions` | assert; release shows an empty sheet with the title |
| `actions` fewer than 2 or more than 6 | assert "Use 2–6 actions"; release renders them |
| `footerAction` with `type: list` or `action` | assert; release ignores the footer |

## 3. Dimensions

```
            ┌─────────────────── max width size-container-lg, centred ───────────────────┐
        ┬   │                         ━━━━  grabber                                      │  radius-4xl top corners
        │   │  Filter by status                                               [✕]       │  title-lg · padding spacing-layout-container
        │   │ ────────────────────────────────────────────────────────────────────────── │  divider while scrolled
        │   │  ○ Pending                                                       12        │  row min height size-control-height-lg
        │   │  [                            Apply                                     ]  │  Button lg full width
        ┴   └────────────────────────────────────────────────────────────────────────────┘
```

| Part | Property | Token | Flutter |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | `barrierColor: overlayDefault` |
| `container` | width | full width up to `size-container-lg`, centred | `constraints: BoxConstraints(maxWidth: BwSize.containerLg)` |
| `container` | max height | `auto`: content up to 90% of the screen · `full`: screen below the status bar | `isScrollControlled: true`; `DraggableScrollableSheet` for `full` |
| `container` | background · radius · elevation | `color-surface-raised` · `radius-4xl` top corners only · `elevation-4` | `backgroundColor`, `shape: RoundedRectangleBorder(borderRadius: BorderRadiusDirectional.vertical(top: Radius.circular(BwRadius.xl4)))`, shadow `e4`, `surfaceTintColor: Colors.transparent` |
| `grabber` | size · radius · fill | width `size-icon-xl` · height `spacing-xs` · `radius-full` · `color-border-default` | `showDragHandle: true`, `dragHandleSize: Size(BwSize.iconXl, BwSpacing.xs)`, `dragHandleColor: borderDefault` |
| `grabber` | area | padding-block `spacing-lg` | framework drag handle area (48dp target) |
| `header` | padding · gap | padding-inline `spacing-layout-container`, padding-block-end `spacing-lg` · gap `spacing-xl` | `EdgeInsetsDirectional` |
| `header` | title | `title-lg` · `color-text-default` | `context.bw.text.titleLg` |
| `header` | close button | Icon button `transparent` · `neutral` · `md`, icon `close` | `BwIconButton` |
| `content` | padding | padding-inline `spacing-layout-container` (`standard`); rows full width | |
| row (`list` · `action`) | layout | min height `size-control-height-lg` · padding-inline `spacing-layout-container` · padding-block `spacing-lg` · gap `spacing-xl` | `ListTile`-like `InkWell` row |
| row | text · icon | `body-md` · leading icon `size-icon-lg` (`action`) · trailing `check` `size-icon-lg` (`list`, chosen row) | |
| `footer` | layout | padding `spacing-layout-container`; Button `filled brand lg` full width | `BwButton(fullWidth: true, size: lg)` |
| divider | | Divider default under the header, only while the content scrolls | `BwDivider` |

## 4. Tokens by part and state

Every value is a semantic token; there is no `bottom-sheet.tokens.json` (nested Button, Icon button and Divider carry their own).

| Part | Property | Default | Pressed | Selected | Disabled |
|---|---|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | — | — | — |
| `container` | background | `color-surface-raised` | — | — | — |
| `container` | shadow | `elevation-4` | — | — | — |
| `grabber` | fill | `color-border-default` | — | — | — |
| title | color | `color-text-default` | — | — | — |
| row | background | transparent | `color-background-transparent-pressed` | — | — |
| row | label | `color-text-default` | — | `color-text-default` | `color-text-disabled` |
| row | check icon | — | — | `color-icon-role-brand` | — |
| row (`action`) | icon | `color-icon-default` | — | — | `color-icon-disabled` |
| destructive row | label · icon | `color-text-role-error` · `color-icon-role-error` | `color-background-transparent-pressed` | — | `color-text-disabled` |
| row separator · header divider | stroke | `color-border-subtle` | — | — | — |

Dark theme: same tokens; no exceptions.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-default` | `context.bw.colors.borderDefault` | #DBDBDB | #404040 |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-icon-default` | `context.bw.colors.iconDefault` | #0A0A0A | #F7F7F7 |
| `color-icon-disabled` | `context.bw.colors.iconDisabled` | #969696 | #707070 |
| `color-icon-role-brand` | `context.bw.colors.iconRoleBrand` | #132843 | #BEC9D9 |
| `color-icon-role-error` | `context.bw.colors.iconRoleError` | #A31A1A | #FEA3A3 |
| `color-overlay-default` | `context.bw.colors.overlayDefault` | #54545499 | #545454B3 |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `context.bw.colors.textDisabled` | #969696 | #707070 |
| `color-text-role-error` | `context.bw.colors.textRoleError` | #A31A1A | #FEA3A3 |
| `elevation-4` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 16px 48px -4px rgb(7 19 35 / 18%) | 0px 16px 48px -4px rgb(0 0 0 / 45%) |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 300 | 300 |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-emphasized-accelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.3,0,0.8,0.15] | [0.3,0,0.8,0.15] |
| `motion-easing-emphasized-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-4xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `size-container-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 640 | 640 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `size-icon-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `spacing-layout-container` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |
| `spacing-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `showBwBottomSheet` | scrim opacity · sheet slides up from below the screen | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | row tap, footer / Done, scrim, back, drag release past half | sheet slides down · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| Dragging | finger on grabber or header | sheet follows the finger (no easing) | — | — |
| Release → snap | drag released | to the nearest detent | `motion-duration-md` | `motion-easing-standard` |
| Row pressed | touch down | row background | `motion-duration-sm` | `motion-easing-standard` |

Reduced motion: slide and fade become `motion-duration-instant`; dragging still follows the finger.

## 6. RTL

| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left) |
| rows | Label at the start, counts and check at the end (left) |
| icons | `check`, `close`, `photo_camera`, `attach_file` do not mirror; `arrow_back` / `chevron_forward` mirror |
| grabber | Centred (no change) |

## 7. Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | Modal route: `Semantics(scopesRoute: true, namesRoute: true, label: title)`; screen behind excluded |
| Focus | Focus moves into the sheet (first row or field); returns to the trigger on close |
| Drag alternative | Close button (Android, Tablet) or Cancel (iOS) and the back gesture; `dismissible: false` still offers Cancel (WCAG 2.5.7) |
| Rows | `Semantics(button: true, selected: chosen, inMutuallyExclusiveGroup: true)` for `list` |
| Target size | Rows ≥ `size-control-height-lg` (48dp), grabber area ≥ 48dp |
| Keyboard | `viewInsets` lift the sheet above the on-screen keyboard |
| Screen reader output | "Filter by status, sheet. Approved, selected, 2 of 3" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves through the sheet only |
| Esc | Closes when `dismissible` (else `onDismissAttempt`) |
| Enter / Space | Activates the focused row or action |

## 8. Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

// list — picking a row returns it and closes the sheet
final status = await showBwBottomSheet<String>(
  context: context,
  sheet: BwBottomSheet(
    type: BwBottomSheetType.list,
    title: 'Filter by status',
    selected: current,
    options: const [
      BwSheetOption(label: 'Pending', value: 'pending', trailing: Text('12')),
      BwSheetOption(label: 'Approved', value: 'approved', trailing: Text('3')),
    ],
  ),
);

// action — Arabic, direction from the app locale
showBwBottomSheet(context: context, sheet: BwBottomSheet(
  type: BwBottomSheetType.action,
  actions: [
    BwSheetAction(label: 'التقاط صورة', icon: Symbols.photo_camera_rounded, onPressed: takePhoto),
    BwSheetAction(label: 'اختيار من الملفات', icon: Symbols.attach_file_rounded, onPressed: pickFile),
  ],
));
```

## 9. How to build it

### Goal

`BwBottomSheet` / `showBwBottomSheet` from `package:biowave_tablet` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Non-modal (persistent) sheets
- Search inside the sheet (the Autocomplete component provides it as `content`)
- Select, Autocomplete, Phone and pickers switching to `BwBottomSheet` — their own follow-up plans (plan R-1, R-3)

### Approach

- **Base:** `showModalBottomSheet(isScrollControlled: true, useSafeArea: true, showDragHandle: true, barrierColor: overlayDefault, backgroundColor: surfaceRaised, constraints: BoxConstraints(maxWidth: BwSize.containerLg), sheetAnimationStyle: AnimationStyle(duration: BwDuration.lg, reverseDuration: BwDuration.md, curve: BwEasing.emphasizedDecelerate, reverseCurve: BwEasing.emphasizedAccelerate))`.
- **Detents:** `auto` → `ConstrainedBox(maxHeight: 0.9 × screen)` around the content; `full` → `DraggableScrollableSheet(initialChildSize: 1, minChildSize: 0.5, snap: true, snapSizes: [0.5, 1])`.
- **Rows:** private `_BwSheetRow` (InkWell + Row), shared by `list` and `action`.
- **Dismiss guard:** `PopScope(canPop: dismissible, onPopInvokedWithResult:)` + `enableDrag: dismissible`; when blocked call `onDismissAttempt`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/bottom_sheet/bw_bottom_sheet.dart   new (widget, showBwBottomSheet, BwSheetOption, BwSheetAction, enums)
4-tablet-components/test/bottom_sheet_test.dart                               new
4-tablet-components/test/goldens/bottom_sheet/                                new goldens
4-tablet-components/lib/biowave_tablet.dart                                change: export (alphabetical)
4-tablet-components/README.md                                                 change: Bottom sheet row (Code)
CHANGELOG.md                                                                 change: one entry
```

## 10. Tests

- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens
- [ ] Every transition in B4 with token durations and easings; reduced motion → `motion-duration-instant`
- [ ] `list`: tapping a row pops with its value; the chosen row has the check and `selected` semantics
- [ ] `action`: 2–6 rows; destructive row in the error colours
- [ ] `detent: auto` hugs short content and stops at 90% of the screen; `full` expands below the status bar
- [ ] `dismissible: false`: drag down and scrim tap call `onDismissAttempt` and do not close on `false`
- [ ] The sheet rises above the on-screen keyboard
- [ ] Every invalid combination in B1 asserts and falls back
- [ ] a11y: `meetsGuideline` tap target and text contrast; semantics names the route; close works without dragging
- [ ] No raw values (lint over the component folder)

Implement every item in B9, plus:
- [ ] Landscape: the sheet is centred at `BwSize.containerLg`
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

1. Fill [C8 Execution log](bottom-sheet.md#c8-execution-log-filled-by-the-executor) in `bottom-sheet.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `bottom-sheet.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
