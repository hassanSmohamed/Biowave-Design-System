<!-- GENERATED from tabs.md @ 37e623c162c4908d — do not edit; change the source and run: npm run contract -- tablet tabs -->
# Tabs · علامات التبويب — Tablet — code contract

> **Everything you need to build Tabs on Tablet, and nothing else.** Read this file only. Generated from [`tabs.md`](tabs.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](tabs.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Tabs · علامات التبويب |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter M3 `TabBar` (+ `TabBarView`), themed from semantic tokens; Secondary uses `TabBar` with a pill `indicator` |
| Import | `BwTabs`, `BwTab` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/tabs/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`tabs.md`](tabs.md) @ `37e623c162c4908d` |

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
| `tabs` | `List<BwTab>` (`label`, `icon?`, `badgeCount?`, `enabled`) | 2–7 | — | ✓ | `tab` |
| `selectedIndex` | `int` | | `0` | | |
| `onChanged` | `ValueChanged<int>` | | — | ✓ | |
| `variant` | `BwTabsVariant` | `primary` · `secondary` | `primary` | | `variant` |
| `scrollable` | `bool` | | `false` | | `TabBar.isScrollable` |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| `icon` on some tabs only | icons hidden on all |
| fewer than 2 tabs | assert |

## 3. Dimensions

| Part | Property | Primary | Secondary |
|---|---|---|---|
| tab | height | `size-control-height-lg` | `size-control-height-md` |
| tab | padding-inline · gap (icon, label, badge) | `spacing-3xl` · `spacing-md` | `spacing-lg` · `spacing-md` |
| tab | radius | none | `radius-full` |
| container | gap between tabs | `spacing-xl` | `spacing-md` |
| label | text style | `label-lg` | `label-lg` |
| icon | size | `size-icon-lg` | `size-icon-lg` |
| badge | | Badge `Count` | Badge `Count` |
| indicator | | bottom border `border-width-strong` `color-border-brand`, full tab width | the selected tab's fill |
| divider | | container bottom border `border-width-default` `color-border-subtle` | none |
| focus ring | | `border-width-focus` · `color-border-focus` · `radius-md` | same, `radius-full` |

## 4. Tokens by part and state

Every value is a semantic token; there is no `tabs.tokens.json`. Nested Badge and Icon carry their own.

| Part | Property | Default | Hovered | Pressed | Selected | Disabled |
|---|---|---|---|---|---|---|
| tab | fill (Primary) | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-transparent-default` | same as Default |
| tab | fill (Secondary) | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` | same as Default |
| label · icon | colour | `color-text-subtle` · `color-icon-subtle` | `color-text-default` · `color-icon-default` | same as Hovered | `color-text-role-brand` · `color-icon-role-brand` | `color-text-disabled` · `color-icon-disabled` |

Contrast (light): `color-text-subtle` on `color-surface-default` 14.55:1 · `color-text-role-brand` on `color-surface-default` 14.87:1 · on `color-background-selected-default` 12.54:1 · iOS `color-text-subtle` on `color-background-neutral-default` 12.43:1. Dark theme: same tokens.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `border-width-strong` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-neutral-default` | `context.bw.colors.backgroundNeutralDefault` | #EDEDED | #292929 |
| `color-background-selected-default` | `context.bw.colors.backgroundSelectedDefault` | #E8ECF2 | #193351 |
| `color-background-transparent-default` | `context.bw.colors.backgroundTransparentDefault` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `context.bw.colors.backgroundTransparentHovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-brand` | `context.bw.colors.borderBrand` | #254471 | #607D9F |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-icon-default` | `context.bw.colors.iconDefault` | #0A0A0A | #F7F7F7 |
| `color-icon-disabled` | `context.bw.colors.iconDisabled` | #969696 | #707070 |
| `color-icon-role-brand` | `context.bw.colors.iconRoleBrand` | #132843 | #BEC9D9 |
| `color-icon-subtle` | `context.bw.colors.iconSubtle` | #292929 | #DBDBDB |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `context.bw.colors.textDisabled` | #969696 | #707070 |
| `color-text-role-brand` | `context.bw.colors.textRoleBrand` | #132843 | #BEC9D9 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
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
| icon · badge | Icon after the label's start edge (right), badge at the end (left); glyphs do not mirror |
| scroll arrows | Mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | M3 `TabBar` semantics (tab, selected, index of count) |
| Target size | `target-min` (48) |
| Badge | Included in the tab's label: "Logs, 3 new" |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Tablet Tabs matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The tab panels' content
- Pagination, Stepper (next in the navigation family)

### Approach

- **Base:** M3 `TabBar` with `indicator` (UnderlineTabIndicator from tokens, or a pill `BoxDecoration` for Secondary), `labelStyle` `context.bw.text.labelLg`, `isScrollable`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/tabs/bw_tabs.dart   new
4-tablet-components/test/tabs_test.dart · goldens
4-tablet-components/lib/biowave_tablet.dart   change: export
4-tablet-components/README.md · CHANGELOG.md
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

1. Fill [C8 Execution log](tabs.md#c8-execution-log-filled-by-the-executor) in `tabs.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `tabs.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
