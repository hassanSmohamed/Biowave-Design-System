<!-- GENERATED from bottom-sheet.md @ b4eadd6583931254 — do not edit; change the source and run: npm run contract -- mobile bottom-sheet -->
# Bottom sheet · اللوحة السفلية — Mobile — code contract

> **Everything you need to build Bottom sheet on Mobile, and nothing else.** Read this file only. Generated from [`bottom-sheet.md`](bottom-sheet.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](bottom-sheet.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Bottom sheet · اللوحة السفلية |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter adaptive (N-07): Android → M3 `showModalBottomSheet` with drag handle; iOS → `CupertinoSheetRoute` (sheet with grabber and detents) and, for `type: action`, `CupertinoActionSheet` — the iOS and iPadOS 27 anatomy in Biowave colours and type |
| Import | `BwBottomSheet`, `showBwBottomSheet` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/bottom-sheet/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`bottom-sheet.md`](bottom-sheet.md) @ `b4eadd6583931254` |

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
| `title` | `String?` | (A6) | — | | `header` title (iOS: centre of the Close · Title · Done row; Android: start) |
| `message` | `String?` | | — | | iOS Action sheet message line only |
| `doneLabel` | `String?` | | — | | Accessible name of the iOS Done (✓) button for `standard`; replaces the footer on iOS |
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
| `doneLabel` and `footerAction` together | assert; iOS uses `doneLabel`, Android uses `footerAction` |

## 3. Dimensions

```
iOS — Sheet (iOS and iPadOS 27)              Android — M3 bottom sheet
╭───────────────────────────────────╮        ┌───────────────────────────────────┐  iOS radius-4xl all corners, inset spacing-sm
│               ━━━━                │        │               ━━━━                │  Android radius-4xl top · elevation-4
│ (✕)     Filter by status     (✓)  │        │ Filter by status              [✕] │  title-lg
│ ☐ Pending                    12   │        │ ☐ Pending                    12   │  rows: List item lg
│ ☐ Approved                    3   │        │ [             Apply             ] │  Button lg full width
╰───────────────────────────────────╯        └───────────────────────────────────┘
```

| Part | Property | iOS | Android |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | `color-overlay-default` |
| `container` | width | screen width minus `spacing-sm` each side (floating) | full screen width |
| `container` | background | `color-surface-raised` | `color-surface-raised`, `surfaceTintColor: Colors.transparent` |
| `container` | radius · elevation | `radius-4xl` all corners · `elevation-4` | `radius-4xl` top corners · `elevation-4` |
| `container` | heights | `auto` = medium detent · `full` = large detent | `auto` = content up to 90% · `full` = expanded below the status bar |
| `grabber` | | the OS grabber (`Grabber` in the Apple kit) | width `size-icon-xl` · height `spacing-xs` · `radius-full` · `color-border-default` |
| `header` | layout | round buttons `size-control-height-md`, `radius-full`: Close (✕, `color-background-transparent-hovered`, icon `color-icon-default`) · title (`title-lg`, centred) · Done (✓, `color-background-brand-default`, icon `color-icon-on-brand`; hidden on `list`); padding-inline `spacing-xl`, gap `spacing-xl` | title `title-lg` start + close Icon button (`transparent neutral md`) |
| row (`list`) | | List item lg (same rows as Android); chosen row `selected` with trailing `check` | `body-md`; chosen row trailing `check` `color-icon-role-brand`; min height `size-control-height-lg` |
| `action` | | iOS 27 Action Sheet card (`radius-4xl`, padding `spacing-xl`): title `title-lg`, message `label-md` `color-text-subtle`, capsule actions (`size-control-height-lg`, `radius-full`, `color-background-transparent-hovered`, label `action-md`), destructive label `color-text-role-error`; no separate Cancel group | rows with leading icon `size-icon-lg` `color-icon-default` + `body-md` label; destructive in `color-text-role-error` / `color-icon-role-error` |
| `footer` | | none — Done in the header (`doneLabel`) | padding `spacing-layout-container`; Button `filled brand lg` full width |
| padding | content | `spacing-layout-container` inline | `spacing-layout-container` inline |

Fonts: Biowave text styles (`context.bw.text`) on both OSes; the OS keeps its sheet shape and materials. The iOS grabber is the kit instance (system chrome, N-02).

## 4. Tokens by part and state

Every value is a semantic token; there is no `bottom-sheet.tokens.json` (nested Button, Icon button and Divider carry their own).

| Part | Property | Default | Pressed | Selected | Disabled |
|---|---|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | — | — | — |
| `container` | background | `color-surface-raised` | — | — | — |
| `container` | shadow | `elevation-4` (Android) | — | — | — |
| `grabber` | fill | `color-border-default` | — | — | — |
| title | color | `color-text-default` | — | — | — |
| row | background | transparent | `color-background-transparent-pressed` | — | — |
| row | label | `color-text-default` | — | `color-text-default` | `color-text-disabled` |
| row | check icon | — | — | `color-icon-role-brand` | — |
| row (`action`) | icon | `color-icon-default` | — | — | `color-icon-disabled` |
| destructive row | label · icon | `color-text-role-error` · `color-icon-role-error` | `color-background-transparent-pressed` | — | `color-text-disabled` |
| row separator · header divider | stroke | `color-border-subtle` | — | — | — |

Dark theme: same tokens; no exceptions.

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-background-brand-default` | `context.bw.colors.backgroundBrandDefault` | #193351 | #607D9F |
| `color-background-transparent-hovered` | `context.bw.colors.backgroundTransparentHovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-default` | `context.bw.colors.borderDefault` | #DBDBDB | #404040 |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-icon-default` | `context.bw.colors.iconDefault` | #0A0A0A | #F7F7F7 |
| `color-icon-disabled` | `context.bw.colors.iconDisabled` | #969696 | #707070 |
| `color-icon-on-brand` | `context.bw.colors.iconOnBrand` | #FFFFFF | #0A0A0A |
| `color-icon-role-brand` | `context.bw.colors.iconRoleBrand` | #132843 | #BEC9D9 |
| `color-icon-role-error` | `context.bw.colors.iconRoleError` | #A31A1A | #FEA3A3 |
| `color-overlay-default` | `context.bw.colors.overlayDefault` | #54545499 | #545454B3 |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `context.bw.colors.textDisabled` | #969696 | #707070 |
| `color-text-role-error` | `context.bw.colors.textRoleError` | #A31A1A | #FEA3A3 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
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
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `size-icon-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `spacing-layout-container` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |
| `spacing-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 6 | 6 |
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

On iOS the sheet and the Action sheet keep the OS timing (framework `CupertinoSheetRoute` / `showCupertinoModalPopup`), so they feel native (N-05); the table applies to Android.

Reduced motion: slide and fade become `motion-duration-instant`; dragging still follows the finger.

## 6. RTL

| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left); iOS header Close on the right, Done on the left |
| rows | Label at the start, counts and check at the end (left) |
| icons | `check`, `close`, `photo_camera`, `attach_file` do not mirror; `arrow_back` / `chevron_forward` mirror |
| grabber | Centred (no change) |

## 7. Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | Modal route: `Semantics(scopesRoute: true, namesRoute: true, label: title)`; screen behind excluded |
| Focus | Focus moves into the sheet (first row or field); returns to the trigger on close |
| Drag alternative | Close button (all) and the back gesture; `dismissible: false` still offers Close (WCAG 2.5.7) |
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
import 'package:biowave_mobile/biowave_mobile.dart';

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

`BwBottomSheet` / `showBwBottomSheet` from `package:biowave_mobile`, native on iOS and Android matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Non-modal (persistent) sheets
- Search inside the sheet (the Autocomplete component provides it as `content`)
- Select, Autocomplete, Phone and pickers switching to `BwBottomSheet` — their own follow-up plans (plan R-1, R-3)

### Approach

- **Adaptive (N-07):** branch on `Theme.of(context).platform`.
  - **Android:** same as the Tablet plan (`showModalBottomSheet`, drag handle, Biowave shape, `AnimationStyle`), full screen width.
  - **iOS `standard` / `list`:** `Navigator.push(CupertinoSheetRoute(builder: …))` with a Biowave `CupertinoTheme`; header row = round Close (✕) button · title · round Done (✓) button (`doneLabel` as its semantics label); detents medium / large. If the Flutter version in use has no detents on `CupertinoSheetRoute`, use `DraggableScrollableSheet` inside it with the same snap sizes and record it in C8.
  - **iOS `action`:** `showCupertinoModalPopup(builder: (_) => CupertinoActionSheet(title:, message:, actions: [CupertinoActionSheetAction(isDestructiveAction: …)]))`. If the Flutter version still draws the pre-iOS 26 action sheet (separators, separate Cancel group), keep it and report in C8 › Questions (same rule as Dialog).
- **Theme:** colours and fonts from `BwMobileTheme` (`bottomSheetTheme`, `CupertinoThemeData`); pass `context.bw.text` styles explicitly to Cupertino widgets (they ignore `ThemeData` text).
- **Dismiss guard:** as Tablet; on iOS also `CupertinoSheetRoute` drag is disabled when `dismissible` is false.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
5-mobile-components/lib/src/components/bottom_sheet/bw_bottom_sheet.dart   new (widget, showBwBottomSheet, BwSheetOption, BwSheetAction, enums)
5-mobile-components/test/bottom_sheet_test.dart                               new
5-mobile-components/test/goldens/bottom_sheet/                                new goldens (iOS and Android)
5-mobile-components/lib/biowave_mobile.dart                                change: export (alphabetical)
5-mobile-components/README.md                                                 change: Bottom sheet row (Code)
CHANGELOG.md                                                                 change: one entry
```

## 10. Tests

- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens on iOS and Android (`debugDefaultTargetPlatformOverride`)
- [ ] Every transition in B4 with token durations and easings; reduced motion → `motion-duration-instant`
- [ ] `list`: tapping a row pops with its value; the chosen row has the check and `selected` semantics
- [ ] `action`: 2–6 rows; destructive row in the error colours; iOS renders `CupertinoActionSheet`
- [ ] `detent: auto` hugs short content and stops at 90% of the screen; `full` expands below the status bar
- [ ] `dismissible: false`: drag down and scrim tap call `onDismissAttempt` and do not close on `false`
- [ ] The sheet rises above the on-screen keyboard
- [ ] Every invalid combination in B1 asserts and falls back
- [ ] a11y: `meetsGuideline` tap target and text contrast; semantics names the route; close works without dragging
- [ ] No raw values (lint over the component folder)

Implement every item in B9, plus:
- [ ] iOS: `standard` uses `CupertinoSheetRoute` with the Close · Title · Done header; `action` uses `CupertinoActionSheet` (goldens en/ar)
- [ ] Biowave fonts on both OSes
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 5-mobile-components && flutter analyze && flutter test`, `npm run docs:check` pass
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
cd 5-mobile-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](bottom-sheet.md#c8-execution-log-filled-by-the-executor) in `bottom-sheet.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `bottom-sheet.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
