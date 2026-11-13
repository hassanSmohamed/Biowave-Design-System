<!-- GENERATED from primary-navigation.md @ ee67ec15a9377fef — do not edit; change the source and run: npm run contract -- mobile primary-navigation -->
# Primary navigation · التنقل الرئيسي — Mobile — code contract

> **Everything you need to build Primary navigation on Mobile, and nothing else.** Read this file only. Generated from [`primary-navigation.md`](primary-navigation.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](primary-navigation.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Primary navigation · التنقل الرئيسي |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter adaptive (N-07): iOS → `CupertinoTabBar` (iOS and iPadOS 27 floating tab bar look); Android → M3 `NavigationBar` and `NavigationDrawer` |
| Import | `BwNavigationBar`, `BwNavigationDrawer` from `package:biowave_mobile/biowave_mobile.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/primary-navigation/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`primary-navigation.md`](primary-navigation.md) @ `ee67ec15a9377fef` |

## 1. What it is

Primary navigation is how people move between the main sections of Biowave — Dashboard, Attendance, Access control, Devices, Reports and the other modules. It is always there and always shows where the user is. One guideline, four forms that follow the screen: a **side navigation** on Web (open or collapsed to icons), a **navigation rail** on Tablet, a **navigation bar** at the bottom of Mobile (native on iOS and Android), and a **modal drawer** that holds the full list when the screen has no room for it.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `collapse-handle` | Web | Round button on the inline-end edge that collapses the side navigation to icons and opens it again |
| 2 | `module-switcher` | Web · drawer | The current module (Devices, Attendance, Access control…) with an unfold icon; opens the module Menu (locked modules show a lock) — level 1 (NV-03, NV-04) |
| 3 | `item` | Yes | One page of the current module (level 2): `icon` + `label`; the current one is selected |
| 4 | `badge` | No | Badge on an item for things to act on (rail and bar: on the icon) |
| 5 | `count` | No | Plain number at the end of a side-navigation item (how many records the page lists) |

**Options** (names and values are the props in §2):

- 4.1 `form` (follows the platform — not a free choice)
- 4.2 `badge` and `count` on an item
- 4.3 `module-switcher`

## 2. API

### BwNavigationBar
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `destinations` | `List<BwNavDestination>` | `label`, `icon`, `selectedIcon`, `badge` | — | ✓ | 3–5 |
| `selectedIndex` | `int` | | — | ✓ | |
| `onDestinationSelected` | `ValueChanged<int>` | | — | ✓ | |

The OS form comes from `Theme.of(context).platform` (N-07): iOS → `CupertinoTabBar`; Android → M3 `NavigationBar`. No `os` param.

### BwNavigationDrawer (Android)
Same API as Tablet; on iOS the extra sections go in a "More" destination instead (A8).

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| fewer than 3 or more than 5 `destinations` | assert; release renders the first 5 |
| `BwNavigationDrawer` shown on iOS | assert "use a More tab on iOS"; release shows it |

## 3. Dimensions

```
iOS — iOS and iPadOS 27 Tab bar                      Android — M3 Navigation bar
   ╭───────────────────────────────────╮             ┌────────────────────────────────────┐  height layout-height-app-bar
   │ (▦)   ▤⁵    ▥     ◆     ●        │  radius-full │ ▐ ▦ ▌   ▤⁵     ▥      ◆      ●    │  fill color-surface-default
   │ Home Requests Reports Position …   │  elevation-2 │ Home  Requests Reports Position Prof│  border-top color-border-subtle
   ╰───────────────────────────────────╯             └────────────────────────────────────┘
   inset spacing-xl · padding spacing-xs             indicator size-control-height-sm × (icon + spacing-xl each side)
```

| Part | Property | iOS | Android |
|---|---|---|---|
| container | shape · fill | floating capsule, `radius-full`, inset `spacing-xl` from the screen sides and above the home indicator, `color-surface-raised` + `elevation-2` (the OS adds its glass material) | full width, `color-surface-default`, top border `color-border-subtle`, height `layout-height-app-bar` |
| item | layout | icon over label, equal width, padding-block `spacing-xs` | icon over label, equal width |
| selected | | pill `color-background-selected-default` around icon + label (`radius-full`), icon filled `color-icon-role-brand`, label `color-text-role-brand` | indicator pill behind the icon (`size-control-height-sm` high, `radius-full`, `color-background-selected-default`), icon filled `color-icon-role-brand`, label `color-text-role-brand` |
| icon | | `size-icon-lg` `color-icon-default` | `size-icon-lg` `color-icon-default` |
| label | | `label-sm` `color-text-subtle` | `label-md` `color-text-subtle` |
| badge | | Badge on the icon's top-end corner | same |
| drawer | | — ("More" tab) | M3 `NavigationDrawer`, width `size-container-xxs`, as Tablet |

## 4. Tokens by part and state

Every value is a semantic token; there is no `primary-navigation.tokens.json`.

| Part | Property | Default | Hover | Pressed | Selected |
|---|---|---|---|---|---|
| container | fill | `color-surface-default` (iOS: `color-surface-raised`) | — | — | — |
| item | fill | transparent | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` (hover `-hovered`, pressed `-pressed`) |
| item | icon | `color-icon-default` | — | — | `color-icon-role-brand` (rail and bar: filled glyph) |
| item | label | `color-text-subtle` | `color-text-default` | — | `color-text-role-brand` |
| count | text | `color-text-subtle` | — | — | `color-text-subtle` |
| divider · border | stroke | `color-border-subtle` | — | — | — |
| drawer | fill · scrim | `color-surface-raised` · `color-overlay-default` | — | — | — |

Focus: the item keeps the foundations focus ring (`color-border-focus`). Dark theme: same tokens.

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-background-selected-default` | `context.bw.colors.backgroundSelectedDefault` | #E8ECF2 | #193351 |
| `color-background-transparent-hovered` | `context.bw.colors.backgroundTransparentHovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-icon-default` | `context.bw.colors.iconDefault` | #0A0A0A | #F7F7F7 |
| `color-icon-role-brand` | `context.bw.colors.iconRoleBrand` | #132843 | #BEC9D9 |
| `color-overlay-default` | `context.bw.colors.overlayDefault` | #54545499 | #545454B3 |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-role-brand` | `context.bw.colors.textRoleBrand` | #132843 | #BEC9D9 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `elevation-2` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 2px 16px 0px rgb(7 19 35 / 9%) | 0px 2px 16px 0px rgb(0 0 0 / 22%) |
| `layout-height-app-bar` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 300 | 300 |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-emphasized-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `size-container-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 320 | 320 |
| `size-control-height-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover / Pressed | pointer / touch | item fill | `motion-duration-sm` | `motion-easing-standard` |
| Item → Selected | select | fill, icon glyph, label colour | `motion-duration-md` | `motion-easing-standard` |
| Drawer open / close | menu button / scrim, Esc, back | slide from the inline start, scrim fade | `motion-duration-lg` in · `motion-duration-md` out | `motion-easing-emphasized-decelerate` · `-accelerate` |

Reduced motion: all become `motion-duration-instant`. iOS tab bar selection follows the OS.

## 6. RTL

| Part | In RTL |
|---|---|
| position | Side navigation, rail and drawer sit at the inline start (right); the drawer slides in from the right |
| item | Icon at the start (right), badge and chevron at the end (left) |
| icons | Directional glyphs (collapse handle, chevrons) mirror; page icons do not |
| collapse-handle | Sits on the inline-end border (the left edge of the menu in RTL) |
| bar (Mobile) | Order of destinations reverses (first destination on the right) |

## 7. Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Semantics | Each destination `Semantics(button: true, selected: …, label: label + badge text)`; the bar / rail is a `Semantics(container: true, explicitChildNodes: true)` |
| Target size | ≥ 48dp (`meetsGuideline`) |
| Drawer | Modal route, focus inside, back / Esc closes |
| Screen reader output | "Requests, 5 new, tab 2 of 5, selected" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / arrows | Move between destinations |
| Enter / Space | Select |

## 8. Examples

See C3 for the structure; examples live in the docs page 03 Variations and 07 Platform.

## 9. How to build it

### Goal

The Mobile forms of Primary navigation matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Top app bar (its own spec) and the App shell layout
- Tabs, Breadcrumbs (next in the navigation family)

### Approach

- **Base (N-07):** branch on `Theme.of(context).platform`: iOS → `CupertinoTabBar` themed with Biowave colours and `context.bw.text` (if the Flutter version still draws the pre-iOS 26 flat tab bar, keep it and report — decision O-07); Android → M3 `NavigationBar` themed from tokens.
- **Drawer (Android):** M3 `NavigationDrawer` as Tablet.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
5-mobile-components/lib/src/components/primary_navigation/bw_navigation_bar.dart · bw_navigation_drawer.dart   new
5-mobile-components/test/primary_navigation_test.dart · goldens
5-mobile-components/lib/biowave_mobile.dart   change: export
5-mobile-components/README.md · CHANGELOG.md
```

## 10. Tests

- [ ] Light + dark · en + ar: every part uses the B2–B3 tokens on iOS and Android
- [ ] Selected item: fill, filled icon and brand label; announced as current
- [ ] Badge text included in the accessible name
- [ ] RTL: the navigation sits at the inline start (right) and chevrons mirror
- [ ] Every invalid combination in B1 warns / asserts
- [ ] a11y: `meetsGuideline` tap target and contrast
- [ ] No raw values

Implement every item in B9, plus:
- [ ] Selection survives a rebuild and RTL
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

1. Fill [C8 Execution log](primary-navigation.md#c8-execution-log-filled-by-the-executor) in `primary-navigation.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `primary-navigation.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
