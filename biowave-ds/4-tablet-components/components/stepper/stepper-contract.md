<!-- GENERATED from stepper.md @ b68a73e6fff31475 — do not edit; change the source and run: npm run contract -- tablet stepper -->
# Stepper · مؤشر الخطوات — Tablet — code contract

> **Everything you need to build Stepper on Tablet, and nothing else.** Read this file only. Generated from [`stepper.md`](stepper.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](stepper.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Stepper · مؤشر الخطوات |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Custom Flutter widget (Flutter `Stepper` is not used: its layout cannot match B2), styled from semantic tokens |
| Import | `BwStepper` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/stepper/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`stepper.md`](stepper.md) @ `b68a73e6fff31475` |

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

### BwStepper
| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `steps` | `List<BwStep>` (`label`, `description?`, `error?`) | 3–6 | — | ✓ | |
| `current` | `int` | | — | ✓ | |
| `axis` | `Axis` | horizontal · vertical | auto (orientation) | | |
| `onStepTapped` | `ValueChanged<int>?` | | — | | Completed steps only |

**Invalid combinations** (`assert` in debug):
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

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-strong` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-brand-default` | `context.bw.colors.backgroundBrandDefault` | #193351 | #607D9F |
| `color-background-error-default` | `context.bw.colors.backgroundErrorDefault` | #D42222 | #FF7676 |
| `color-background-transparent-default` | `context.bw.colors.backgroundTransparentDefault` | #54545400 | #54545400 |
| `color-border-bold` | `context.bw.colors.borderBold` | #707070 | #969696 |
| `color-border-brand` | `context.bw.colors.borderBrand` | #254471 | #607D9F |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-icon-on-brand` | `context.bw.colors.iconOnBrand` | #FFFFFF | #0A0A0A |
| `color-icon-on-error` | `context.bw.colors.iconOnError` | #FFFFFF | #0A0A0A |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-on-brand` | `context.bw.colors.textOnBrand` | #FFFFFF | #0A0A0A |
| `color-text-role-error` | `context.bw.colors.textRoleError` | #A31A1A | #FEA3A3 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `color-text-subtlest` | `context.bw.colors.textSubtlest` | #545454 | #BDBDBD |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `size-icon-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `size-icon-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 32 | 32 |
| `spacing-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |

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
| Role | Semantics per step: "label, step n of total, state" |
| Error | Description is the error message, linked to the step |
| Compact | — |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Tablet Stepper matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The step screens' content and buttons
- Progress (its own spec)

### Approach

- **Base:** custom `Row` / `Column` of step widgets with `Expanded` connectors; indicator `AnimatedContainer`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/stepper/bw_stepper.dart   new
4-tablet-components/test/stepper_test.dart · goldens
4-tablet-components/lib/biowave_tablet.dart   change: export
4-tablet-components/README.md · CHANGELOG.md
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

1. Fill [C8 Execution log](stepper.md#c8-execution-log-filled-by-the-executor) in `stepper.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `stepper.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
