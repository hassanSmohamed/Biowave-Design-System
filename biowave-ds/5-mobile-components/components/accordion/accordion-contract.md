<!-- GENERATED from accordion.md @ d39b1ba6e276c26d — do not edit; change the source and run: npm run contract -- mobile accordion -->
# Accordion · أكورديون / قائمة قابلة للطي — Mobile — code contract

> **Everything you need to build Accordion on Mobile, and nothing else.** Read this file only. Generated from [`accordion.md`](accordion.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](accordion.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Accordion · أكورديون / قائمة قابلة للطي |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter `ExpansionTile` / Cupertino disclosure with Biowave tokens |
| Import | `import 'package:biowave_mobile/biowave_mobile.dart';` |
| Version | 1.0 · 2026-11-15 |
| Source code | `lib/src/components/accordion/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`accordion.md`](accordion.md) @ `d39b1ba6e276c26d` |

## 1. What it is

An accordion is a vertically stacked set of interactive headings that each expand to reveal a section of associated content. Accordions let users scan high-level section titles and selectively expand the details they need, reducing vertical clutter in dense settings (settings panels, FAQs, complex forms, inspection checklists).

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `leading-icon` | No | Optional leading category icon paired with section topic |
| 2 | `subtitle` | No | Optional secondary hint or metadata label |
| 3 | `chevron` | Yes | Expand indicator icon (`expand_more` / `expand_less`) |
| 4 | `header` | Yes | Interactive trigger container toggling expanded state on tap/click |
| 5 | `divider` | Yes | Subtle horizontal rule separating header and open panel |
| 6 | `body` | Yes | Collapsible content container hosting arbitrary child widgets |

**Options** (names and values are the props in §2):

- 4.1 `expanded`
- 4.2 `leadingIcon` · `subtitle`

## 2. API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Section title (required) |
| `subtitle` | `string` | `undefined` | Optional secondary description |
| `leadingIcon` | `IconName` | `undefined` | Optional leading Material Symbols icon |
| `expanded` | `boolean` | `false` | Whether the accordion panel is open |
| `defaultExpanded` | `boolean` | `false` | Initial expansion state in uncontrolled mode |
| `onChange` | `(expanded: boolean) => void` | `undefined` | Callback fired when expanded state changes |
| `disabled` | `boolean` | `false` | When true, panel cannot be toggled |
| `children` | `ReactNode` / `Widget` | `undefined` | Content rendered inside the collapsible body |

## 3. Dimensions

| Part | Property | Token / Value |
|---|---|---|
| container | width | hug / fill container |
| container | border-radius | `radius-md` (8) |
| container | border-width | `border-width-default` (1) |
| header | min-height | `size-control-height-lg` (48) |
| header | padding-inline | `spacing-xl` (16) |
| header | padding-block | `spacing-xl` (16) |
| header | gap (icon, title) | `spacing-lg` (12) |
| header | gap (title, subtitle) | `spacing-xs` (4) |
| divider | border-width | `border-width-default` (1) |
| body | padding-inline | `spacing-xl` (16) |
| body | padding-block | `spacing-xl` (16) |
| body | gap | `spacing-lg` (12) |
| chevron | size | `size-icon-md` (20) |
| title | text style | title/md |
| subtitle | text style | body/sm |
| body content | text style | body/md |

## 4. Tokens by part and state

Every value is a semantic token; there is no `accordion.tokens.json`.

| Part | Property | Default | Hovered | Pressed | Disabled |
|---|---|---|---|---|---|
| container | fill | `color-surface-default` | same | same | `color-surface-subtle` |
| container | border | `color-border-default` | same | same | `color-border-disabled` |
| header | fill | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-transparent-default` |
| title | text colour | `color-text-default` | same | same | `color-text-disabled` |
| subtitle | text colour | `color-text-subtle` | same | same | `color-text-disabled` |
| chevron | icon colour | `color-icon-subtle` | same | same | `color-icon-subtle` |
| divider | border colour | `color-border-subtle` | same | same | `color-border-subtle` |
| body | fill | `color-surface-default` | same | same | `color-surface-subtle` |
| focus ring | border | `border-width-focus` · `color-border-focus` | — | — | — |

### 4.1 How to use each token on Mobile

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-transparent-default` | `context.bw.colors.backgroundTransparentDefault` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `context.bw.colors.backgroundTransparentHovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-default` | `context.bw.colors.borderDefault` | #DBDBDB | #404040 |
| `color-border-disabled` | `context.bw.colors.borderDisabled` | #DBDBDB | #404040 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-icon-subtle` | `context.bw.colors.iconSubtle` | #292929 | #DBDBDB |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-surface-subtle` | `context.bw.colors.surfaceSubtle` | #F7F7F7 | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-disabled` | `context.bw.colors.textDisabled` | #969696 | #707070 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `size-control-height-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `size-icon-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `spacing-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Collapsed ↔ Expanded | Tap / click | Height of body container | `motion-duration-md` | `motion-easing-standard` |
| Collapsed ↔ Expanded | Tap / click | Chevron rotation (0° ↔ 180°) | `motion-duration-sm` | `motion-easing-standard` |
| Default ↔ Hovered | Pointer enter | Header fill | `motion-duration-sm` | `motion-easing-standard` |

Reduced motion: Height and rotation snap immediately with 0 ms duration.

## 6. RTL

| Part | In RTL |
|---|---|
| Header order | Leading icon on right, title and subtitle text aligned right, chevron on far left |
| Chevron rotation | Maintains 180° vertical inversion; horizontal direction is neutral |
| Body alignment | Content aligns right according to RTL flow |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Trigger role | `<button>` or `role="button"` on header with `aria-expanded="true|false"` |
| Controls relation | `aria-controls="accordion-panel-{id}"` pointing to body panel id |
| Panel role | `role="region"` with `aria-labelledby="accordion-header-{id}"` |
| Keyboard | `Enter` / `Space` toggles; `ArrowDown` / `ArrowUp` move between accordion headers |
| Touch target | Header trigger height meets 48 dp touch target requirement |

## 8. Examples

See documentation page 03.

## 9. How to build it

### Goal

The Mobile `Accordion` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Full bespoke custom form layouts inside the body slot (apps provide slot children)

### Approach

- **Base:** Flutter `ExpansionTile` or custom animated box styled with Biowave tokens and 48 dp touch target on Mobile.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
5-mobile-components/lib/src/components/accordion/bw_accordion.dart · test/accordion_test.dart   new
5-mobile-components/lib/biowave_mobile.dart · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Light + dark themes render correct surface, border, and text tokens
- [ ] Clicking header toggles expanded state and fires `onChange`
- [ ] In collapsed state, body is hidden; in expanded state, body is visible
- [ ] Disabled accordion cannot be toggled via click or keyboard
- [ ] RTL reverses layout order (chevron on left, text aligned right)
- [ ] No raw values in style bindings

Implement every item in B9, plus:
- [ ] Light and Dark fills verified against Foundations semantic tokens
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

1. Fill [C8 Execution log](accordion.md#c8-execution-log-filled-by-the-executor) in `accordion.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `accordion.md` and in the Components table of `5-mobile-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
