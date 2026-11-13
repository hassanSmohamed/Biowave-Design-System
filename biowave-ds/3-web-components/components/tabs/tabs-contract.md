<!-- GENERATED from tabs.md @ ae420f3313f98037 — do not edit; change the source and run: npm run contract -- web tabs -->
# Tabs · علامات التبويب — Web — code contract

> **Everything you need to build Tabs on Web, and nothing else.** Read this file only. Generated from [`tabs.md`](tabs.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](tabs.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Tabs · علامات التبويب |
| Platform | Web · React + MUI |
| Built on | MUI `Tabs` + `Tab` (`variant="standard" | "scrollable"`), styled from semantic tokens; Secondary tabs are the same API with the chip look |
| Import | `import { Tabs, Tab } from '@biowave/web'` |
| Version | 1.0 · 2026-11-13 |
| Source code | `src/components/tabs/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`tabs.md`](tabs.md) @ `ae420f3313f98037` |

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

### Tabs
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `value` | `string` | a tab's `value` | — | ✓ | Selected tab |
| `onChange` | `(value: string) => void` | | — | ✓ | |
| `variant` | `'primary' \| 'secondary'` | | `'primary'` | | `variant` |
| `scrollable` | `boolean` | | `false` | | Scrolls with arrow buttons when tabs do not fit |
| `children` | `Tab[]` | 2–7 | — | ✓ | |

### Tab
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` · `label` | `string` | — | |
| `icon` | `IconName` | — | `icon` (all tabs or none) |
| `badgeCount` | `number` | — | `badge` (`max` 99) |
| `disabled` | `boolean` | `false` | |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `icon` on some tabs only | icons hidden on all |
| fewer than 2 tabs | renders, warns |

## 3. Dimensions

| Part | Property | Primary | Secondary |
|---|---|---|---|
| tab | height | `size-control-height-md` | `size-control-height-sm` |
| tab | padding-inline · gap (icon, label, badge) | `spacing-3xl` · `spacing-md` | `spacing-lg` · `spacing-md` |
| tab | radius | none | `radius-full` |
| container | gap between tabs | `spacing-xl` | `spacing-md` |
| label | text style | `label-lg` | `label-lg` |
| icon | size | `size-icon-md` | `size-icon-md` |
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

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-default` | `var(--bw-border-width-default)` · `cssVars.border.width.default` | 1 | 1 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `border-width-strong` | `var(--bw-border-width-strong)` · `cssVars.border.width.strong` | 2 | 2 |
| `color-background-neutral-default` | `var(--bw-color-background-neutral-default)` · `cssVars.color.background.neutral.default` | #EDEDED | #292929 |
| `color-background-selected-default` | `var(--bw-color-background-selected-default)` · `cssVars.color.background.selected.default` | #E8ECF2 | #193351 |
| `color-background-transparent-default` | `var(--bw-color-background-transparent-default)` · `cssVars.color.background.transparent.default` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `var(--bw-color-background-transparent-hovered)` · `cssVars.color.background.transparent.hovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `var(--bw-color-background-transparent-pressed)` · `cssVars.color.background.transparent.pressed` | #54545433 | #54545499 |
| `color-border-brand` | `var(--bw-color-border-brand)` · `cssVars.color.border.brand` | #254471 | #607D9F |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-border-subtle` | `var(--bw-color-border-subtle)` · `cssVars.color.border.subtle` | #EDEDED | #292929 |
| `color-icon-default` | `var(--bw-color-icon-default)` · `cssVars.color.icon.default` | #0A0A0A | #F7F7F7 |
| `color-icon-disabled` | `var(--bw-color-icon-disabled)` · `cssVars.color.icon.disabled` | #969696 | #707070 |
| `color-icon-role-brand` | `var(--bw-color-icon-role-brand)` · `cssVars.color.icon.role.brand` | #132843 | #BEC9D9 |
| `color-icon-subtle` | `var(--bw-color-icon-subtle)` · `cssVars.color.icon.subtle` | #292929 | #DBDBDB |
| `color-surface-default` | `var(--bw-color-surface-default)` · `cssVars.color.surface.default` | #FFFFFF | #141414 |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `var(--bw-color-text-disabled)` · `cssVars.color.text.disabled` | #969696 | #707070 |
| `color-text-role-brand` | `var(--bw-color-text-role-brand)` · `cssVars.color.text.role.brand` | #132843 | #BEC9D9 |
| `color-text-subtle` | `var(--bw-color-text-subtle)` · `cssVars.color.text.subtle` | #292929 | #DBDBDB |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-full` | `var(--bw-radius-full)` · `cssVars.radius.full` | 9999 | 9999 |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `spacing-3xl` | `var(--bw-spacing-3xl)` · `cssVars.spacing.3xl` | 24 | 24 |
| `spacing-lg` | `var(--bw-spacing-lg)` · `cssVars.spacing.lg` | 12 | 12 |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xl` | `var(--bw-spacing-xl)` · `cssVars.spacing.xl` | 16 | 16 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

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
| Role | `role="tablist"` / `role="tab"` with `aria-selected`, `aria-controls`; panel `role="tabpanel"` |
| Keyboard | Arrow keys move and select; Home / End; Tab moves into the panel |
| Target size | Tab height ≥ `target-min` |
| Badge | Included in the tab's label: "Logs, 3 new" |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Web Tabs matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The tab panels' content
- Pagination, Stepper (next in the navigation family)

### Approach

- **Base:** MUI `Tabs` / `Tab` with `TabIndicatorProps` from B2–B3 (Primary) or no indicator and a selected fill (Secondary); `variant="scrollable"` + `scrollButtons="auto"` when `scrollable`.
- **Badge:** Biowave `Badge` inside the label (`iconPosition` end).

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/tabs/Tabs.tsx · Tab.tsx · Tabs.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
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

1. Fill [C8 Execution log](tabs.md#c8-execution-log-filled-by-the-executor) in `tabs.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `tabs.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
