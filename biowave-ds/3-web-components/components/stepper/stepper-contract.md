<!-- GENERATED from stepper.md @ 0ec290fc30d74da2 — do not edit; change the source and run: npm run contract -- web stepper -->
# Stepper · مؤشر الخطوات — Web — code contract

> **Everything you need to build Stepper on Web, and nothing else.** Read this file only. Generated from [`stepper.md`](stepper.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](stepper.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Stepper · مؤشر الخطوات |
| Platform | Web · React + MUI |
| Built on | MUI `Stepper` + `Step` + `StepLabel` (`orientation`), with a custom `StepIcon` and `StepConnector` from semantic tokens |
| Import | `import { Stepper, Step } from '@biowave/web'` |
| Version | 1.0 · 2026-11-13 |
| Source code | `src/components/stepper/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`stepper.md`](stepper.md) @ `0ec290fc30d74da2` |

## 1. What it is

A stepper shows a flow broken into steps — "Device details › Network › Users › Review" — and where the user is in it. Done steps show a check, the current step is filled in the brand colour, and later steps are outlined. It does not replace the step's own content and buttons; it shows progress and, when allowed, lets the user go back to a finished step.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `indicator` | Yes | Circle with the step number, a check (done) or "!" (error) |
| 2 | `label` | Yes | The step's name |
| 3 | `description` | No | One short line under the label |
| 4 | `connector` | Yes | Line between steps; brand colour once the step before it is done |
| 6 | `progress` | Mobile compact | Linear Progress under "Step n of total" |

**Options** (names and values are the props in §2):

- 4.1 `orientation`
- 4.2 Step state

## 2. API

### Stepper
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `activeStep` | `number` | 0 … n − 1 | — | ✓ | Current step |
| `orientation` | `'horizontal' \| 'vertical'` | | `'horizontal'` | | |
| `children` | `Step[]` | 3–6 | — | ✓ | |
| `onStepClick` | `(index: number) => void` | | — | | Completed steps become links |

### Step
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | `label` |
| `description` | `string` | — | `description` |
| `error` | `string` | — | Error state; shown as the description |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| no current step / more than one | the first not-completed step is current |
| fewer than 2 steps | renders, warns |

## 3. Dimensions

| Part | Property | Token |
|---|---|---|
| indicator | size · radius | `size-icon-xl` · `radius-full` |
| indicator | number text · icon | `label-md` · `check` / `priority_high` `size-icon-sm` |
| label · description | text style | `label-lg` · `body-sm` |
| step (horizontal) | gap indicator–text · padding-inline | `spacing-md` · `spacing-md` |
| connector (horizontal) | thickness · min length · margin | `border-width-strong` · `spacing-3xl` · `spacing-md` each side |
| step (vertical) | gap indicator–text · gap between steps | `spacing-lg` · `spacing-md` (connector fills it) |
| connector (vertical) | thickness · margin | `border-width-strong` · `spacing-xs` above and below |

## 4. Tokens by part and state

Every value is a semantic token; there is no `stepper.tokens.json`.

| Part | Property | Upcoming | Current | Completed | Error |
|---|---|---|---|---|---|
| indicator | fill | `color-background-transparent-default` | `color-background-brand-default` | `color-background-brand-default` | `color-background-error-default` |
| indicator | border | `border-width-strong` `color-border-bold` | — | — | — |
| indicator | number · icon | `color-text-subtle` | `color-text-on-brand` | `color-icon-on-brand` | `color-icon-on-error` |
| label | colour · weight | `color-text-subtle` | `color-text-default` (`title-md`) | `color-text-default` | `color-text-role-error` |
| description | colour | `color-text-subtlest` | `color-text-subtlest` | `color-text-subtlest` | `color-text-role-error` |
| connector after | colour | `color-border-subtle` | `color-border-subtle` | `color-border-brand` | `color-border-subtle` |

Contrast (light): number `color-text-on-brand` on `color-background-brand-default` ≥ 12:1 · upcoming outline `color-border-bold` 4.95:1 · label `color-text-subtle` 14.55:1. Dark theme: same tokens.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-strong` | `var(--bw-border-width-strong)` · `cssVars.border.width.strong` | 2 | 2 |
| `color-background-brand-default` | `var(--bw-color-background-brand-default)` · `cssVars.color.background.brand.default` | #193351 | #607D9F |
| `color-background-error-default` | `var(--bw-color-background-error-default)` · `cssVars.color.background.error.default` | #D42222 | #FF7676 |
| `color-background-transparent-default` | `var(--bw-color-background-transparent-default)` · `cssVars.color.background.transparent.default` | #54545400 | #54545400 |
| `color-border-bold` | `var(--bw-color-border-bold)` · `cssVars.color.border.bold` | #707070 | #969696 |
| `color-border-brand` | `var(--bw-color-border-brand)` · `cssVars.color.border.brand` | #254471 | #607D9F |
| `color-border-subtle` | `var(--bw-color-border-subtle)` · `cssVars.color.border.subtle` | #EDEDED | #292929 |
| `color-icon-on-brand` | `var(--bw-color-icon-on-brand)` · `cssVars.color.icon.on.brand` | #FFFFFF | #0A0A0A |
| `color-icon-on-error` | `var(--bw-color-icon-on-error)` · `cssVars.color.icon.on.error` | #FFFFFF | #0A0A0A |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `color-text-on-brand` | `var(--bw-color-text-on-brand)` · `cssVars.color.text.on.brand` | #FFFFFF | #0A0A0A |
| `color-text-role-error` | `var(--bw-color-text-role-error)` · `cssVars.color.text.role.error` | #A31A1A | #FEA3A3 |
| `color-text-subtle` | `var(--bw-color-text-subtle)` · `cssVars.color.text.subtle` | #292929 | #DBDBDB |
| `color-text-subtlest` | `var(--bw-color-text-subtlest)` · `cssVars.color.text.subtlest` | #545454 | #BDBDBD |
| `motion-duration-md` | `var(--bw-motion-duration-md)` · `cssVars.motion.duration.md` | 200 | 200 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-full` | `var(--bw-radius-full)` · `cssVars.radius.full` | 9999 | 9999 |
| `size-icon-sm` | `var(--bw-size-icon-sm)` · `cssVars.size.icon.sm` | 16 | 16 |
| `size-icon-xl` | `var(--bw-size-icon-xl)` · `cssVars.size.icon.xl` | 32 | 32 |
| `spacing-3xl` | `var(--bw-spacing-3xl)` · `cssVars.spacing.3xl` | 24 | 24 |
| `spacing-lg` | `var(--bw-spacing-lg)` · `cssVars.spacing.lg` | 12 | 12 |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Current → Completed | step finished | fill stays, number → check; connector colours in | `motion-duration-md` | `motion-easing-standard` |
| Upcoming → Current | next step | outline → fill | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.

## 6. RTL

| Part | In RTL |
|---|---|
| order | Reverses: the first step is on the right (horizontal); vertical keeps top-to-bottom with the indicator on the right |
| icons · numbers | Do not mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | `<ol>` of steps; current `aria-current="step"`; completed steps are links when clickable |
| Error | Description is the error message, linked to the step |
| Compact | — |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Web Stepper matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The step screens' content and buttons
- Progress (its own spec)

### Approach

- **Base:** MUI `Stepper` (`alternativeLabel` off) with a custom `StepIcon` (B3 indicator) and `StepConnector` (B2 thickness, B3 colours); `orientation` prop.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/stepper/Stepper.tsx · Stepper.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Exactly one current step; completed steps show a check
- [ ] Error state shows "!" and the message
- [ ] RTL reverses the horizontal order
- [ ] No raw values

Implement every item in B9, plus:
- [ ] Tapping a completed step calls the handler; upcoming steps do not
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

1. Fill [C8 Execution log](stepper.md#c8-execution-log-filled-by-the-executor) in `stepper.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `stepper.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
