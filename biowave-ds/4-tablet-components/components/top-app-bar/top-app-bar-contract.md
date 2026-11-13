<!-- GENERATED from top-app-bar.md @ d7906e337d9d2180 — do not edit; change the source and run: npm run contract -- tablet top-app-bar -->
# Top app bar · شريط التطبيق العلوي — Tablet — code contract

> **Everything you need to build Top app bar on Tablet, and nothing else.** Read this file only. Generated from [`top-app-bar.md`](top-app-bar.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](top-app-bar.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Top app bar · شريط التطبيق العلوي |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter M3 `AppBar` (small) and `SliverAppBar.large` (large title), styled from semantic tokens |
| Import | `BwTopAppBar` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/top-app-bar/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`top-app-bar.md`](top-app-bar.md) @ `d7906e337d9d2180` |

## 1. What it is

The top app bar sits at the top of every screen. On Web it is the **app header**: where the user is, global search, notifications and the profile menu. On Tablet and Mobile it names the current **screen**, offers back (or the menu that opens the navigation drawer) and up to two screen actions. On Mobile it is the native bar of each OS.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 0 | `logo` | Web | Product logo, in a block as wide as the side navigation so both line up |
| 1 | `leading-button` | No | Back on inner screens; menu (opens the drawer) on top-level screens without a side navigation |
| 2 | `title` | Yes | The screen name; on Web the Breadcrumbs (module › section › current page) |
| 3 | `search` | No | Global search (Web, optional — off in the current product) |
| 4 | `actions` | No | Up to two screen actions as Icon buttons, the rest in an overflow Menu; on Web the global quick-add (+) |
| 5 | `notifications` | No | Inbox and notifications Icon buttons with Badges (Web) |
| 6 | `profile` | No | Avatar and name that open the account Menu (Web) |

**Options** (names and values are the props in §2):

- 4.1 `size` (Tablet and Mobile)
- 4.2 `leading-button`
- 4.3 `actions`

## 2. API

### BwTopAppBar
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `String` | | — | ✓ | |
| `size` | `BwTopAppBarSize` | `small` · `large` | `small` | | A4.1 |
| `leading` | `BwTopAppBarLeading` | `back` · `menu` · `none` | `none` | | A4.2 |
| `actions` | `List<BwAppBarAction>` | `icon`, `tooltip`, `onPressed` | `[]` | | A4.3 — more than 2 go to the overflow Menu |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| more than 2 `actions` | extra ones go to the overflow Menu (no warning) |
| `leading: menu` on iOS | allowed |

## 3. Dimensions

| Part | Property | Token | Flutter |
|---|---|---|---|
| container | height · fill · padding-inline · gap | `layout-height-app-bar` · `color-surface-default` · `spacing-md` · `spacing-md` | `toolbarHeight`, `backgroundColor`, `surfaceTintColor: transparent` |
| title (small) | style | `title-lg` | `titleTextStyle` |
| title (large) | style · padding | `heading-lg` · padding-inline `spacing-xl`, padding-bottom `spacing-xl` | `SliverAppBar.large` |
| leading · actions | | Icon button `transparent neutral md` | `BwIconButton` |
| scrolled | border-bottom | `color-border-subtle` | `scrolledUnderElevation: 0` + bottom border |

## 4. Tokens by part and state

Every value is a semantic token; there is no `top-app-bar.tokens.json`. Nested Icon button, Badge, Avatar and Search field carry their own.

| Part | Property | Default | Scrolled |
|---|---|---|---|
| container | fill | `color-surface-default` | same |
| container | border-bottom | none | `color-border-subtle` |
| title | colour | `color-text-default` | — |

Dark theme: same tokens.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `layout-height-app-bar` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Scrolled | content scrolls under the bar | border / material; large title shrinks into the bar | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.

## 6. RTL

| Part | In RTL |
|---|---|
| layout | Mirrors: leading button and title on the right, actions on the left |
| back icon | Mirrors (`arrow_back` / `chevron_left` point right) |
| other icons | Do not mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | `Semantics(header: true)` on the title; back button label "Back" / "رجوع" |
| Names | Every Icon button has a Tooltip / label |
| Notifications | "Notifications, 5 new" |
| Target size | ≥ platform minimum |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Tablet Top app bar matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Breadcrumbs (next), Tabs under the bar
- The App shell layout

### Approach

- **Base:** M3 `AppBar` (small) and `SliverAppBar.large` themed from tokens; overflow with `MenuAnchor` + Biowave Menu.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/top_app_bar/bw_top_app_bar.dart   new
4-tablet-components/test/top_app_bar_test.dart · goldens
4-tablet-components/lib/biowave_tablet.dart · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Scrolled state shows the border (and Large collapses to Small)
- [ ] RTL mirrors the layout and the back icon
- [ ] Every icon has an accessible name
- [ ] No raw values

Implement every item in B9, plus:
- [ ] Overflow Menu receives the third and later actions
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

1. Fill [C8 Execution log](top-app-bar.md#c8-execution-log-filled-by-the-executor) in `top-app-bar.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `top-app-bar.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
