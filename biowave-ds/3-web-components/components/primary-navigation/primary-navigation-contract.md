<!-- GENERATED from primary-navigation.md @ ccec1295296b3b51 — do not edit; change the source and run: npm run contract -- web primary-navigation -->
# Primary navigation · التنقل الرئيسي — Web — code contract

> **Everything you need to build Primary navigation on Web, and nothing else.** Read this file only. Generated from [`primary-navigation.md`](primary-navigation.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](primary-navigation.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Primary navigation · التنقل الرئيسي |
| Platform | Web · React + MUI |
| Built on | Custom on MUI `Drawer` (`variant="permanent"` for the side navigation, `"temporary"` for the modal drawer) + MUI `List` / `ListItemButton`, styled from semantic tokens |
| Import | `import { SideNavigation, NavigationDrawer } from '@biowave/web'` |
| Version | 1.0 · 2026-11-13 |
| Source code | `src/components/primary-navigation/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`primary-navigation.md`](primary-navigation.md) @ `ccec1295296b3b51` |

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

### SideNavigation
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `modules` | `NavModule[]` | `{ id, label, icon, locked?, items: NavItem[] }` | — | ✓ | Level 1 (module switcher) |
| `moduleId` | string | | — | ✓ | Current module |
| `onModuleChange` | `(id) => void` | | — | ✓ | |
| `items` | `NavItem[]` | `{ id, label, icon, href, count?, badge? }` — pages of the current module | — | ✓ | Level 2 |
| `selectedId` | string | | — | ✓ | Current page |
| `collapsed` | boolean | | `false` | | A4.1 `collapsed` |
| `onCollapsedChange` | `(collapsed) => void` | | — | | Collapse button |
| `variant` | enum | `permanent` · `modal` | `permanent` | | `modal` = the drawer form below the Desktop breakpoint |
| `open` · `onClose` | boolean · callback | | | with `modal` | Drawer open state |

`NavigationDrawer` is `SideNavigation variant="modal"` re-exported for clarity.

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| an item with both `count` and `badge` | warn; the badge wins |
| a `locked` module chosen | the switcher shows the upgrade message (not a warning) |
| `collapsed` with `variant="modal"` | ignored — the drawer is always open width |
| more than one item matching `selectedId` | warn; the first is selected |

## 3. Dimensions

```
├──────── layout-width-sidebar-start 248 (open) · layout-width-sidebar-start-collapsed 96 ────────┤
┌───────────────────────────────┐◯  fill color-surface-subtle · border-inline-end color-border-subtle · collapse-handle size-icon-lg, radius-full
│ [▣ Devices              ⇕]  │   module area: padding-block spacing-3xl · padding-inline spacing-md
│                              │   module-switcher: height size-control-height-lg · padding spacing-lg / spacing-xl · radius-md · border color-border-default
│ ▐⇄ All devices          12▌ │   item: height size-control-height-md · padding-inline spacing-xl · gap spacing-md · radius-md · icon size-icon-sm
│   ▦ Biometric terminal  12  │   list: padding-inline spacing-xl · gap spacing-md
│   ▦ Board controller    12  │   count: body-md · color-text-subtle
└───────────────────────────────┘
```

| Part | Property | Token |
|---|---|---|
| container | width | `layout-width-sidebar-start` · collapsed `layout-width-sidebar-start-collapsed` |
| container | fill · border | `color-surface-subtle` (the product's grey menu) · inline-end `border-width-default` `color-border-subtle` |
| collapse-handle | size · radius · fill · border · icon | `size-icon-lg` · `radius-full` · `color-surface-default` · `color-border-default` · `left_panel_close` / `left_panel_open` `size-icon-sm` (mirrors); centred on the inline-end border, `spacing-3xl` below the top |
| module area | padding-block · padding-inline | `spacing-3xl` · `spacing-md` |
| module-switcher | height · padding-block · padding-inline · gap · radius · fill · border | `size-control-height-lg` · `spacing-lg` · `spacing-xl` · `spacing-md` · `radius-md` · `color-surface-default` · `color-border-default`; module icon `size-icon-lg`, label `label-lg`, `unfold_more` `size-icon-sm` |
| list | padding-inline · gap | `spacing-xl` · `spacing-md` |
| item | height · padding-inline · gap · radius | `size-control-height-md` · `spacing-xl` · `spacing-md` · `radius-md` |
| icon | size | `size-icon-sm` (Material Symbols Rounded) |
| label | text style | `body-md` (default) · `label-lg` (selected — the heavier weight is the non-colour cue) |
| count | text style | `body-md` · `color-text-subtle`, at the inline end |
| badge | | Badge `Count`, `Ring=Off`, at the inline end (instead of `count`) |
| collapsed | item | width `size-control-height-lg`, icon only, centred; module switcher icon + `unfold_more`; Tooltip with the label |
| module Menu | | Biowave Menu, rows `size-control-height-xl`; locked modules end with `lock` `size-icon-sm` `color-icon-subtle` |
| drawer (modal) | width · radius · elevation · scrim | `layout-width-sidebar-start` · `radius-4xl` on the inline-end corners · `elevation-4` · `color-overlay-default` |

## 4. Tokens by part and state

Every value is a semantic token; there is no `primary-navigation.tokens.json`.

| Part | Property | Default | Hover | Pressed | Selected |
|---|---|---|---|---|---|
| container | fill | `color-surface-default` | — | — | — |
| item | fill | transparent | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` (hover `-hovered`, pressed `-pressed`) |
| item | icon | `color-icon-default` | — | — | `color-icon-role-brand` (rail and bar: filled glyph) |
| item | label | `color-text-subtle` | `color-text-default` | — | `color-text-role-brand` |
| count | text | `color-text-subtle` | — | — | `color-text-subtle` |
| divider · border | stroke | `color-border-subtle` | — | — | — |
| drawer | fill · scrim | `color-surface-raised` · `color-overlay-default` | — | — | — |

Focus: the item keeps the foundations focus ring (`color-border-focus`). Dark theme: same tokens.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `color-background-selected-default` | `var(--bw-color-background-selected-default)` · `cssVars.color.background.selected.default` | #E8ECF2 | #193351 |
| `color-background-transparent-hovered` | `var(--bw-color-background-transparent-hovered)` · `cssVars.color.background.transparent.hovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `var(--bw-color-background-transparent-pressed)` · `cssVars.color.background.transparent.pressed` | #54545433 | #54545499 |
| `color-border-default` | `var(--bw-color-border-default)` · `cssVars.color.border.default` | #DBDBDB | #404040 |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-border-subtle` | `var(--bw-color-border-subtle)` · `cssVars.color.border.subtle` | #EDEDED | #292929 |
| `color-icon-default` | `var(--bw-color-icon-default)` · `cssVars.color.icon.default` | #0A0A0A | #F7F7F7 |
| `color-icon-role-brand` | `var(--bw-color-icon-role-brand)` · `cssVars.color.icon.role.brand` | #132843 | #BEC9D9 |
| `color-icon-subtle` | `var(--bw-color-icon-subtle)` · `cssVars.color.icon.subtle` | #292929 | #DBDBDB |
| `color-overlay-default` | `var(--bw-color-overlay-default)` · `cssVars.color.overlay.default` | #54545499 | #545454B3 |
| `color-surface-default` | `var(--bw-color-surface-default)` · `cssVars.color.surface.default` | #FFFFFF | #141414 |
| `color-surface-raised` | `var(--bw-color-surface-raised)` · `cssVars.color.surface.raised` | #FFFFFF | #292929 |
| `color-surface-subtle` | `var(--bw-color-surface-subtle)` · `cssVars.color.surface.subtle` | #F7F7F7 | #292929 |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `color-text-role-brand` | `var(--bw-color-text-role-brand)` · `cssVars.color.text.role.brand` | #132843 | #BEC9D9 |
| `color-text-subtle` | `var(--bw-color-text-subtle)` · `cssVars.color.text.subtle` | #292929 | #DBDBDB |
| `elevation-4` | `var(--bw-elevation-4)` · `cssVars.elevation.4` | 0px 16px 48px -4px rgb(7 19 35 / 18%) | 0px 16px 48px -4px rgb(0 0 0 / 45%) |
| `layout-width-sidebar-start` | `var(--bw-layout-width-sidebar-start)` · `cssVars.layout.width.sidebar-start` |  |  |
| `layout-width-sidebar-start-collapsed` | `var(--bw-layout-width-sidebar-start-collapsed)` · `cssVars.layout.width.sidebar-start-collapsed` |  |  |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-lg` | `var(--bw-motion-duration-lg)` · `cssVars.motion.duration.lg` | 300 | 300 |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-emphasized-decelerate` | `var(--bw-motion-easing-emphasized-decelerate)` · `cssVars.motion.easing.emphasized-decelerate` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-4xl` | `var(--bw-radius-4xl)` · `cssVars.radius.4xl` | 24 | 24 |
| `radius-full` | `var(--bw-radius-full)` · `cssVars.radius.full` | 9999 | 9999 |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-lg` | `var(--bw-size-control-height-lg)` · `cssVars.size.control.height.lg` | 48 | 48 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-xl` | `var(--bw-size-control-height-xl)` · `cssVars.size.control.height.xl` | 56 | 56 |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `spacing-3xl` | `var(--bw-spacing-3xl)` · `cssVars.spacing.3xl` | 24 | 24 |
| `spacing-lg` | `var(--bw-spacing-lg)` · `cssVars.spacing.lg` | 12 | 12 |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xl` | `var(--bw-spacing-xl)` · `cssVars.spacing.xl` | 16 | 16 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover / Pressed | pointer / touch | item fill | `motion-duration-sm` | `motion-easing-standard` |
| Item → Selected | select | fill, icon glyph, label colour | `motion-duration-md` | `motion-easing-standard` |
| Open ↔ Collapsed (side navigation) | collapse button | width | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Drawer open / close | menu button / scrim, Esc, back | slide from the inline start, scrim fade | `motion-duration-lg` in · `motion-duration-md` out | `motion-easing-emphasized-decelerate` · `-accelerate` |

Reduced motion: all become `motion-duration-instant`.

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
| Landmark | `<nav aria-label="Main">` |
| Current | Selected item `aria-current="page"` |
| Module switcher | `<button aria-haspopup="menu">` named "Module: Devices"; locked modules `aria-disabled` with "locked" in the name |
| Collapsed | Each item keeps `aria-label` = label; Tooltip on hover and focus |
| Drawer | `role="dialog"` modal, focus trapped, Esc closes, focus returns to the menu button |
| Skip link | The App shell provides "Skip to content" before the navigation |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves through the items |
| Enter / Space | Opens the item; on the switcher, opens the module Menu |
| Esc | Closes the drawer |

## 8. Examples

See C3 for the structure; examples live in the docs page 03 Variations and 07 Platform.

## 9. How to build it

### Goal

The Web forms of Primary navigation matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Top app bar (its own spec) and the App shell layout
- Tabs, Breadcrumbs (next in the navigation family)

### Approach

- **Base:** MUI `Drawer` `variant` permanent / temporary; content: module switcher (Biowave Menu trigger) + MUI `List` with `ListItemButton` per page (Biowave styles); Biowave `Tooltip` around collapsed items; width from the layout tokens; the collapse handle is a round control positioned on the inline-end border.
- **Selection:** compare `selectedId` with item ids.
- **Responsive:** the App shell decides permanent vs modal (`useMediaQuery` on the Desktop breakpoint); this component only renders what it is told.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/primary-navigation/SideNavigation.tsx   new (SideNavigation, NavigationDrawer)
3-web-components/src/components/primary-navigation/SideNavigation.test.tsx
3-web-components/src/components/primary-navigation/index.ts
3-web-components/src/index.ts   change: export
3-web-components/README.md · CHANGELOG.md
```

## 10. Tests

- [ ] Light + dark · en + ar: every part uses the B2–B3 tokens
- [ ] Selected item: fill, filled icon and brand label; announced as current
- [ ] Badge text included in the accessible name
- [ ] RTL: the navigation sits at the inline start (right) and chevrons mirror
- [ ] Every invalid combination in B1 warns / asserts
- [ ] a11y: axe on the side navigation open, collapsed and as drawer
- [ ] No raw values

Implement every item in B9, plus:
- [ ] Selection survives a rebuild and RTL
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

1. Fill [C8 Execution log](primary-navigation.md#c8-execution-log-filled-by-the-executor) in `primary-navigation.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `primary-navigation.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
