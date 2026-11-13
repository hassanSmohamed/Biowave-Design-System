<!-- GENERATED from dialog.md @ a753fade2e6526d9 — do not edit; change the source and run: npm run contract -- mobile dialog -->
# Dialog · نافذة حوار — Mobile — code contract

> **Everything you need to build Dialog on Mobile, and nothing else.** Read this file only. Generated from [`dialog.md`](dialog.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](dialog.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Dialog · نافذة حوار |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter `AlertDialog.adaptive` shown with `showAdaptiveDialog` (N-07): iOS renders `CupertinoAlertDialog`, Android renders the M3 `AlertDialog`; Biowave colours and type through the theme |
| Import | `BwDialog`, `showBwDialog` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/dialog/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`dialog.md`](dialog.md) @ `a753fade2e6526d9` |

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

### showBwDialog / BwDialog
`Future<T?> showBwDialog<T>({required BuildContext context, required BwDialog dialog})` opens the dialog over a modal route and returns the value passed to `Navigator.pop`.

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `String` | plain text (A6) | — | ✓ | `title` |
| `kind` | `BwDialogKind` | `basic` · `destructive` | `basic` | | A4.2 |
| `message` | `String` | 1–3 sentences (A6) | — | ✓ | `body` — plain text only on Mobile (A8) |
| `dismissible` | `bool` | | `true` | | A4.5 — scrim tap, Esc and back |
| `primaryAction` | `BwDialogAction` | `label`, `onPressed`, `loading`, `enabled` | — | ✓ | Main action |
| `secondaryAction` | `BwDialogAction?` | | — | | Usually "Cancel" |
| `tertiaryAction` | `BwDialogAction?` | | — | | Rare third action |

Platform naming: web `children` = Flutter `message`; `onClick` = `onPressed`. The OS look is chosen by `Theme.of(context).platform` through the `.adaptive` constructors (N-07); there is no `os` param.

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `message` longer than 3 sentences or containing line breaks | assert "Use a Bottom sheet for longer content"; release renders it |
| `tertiaryAction` without `secondaryAction` | assert; release renders it as the secondary |

## 3. Dimensions

```
iOS — iOS and iPadOS 27 Alert                 Android — M3 Basic dialog
   ╭─────────────────────────╮ radius-4xl     ┌───────────────────────────────┐   radius-3xl · elevation-4
   │ Delete this shift?      │ title-lg       │ Delete this shift?            │   heading-md · start-aligned
   │ Staff will be told it   │ body-md        │ Staff will be told it was     │   body-md · color-text-subtle
   │ was cancelled.          │                │ cancelled.                    │
   │ (  Cancel  )( Delete  ) │ capsules       │              Cancel   Delete  │   text buttons · gap spacing-md
   ╰─────────────────────────╯ h size-control-height-lg · radius-full          └───────────────────────────────┘
   width size-container-xxs · padding spacing-xl          width size-container-xxs (M3 280–560), padding spacing-layout-container
```

| Part | Property | iOS (`CupertinoAlertDialog`) | Android (M3 `AlertDialog`) |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` (`barrierColor`) | `color-overlay-default` (`barrierColor`) |
| `container` | width · padding | `size-container-xxs` (Figma; nearest token to the kit's 300 pt) · `spacing-xl`; title block padding-inline `spacing-md`, gap `spacing-md` | `size-container-xxs` (M3 280–560 from the framework) · `spacing-layout-container`; `insetPadding: EdgeInsets.symmetric(horizontal: context.bw.layout.container)` |
| `container` | background | `color-surface-raised` (the OS adds its glass material in code) | `color-surface-raised`; `surfaceTintColor: Colors.transparent` |
| `container` | radius · elevation | `radius-4xl` · `elevation-4` | `radius-3xl` · `elevation-4` |
| `title` | text style | `title-lg`, start-aligned (iOS 27 alert title is a small headline) | `heading-md`, start-aligned |
| `body` (`message`) | text style · colour | `body-md` · `color-text-subtle`, start-aligned | `body-md` · `color-text-subtle` |
| `footer` | actions | capsules, height `size-control-height-lg`, `radius-full`, label `action-md`, gap `spacing-md`: Default = `color-background-brand-default` + `color-text-on-brand`; Cancel = `color-background-transparent-hovered` + `color-text-default`; Destructive = `color-background-transparent-hovered` + `color-text-role-error` | `TextButton`s via `BwButton(variant: text)`; primary `brand`, destructive `error`; secondary `neutral`; gap `spacing-md`, end-aligned |
| `footer` | layout | two actions side by side; three stacked (OS rule) | in one row; stacked when they do not fit (`OverflowBar`) |

Fonts: IBM Plex Sans Arabic / Inter through `context.bw.text` on both OSes (Biowave identity); the OS keeps its layout and materials (iOS 27: capsule actions, no separators).

## 4. Tokens by part and state

Every value is a semantic token; there is no `dialog.tokens.json` (no component tokens — the nested Button, Icon button and Divider carry their own).

| Part | Property | Default | Pressed | Disabled |
|---|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | — | — |
| `container` | background | `color-surface-raised` | — | — |
| `title` | color | `color-text-default` | — | — |
| `body` | color | `color-text-subtle` | — | — |
| default action (iOS) | fill · label | `color-background-brand-default` · `color-text-on-brand` | `color-background-brand-pressed` | `color-text-disabled` |
| cancel action (iOS) | fill · label | `color-background-transparent-hovered` · `color-text-default` | `color-background-transparent-pressed` | `color-text-disabled` |
| destructive action (iOS) | fill · label | `color-background-transparent-hovered` · `color-text-role-error` | `color-background-transparent-pressed` | `color-text-disabled` |
| actions (Android) | — | Button `text` B3 (`brand`, `error`, `neutral`) | Button B3 | Button B3 |

Dark theme: same tokens; no exceptions.

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-background-brand-default` | `context.bw.colors.backgroundBrandDefault` | #193351 | #607D9F |
| `color-background-brand-pressed` | `context.bw.colors.backgroundBrandPressed` | #0D1E33 | #BEC9D9 |
| `color-background-transparent-hovered` | `context.bw.colors.backgroundTransparentHovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-overlay-default` | `context.bw.colors.overlayDefault` | #54545499 | #545454B3 |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `context.bw.colors.textDisabled` | #969696 | #707070 |
| `color-text-on-brand` | `context.bw.colors.textOnBrand` | #FFFFFF | #0A0A0A |
| `color-text-role-error` | `context.bw.colors.textRoleError` | #A31A1A | #FEA3A3 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `elevation-4` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 16px 48px -4px rgb(7 19 35 / 18%) | 0px 16px 48px -4px rgb(0 0 0 / 45%) |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 300 | 300 |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-easing-emphasized-accelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.3,0,0.8,0.15] | [0.3,0,0.8,0.15] |
| `motion-easing-emphasized-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `radius-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `radius-4xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `size-container-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 320 | 320 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `spacing-layout-container` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `showBwDialog` | iOS: the OS alert entrance (fade + scale, framework) · Android: opacity 0 → 1 | iOS: framework · Android: `motion-duration-lg` | iOS: framework · Android: `motion-easing-emphasized-decelerate` |
| Open → Closed | action, back (Android), scrim (Android) | opacity 1 → 0 | iOS: framework · Android: `motion-duration-md` | iOS: framework · Android: `motion-easing-emphasized-accelerate` |
| Main action → working | `primaryAction.loading` | Android: Button loading · iOS: action disabled with a spinner in place of the label | Button B4 | Button B4 |

The iOS entrance keeps Apple's timing on purpose: the alert must feel native (N-05).

Reduced motion: opacity changes become `motion-duration-instant` (Android form; the iOS alert follows the OS Reduce Motion setting).

## 6. RTL

| Part | In RTL |
|---|---|
| iOS | Title and message start-aligned (right); capsules in a row swap order (Cancel on the right) — the framework mirrors them |
| Android | Title and text start-aligned (right); actions end-aligned (left), main action last |
| text | Arabic copy from A6; numbers and Latin names stay LTR |

## 7. Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | `Semantics(scopesRoute: true, namesRoute: true, explicitChildNodes: true, label: title)` from the dialog route (both adaptive forms) |
| Focus | Route focus scope; first field or, for `destructive`, the secondary action gets focus with a hardware keyboard; focus returns to the opener on close |
| Dismiss | `barrierDismissible: dismissible`; Esc via `DismissIntent` and Android back via `PopScope(canPop: dismissible && !loading)` |
| Close button | none (A8) |
| Target size | ≥ 48dp (`meetsGuideline(androidTapTargetGuideline)` and iOS 44pt) |
| Screen reader output | "Delete this shift?, alert, Staff will be told it was cancelled." |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves through the dialog only |
| Esc | Closes when `dismissible` |
| Enter / Space | Activate the focused action |

## 8. Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

final ok = await showBwDialog<bool>(
  context: context,
  dialog: BwDialog(
    title: 'Delete this shift?',
    kind: BwDialogKind.destructive,
    message: 'Staff will be told it was cancelled.',
    secondaryAction: BwDialogAction(label: 'Cancel', onPressed: () => Navigator.pop(context, false)),
    primaryAction: BwDialogAction(label: 'Delete', onPressed: () => Navigator.pop(context, true)),
  ),
);

// Arabic: same API; direction from the app locale
BwDialog(title: 'حذف هذه الوردية؟', kind: BwDialogKind.destructive, message: 'سيتم إبلاغ الموظفين بإلغائها.',
  secondaryAction: BwDialogAction(label: 'إلغاء', onPressed: close),
  primaryAction: BwDialogAction(label: 'حذف', onPressed: remove));
```

## 9. How to build it

### Goal

`BwDialog` / `showBwDialog` from `package:biowave_mobile`, native on iOS and Android matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Alert (Wave 9); until it exists the `alert` slot takes any widget / node
- Full-screen dialogs, stacked dialogs, draggable dialogs
- Button, Icon button and Divider code (used as they are)

### Approach

- **Base (N-07):** `showBwDialog` calls `showAdaptiveDialog(barrierColor: overlayDefault, barrierDismissible: dismissible)`; the builder returns `AlertDialog.adaptive(title:, content: Text(message), actions:)`. On iOS the framework renders `CupertinoAlertDialog` (iOS and iPadOS 27 anatomy); on Android the M3 `AlertDialog`.
- **Actions:** `adaptiveAction()` helper: iOS → `CupertinoDialogAction(isDefaultAction: primary && basic, isDestructiveAction: destructive, child: Text(label, style: context.bw.text.actionMd))`; Android → `BwButton(variant: BwButtonVariant.text, color: brand | error | neutral)`.
- **Theme:** colours and fonts come from `BwMobileTheme` (`ThemeData.dialogTheme`, `CupertinoThemeData` with Biowave `primaryColor` and text theme). Nothing in the widget hard-codes the OS look.
- **Motion:** Android form `AnimationStyle` as Tablet; iOS keeps the framework animation (B4).
- **Gotcha:** `CupertinoAlertDialog` ignores `ThemeData` text styles — pass the Biowave `TextStyle`s to `title` and `content` explicitly.
- **Gotcha (iOS 27 look):** Figma shows the iOS and iPadOS 27 Alert (start-aligned text, capsule actions). If the Flutter version in use still draws the older Cupertino alert (centred text, separators), do not restyle it by hand: keep `CupertinoAlertDialog` and report it in C8 › Questions, so the Planner decides between waiting for Flutter and a custom `_BwIosAlert`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
5-mobile-components/lib/src/components/dialog/bw_dialog.dart   new (widget, showBwDialog, BwDialogAction, enums)
5-mobile-components/test/dialog_test.dart                          new
5-mobile-components/test/goldens/dialog/                           new goldens (iOS and Android)
5-mobile-components/lib/biowave_mobile.dart                     change: export (alphabetical)
5-mobile-components/README.md                                      change: Dialog row (Code)
CHANGELOG.md                                                      change: one entry
```

## 10. Tests

- [ ] Light + dark · en + ar: container, scrim, title, body and actions use exactly the B2–B3 tokens on iOS and Android (`debugDefaultTargetPlatformOverride`)
- [ ] Every transition in B4 with the token durations and easings; reduced motion → `motion-duration-instant` (Android form)
- [ ] `kind="destructive"`: main action in the error colour; first focus on the secondary action
- [ ] `dismissible` on / off: scrim, Esc and back close or do nothing; nothing closes while `primaryAction.loading`
- [ ] Focus moves into the dialog on open, stays inside (Tab wraps) and returns to the opener on close
- [ ] Long body scrolls with header and footer fixed; dividers only while scrolled
- [ ] Every invalid combination in B1 warns / asserts and falls back
- [ ] a11y: `meetsGuideline` tap target and text contrast, semantics tree names the route
- [ ] No raw values (lint over the component folder)

Implement every item in B9, plus:
- [ ] `TargetPlatform.iOS` renders `CupertinoAlertDialog`, `TargetPlatform.android` the M3 `AlertDialog` (golden each, en and ar)
- [ ] Biowave fonts on both OSes (title and message use `context.bw.text`)
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

1. Fill [C8 Execution log](dialog.md#c8-execution-log-filled-by-the-executor) in `dialog.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `dialog.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
