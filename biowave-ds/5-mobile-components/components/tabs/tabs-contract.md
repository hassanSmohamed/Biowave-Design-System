<!-- GENERATED from tabs.md @ bba4176625e70ac1 — do not edit; change the source and run: npm run contract -- mobile tabs -->
# Tabs · علامات التبويب — Mobile — code contract

> **Everything you need to build Tabs on Mobile, and nothing else.** Read this file only. Generated from [`tabs.md`](tabs.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](tabs.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Tabs · علامات التبويب |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter adaptive (N-07): iOS → `CupertinoSlidingSegmentedControl` (iOS and iPadOS 27 Segmented Control look) for 2–4 views; Android → M3 `TabBar` (fixed, or scrollable above 4) |
| Import | `BwTabs`, `BwTab` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/tabs/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`tabs.md`](tabs.md) @ `bba4176625e70ac1` |

## 1. What it is

Tabs split one screen into views of the same object — a device's Overview, Users, Logs and Settings — and let the user switch without leaving the page. The selected tab is marked with a brand underline (Primary) or a selected chip (Secondary). On Mobile they take each OS's form: the iOS segmented control and M3 tabs on Android.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `tab` | Yes | One view; the whole tab is the target |
| 2 | `label` | Yes | The view's name |
| 3 | `badge` | No | Count or dot for new items in that view |
| 4 | `indicator` | Yes | Marks the selected tab: underline (Primary, Android) · chip (Secondary) · raised segment (iOS) |
| 5 | `divider` | Primary | Line under the tab row |

**Options** (names and values are the props in §2):

- 4.1 `variant`
- 4.2 Layout
- 4.3 `icon` · `badge`

## 2. API

### BwTabs
| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `tabs` | `List<BwTab>` (`label`, `badgeCount?`) | 2–7 | — | ✓ | `tab` |
| `selectedIndex` | `int` | | `0` | | Selected tab |
| `onChanged` | `ValueChanged<int>` | | — | ✓ | |
| `scrollable` | `bool?` | | auto (`tabs.length > 4`) | | Forces the scrollable form on both OSs |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| fewer than 2 tabs | assert |
| `badgeCount` on iOS segments | ignored (the segmented control has no badge) |

## 3. Dimensions

| Part | Property | iOS (segmented control) | Android (M3 tabs) |
|---|---|---|---|
| container | height · padding · gap | `size-control-height-sm` · `spacing-xxs` · `spacing-xs` | `size-control-height-lg` · none · none |
| container | radius · fill | `radius-full` · `color-background-neutral-default` | none · `color-surface-default` |
| tab | width | equal (fill) | equal (fill); scrollable: hug with `spacing-xl` padding |
| tab | radius | `radius-full` | none |
| label | text style | `label-md` | `label-lg` |
| indicator | | selected segment: `color-surface-raised` + `elevation-2` | underline under the label: height `border-width-strong`, label width, top corners `radius-xxs`, `color-border-brand` |
| divider | | — | `border-width-default` `color-border-subtle` |

## 4. Tokens by part and state

Every value is a semantic token; there is no `tabs.tokens.json`. Nested Badge and Icon carry their own.

| Part | Property | Default | Selected | Pressed |
|---|---|---|---|---|
| label (iOS) | colour | `color-text-subtle` | `color-text-default` | `color-text-default` |
| label (Android) | colour | `color-text-subtle` | `color-text-role-brand` | `color-text-default` |
| tab (Android) | fill | `color-background-transparent-default` | same | `color-background-transparent-pressed` |

Contrast (light): `color-text-subtle` on `color-surface-default` 14.55:1 · `color-text-role-brand` on `color-surface-default` 14.87:1 · on `color-background-selected-default` 12.54:1 · iOS `color-text-subtle` on `color-background-neutral-default` 12.43:1. Dark theme: same tokens.

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `border-width-strong` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-neutral-default` | `context.bw.colors.backgroundNeutralDefault` | #EDEDED | #292929 |
| `color-background-selected-default` | `context.bw.colors.backgroundSelectedDefault` | #E8ECF2 | #193351 |
| `color-background-transparent-default` | `context.bw.colors.backgroundTransparentDefault` | #54545400 | #54545400 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-brand` | `context.bw.colors.borderBrand` | #254471 | #607D9F |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-role-brand` | `context.bw.colors.textRoleBrand` | #132843 | #BEC9D9 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `elevation-2` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 2px 16px 0px rgb(7 19 35 / 9%) | 0px 2px 16px 0px rgb(0 0 0 / 22%) |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `radius-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-control-height-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `spacing-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hovered / Pressed | pointer / tap | fill, label colour | `motion-duration-sm` | `motion-easing-standard` |
| Tab A → Tab B | select | indicator slides to the new tab (iOS: the raised segment slides) | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: the indicator jumps without sliding.

## 6. RTL

| Part | In RTL |
|---|---|
| order | Reverses: first tab on the right |
| indicator | Moves with the tab |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | iOS: segmented control (`Semantics(inMutuallyExclusiveGroup)`), Android: `TabBar` tabs |
| Selected | `Semantics(selected: true)` |
| Target size | `target-min` (48) per tab |
| Badge | Included in the tab's label: "Logs, 3 new" |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Mobile Tabs matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The tab panels' content
- Pagination, Stepper (next in the navigation family)

### Approach

- **Base (N-07):** iOS and ≤ 4 tabs → `CupertinoSlidingSegmentedControl` themed (track `color-background-neutral-default`, thumb `color-surface-raised`); if the Flutter version draws the pre-iOS 26 look, keep it and report (O-07). Otherwise → M3 `TabBar` (fixed, or `isScrollable` above 4).

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
5-mobile-components/lib/src/components/tabs/bw_tabs.dart   new
5-mobile-components/test/tabs_test.dart · goldens (iOS + Android)
5-mobile-components/lib/biowave_mobile.dart   change: export
5-mobile-components/README.md · CHANGELOG.md
```

## 10. Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Selecting a tab calls the handler and moves the indicator
- [ ] RTL reverses the order
- [ ] Tabs that do not fit scroll; the selected tab scrolls into view
- [ ] No raw values

Implement every item in B9, plus:
- [ ] Disabled tabs are skipped by the keyboard and not selectable
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

1. Fill [C8 Execution log](tabs.md#c8-execution-log-filled-by-the-executor) in `tabs.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `tabs.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
