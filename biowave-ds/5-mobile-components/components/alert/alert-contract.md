<!-- GENERATED from alert.md @ 97098dbf85e9ee61 — do not edit; change the source and run: npm run contract -- mobile alert -->
# Alert · تنبيه — Mobile — code contract

> **Everything you need to build Alert on Mobile, and nothing else.** Read this file only. Generated from [`alert.md`](alert.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](alert.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Alert · تنبيه |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter custom `BwAlert` widget built with semantic tokens (FB-03: legacy `Status Banners / Mobile` stays untouched as request-status header), reusing `BwButton` and `BwIconButton` |
| Import | `import 'package:biowave_mobile/biowave_mobile.dart'; // BwAlert` |
| Version | 1.0 · 2026-11-14 |
| Source code | `lib/src/components/alert/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`alert.md`](alert.md) @ `97098dbf85e9ee61` |

## 1. What it is

An alert is an inline status banner placed inside page, section, form or dialog content to surface important contextual information (`info`, `success`, `warning`, `error`, `neutral`). Unlike a snackbar, it stays in the layout until the underlying condition is resolved or the user explicitly dismisses it. Both single-line banners and multi-line titled alerts share one component.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Tinted surface with a `1 px` role border and `8 px` rounded corners |
| 2 | `icon` | Yes | Leading status icon paired with role colour so status is never conveyed by colour alone |
| 3 | `title` | No | Optional short heading (`Show title`) when more than one line of context is needed |
| 4 | `description` | Yes | Clear statement of what happened and, for warnings/errors, what to do next |
| 5 | `action` | No | Optional single compact `Button` for immediate resolution (`Retry`, `View details`) |
| 6 | `close-button` | No | Optional `Icon button` (`✕`) when the banner is non-critical and user-dismissible |

**Options** (names and values are the props in §2):

- 4.1 `status`
- 4.2 Layout & actions

## 2. API

### BwAlert (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `status` | `BwAlertStatus` (`info · success · warning · error · neutral`) | `BwAlertStatus.info` | | Visual tone and leading icon (FB-01) |
| `title` | `String?` | `null` | | Optional short heading; hides heading row when `null` (FB-02) |
| `description` | `String` | — | ✓ | Body message |
| `actionLabel` | `String?` | `null` | | Label for optional action button (requires `onAction`) |
| `onAction` | `VoidCallback?` | `null` | | Action callback |
| `onDismiss` | `VoidCallback?` | `null` | | Renders trailing `✕` `BwIconButton` when non-null |
| `closeSemanticLabel` | `String?` | localised `"Dismiss alert"` | | Screen-reader label for close button |

**Invalid combinations** (`assert` in development):
| Combination | Fallback |
|---|---|
| `action` provided without handler | Ignores handlerless action button, warns |
| Empty `title` string `""` passed | Treats as omitted (`Show title = false`) |

## 3. Dimensions

| Part | Property | Token |
|---|---|---|
| container | radius · border width | `radius-md` (8) · `border-width-default` (1) |
| container | padding-block · padding-inline | `spacing-lg` (12) · `spacing-xl` (16) |
| container | gap `icon`–`content` · `content`–actions | `spacing-lg` (12) · `spacing-xl` (16) |
| leading `icon` | size | `size-icon-lg` (24) |
| `content` | gap `title`–`description` | `spacing-xs` (4) |
| `title` | text style | `title-md` |
| `description` | text style | `body-lg` |
| `action` · `close-button` | target height · gap between them | `48 × 48 dp` (`size-control-height-lg`) · `spacing-md` (8) |

## 4. Tokens by part and state

Every value is a semantic token; there is no `alert.tokens.json`.

| Part | `info` | `success` | `warning` | `error` | `neutral` |
|---|---|---|---|---|---|
| container fill | `color-background-info-subtlest` | `color-background-success-subtlest` | `color-background-warning-subtlest` | `color-background-error-subtlest` | `color-surface-subtle` |
| container border | `color-border-info` | `color-border-success` | `color-border-warning` | `color-border-error` | `color-border-default` |
| leading `icon` | `color-icon-role-info` | `color-icon-role-success` | `color-icon-role-warning` | `color-icon-role-error` | `color-icon-subtle` |
| `title` (FB-02) | `color-text-role-info` | `color-text-role-success` | `color-text-role-warning` | `color-text-role-error` | `color-text-default` |
| `description` (titled, FB-02) | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-default` |
| `description` (single-line, FB-02) | `color-text-role-info` | `color-text-role-success` | `color-text-role-warning` | `color-text-role-error` | `color-text-default` |

Contrast (Light / Dark): role text/icon on subtlest — `info` 7.36:1 / 9.21:1 · `success` 5.73:1 / 10.02:1 · `warning` 7.68:1 / 8.85:1 · `error` 6.95:1 / 8.58:1 · `neutral` 18.48:1 / 13.58:1; body `color-text-default` on subtlest ≥ 12.47:1 across all statuses; border on `color-surface-default` ≥ 3.24:1 Light / ≥ 6.64:1 Dark.

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-error-subtlest` | `context.bw.colors.backgroundErrorSubtlest` | #FEF0EE | #420A0A |
| `color-background-info-subtlest` | `context.bw.colors.backgroundInfoSubtlest` | #EEF4FF | #081638 |
| `color-background-success-subtlest` | `context.bw.colors.backgroundSuccessSubtlest` | #E9F7EF | #071F12 |
| `color-background-warning-subtlest` | `context.bw.colors.backgroundWarningSubtlest` | #FFF3E8 | #4A2609 |
| `color-border-default` | `context.bw.colors.borderDefault` | #DBDBDB | #404040 |
| `color-border-error` | `context.bw.colors.borderError` | #D42222 | #FF7676 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-border-info` | `context.bw.colors.borderInfo` | #2559D4 | #6D9CE8 |
| `color-border-success` | `context.bw.colors.borderSuccess` | #268751 | #55BE87 |
| `color-border-warning` | `context.bw.colors.borderWarning` | #D97424 | #FFB05E |
| `color-icon-role-error` | `context.bw.colors.iconRoleError` | #A31A1A | #FEA3A3 |
| `color-icon-role-info` | `context.bw.colors.iconRoleInfo` | #1D48AD | #9CBCF2 |
| `color-icon-role-success` | `context.bw.colors.iconRoleSuccess` | #1E6D41 | #8DD4AE |
| `color-icon-role-warning` | `context.bw.colors.iconRoleWarning` | #773F12 | #FFC88F |
| `color-icon-subtle` | `context.bw.colors.iconSubtle` | #292929 | #DBDBDB |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-surface-subtle` | `context.bw.colors.surfaceSubtle` | #F7F7F7 | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-role-error` | `context.bw.colors.textRoleError` | #A31A1A | #FEA3A3 |
| `color-text-role-info` | `context.bw.colors.textRoleInfo` | #1D48AD | #9CBCF2 |
| `color-text-role-success` | `context.bw.colors.textRoleSuccess` | #1E6D41 | #8DD4AE |
| `color-text-role-warning` | `context.bw.colors.textRoleWarning` | #773F12 | #FFC88F |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard-accelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.3,0,1,1] | [0.3,0,1,1] |
| `motion-easing-standard-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0,0,0,1] | [0,0,0,1] |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | Mount / alert shown | opacity `0 → 1`, subtle expand | `motion-duration-md` (200 ms) | `motion-easing-standard-decelerate` |
| Visible → Dismissed | Close activated | opacity `1 → 0`, collapse | `motion-duration-sm` (100 ms) | `motion-easing-standard-accelerate` |

Reduced motion: instant (`motion-duration-instant`).

## 6. RTL

| Part | In RTL |
|---|---|
| horizontal layout | Leading `icon` moves to right edge; `action` and `close-button` move to left edge |
| `title` · `description` | Right-aligned (`text-align: start`) |
| status icons | Info, check, warning and error exclamation do not mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | `Semantics(liveRegion: true)` on dynamic banners; `Semantics(label: ...)` on icon-only close button; icon excluded (`ExcludeSemantics`) |
| Focus | Keyboard focus outline `border-width-focus` (`color-border-focus`) with `border-focus-offset` on action & close buttons |
| Target size | `48 × 48 dp` (`size-control-height-lg`) |

## 8. Examples

```dart
// EN
BwAlert(
  status: BwAlertStatus.error,
  title: 'Connection lost',
  description: 'Check your network settings and try again.',
  actionLabel: 'Retry',
  onAction: onRetry,
  onDismiss: onClose,
)

// AR (direction comes from Directionality / locale)
BwAlert(
  status: BwAlertStatus.info,
  description: 'يتم تطبيق التغييرات في المناوبة التالية.',
  onDismiss: onClose,
)
```

## 9. How to build it

### Goal

The Mobile `Alert` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Transient toast confirmations (`Snackbar`)
- Legacy Mobile `Status Banners / Mobile` approval header strip (FB-03)

### Approach

- **Base:** Custom `BwAlert` Flutter `Container` + `Row`/`Wrap` using semantic token decoration (`radius-md`, `border-width-default`), reusing `BwButton` and `BwIconButton`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
5-mobile-components/lib/src/components/alert/bw_alert.dart · test/alert_test.dart   new
5-mobile-components/lib/biowave_mobile.dart · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Light + dark · en + ar: all 5 statuses (`info`, `success`, `warning`, `error`, `neutral`) bind B2–B3 semantic tokens
- [ ] Titled (`title` + `children`) vs single-line (`children` only) layout and colour rules (FB-02)
- [ ] `onDismiss` shows close button and triggers callback; `action` invokes callback
- [ ] RTL mirrors horizontal order without mirroring status icons
- [ ] Accessibility role/live-region and tap target / contrast checks pass

Implement every item in B9, plus:
- [ ] Single-line vs titled text colour difference (FB-02)
- [ ] Action + dismiss keyboard/focus behaviour
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:mobile`, `flutter analyze`, `npm run docs:check` pass
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

1. Fill [C8 Execution log](alert.md#c8-execution-log-filled-by-the-executor) in `alert.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `alert.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
