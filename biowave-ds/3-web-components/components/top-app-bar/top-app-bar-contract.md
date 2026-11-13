<!-- GENERATED from top-app-bar.md @ 79c4892cf7eb1275 — do not edit; change the source and run: npm run contract -- web top-app-bar -->
# Top app bar · شريط التطبيق العلوي — Web — code contract

> **Everything you need to build Top app bar on Web, and nothing else.** Read this file only. Generated from [`top-app-bar.md`](top-app-bar.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](top-app-bar.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Top app bar · شريط التطبيق العلوي |
| Platform | Web · React + MUI |
| Built on | Custom on MUI `AppBar` + `Toolbar` (position static inside the App shell), Biowave Search field, Icon button, Badge, Avatar, Menu |
| Import | `import { AppHeader } from '@biowave/web'` |
| Version | 1.0 · 2026-11-13 |
| Source code | `src/components/top-app-bar/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`top-app-bar.md`](top-app-bar.md) @ `79c4892cf7eb1275` |

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

### AppHeader
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `ReactNode` | text now, Breadcrumbs later | — | ✓ | `title` |
| `logo` | `ReactNode` | | Biowave logo | | `logo` |
| `search` | `ReactNode` | a Biowave `SearchField` | — | | optional |
| `onQuickAdd` | `() => void` | | — | | (+) Icon button |
| `inbox` · `notifications` | `{ count: number; onClick }` | | — | | Icon buttons with Badges (`max` 99 → "99+") |
| `user` | `{ name: string; avatar?: string; menu: ReactNode }` | | — | | `profile` |
| `onMenuClick` | `() => void` | | — | | Shows the menu button (narrow windows) |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `onMenuClick` on wide windows | the App shell hides the menu button |

## 3. Dimensions

| Part | Property | Token |
|---|---|---|
| container | height · fill · padding-inline-end · gap | `layout-height-app-bar` · `color-surface-subtle` · `spacing-xl` · `spacing-xl` |
| container | border-bottom | `border-width-default` `color-border-subtle` (always on Web) |
| logo block | width · padding-inline | `layout-width-sidebar-start` · `spacing-xl` (lines up with the side navigation) |
| title | | Breadcrumbs (slot); until built, `label-lg` text |
| actions | gap | `spacing-lg` inside the group; `spacing-3xl` between the group and the profile |
| quick-add · inbox · notifications | | Icon button `md`; Badge `Count` on inbox and notifications (99+) |
| profile | | Avatar `md` + name `label-lg` + `expand_more` `size-icon-lg` · gap `spacing-lg` |

## 4. Tokens by part and state

Every value is a semantic token; there is no `top-app-bar.tokens.json`. Nested Icon button, Badge, Avatar and Search field carry their own.

| Part | Property | Default | Scrolled |
|---|---|---|---|
| container | fill | `color-surface-default` | same |
| container | border-bottom | `color-border-subtle` | `color-border-subtle` |
| title | colour | `color-text-default` | — |

Dark theme: same tokens.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `color-border-subtle` | `var(--bw-color-border-subtle)` · `cssVars.color.border.subtle` | #EDEDED | #292929 |
| `color-surface-default` | `var(--bw-color-surface-default)` · `cssVars.color.surface.default` | #FFFFFF | #141414 |
| `color-surface-subtle` | `var(--bw-color-surface-subtle)` · `cssVars.color.surface.subtle` | #F7F7F7 | #292929 |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `layout-height-app-bar` | `var(--bw-layout-height-app-bar)` · `cssVars.layout.height.app-bar` |  |  |
| `layout-width-sidebar-start` | `var(--bw-layout-width-sidebar-start)` · `cssVars.layout.width.sidebar-start` |  |  |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `size-icon-lg` | `var(--bw-size-icon-lg)` · `cssVars.size.icon.lg` | 24 | 24 |
| `spacing-3xl` | `var(--bw-spacing-3xl)` · `cssVars.spacing.3xl` | 24 | 24 |
| `spacing-lg` | `var(--bw-spacing-lg)` · `cssVars.spacing.lg` | 12 | 12 |
| `spacing-xl` | `var(--bw-spacing-xl)` · `cssVars.spacing.xl` | 16 | 16 |

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
| Role | `<header>` (banner landmark); search `role="search"`; `/` focuses search |
| Names | Every Icon button has a Tooltip / label |
| Notifications | "Notifications, 5 new" |
| Target size | ≥ platform minimum |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Web Top app bar matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Breadcrumbs (next), Tabs under the bar
- The App shell layout

### Approach

- **Base:** MUI `AppBar position="static" elevation={0}` + `Toolbar`, Biowave Search field, Icon buttons, Badge, Avatar + Menu.
- **Shortcut:** `/` focuses the search unless focus is in a field.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/top-app-bar/AppHeader.tsx · AppHeader.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
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

1. Fill [C8 Execution log](top-app-bar.md#c8-execution-log-filled-by-the-executor) in `top-app-bar.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `top-app-bar.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
