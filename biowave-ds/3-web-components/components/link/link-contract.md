<!-- GENERATED from link.md @ 50cebc918fef769f — do not edit; change the source and run: npm run contract -- web link -->
#  — code contract

> **Everything you need to build Link on Web, and nothing else.** Read this file only. Generated from [`link.md`](link.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](link.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Link · رابط |
| Platform | Web · React + MUI |
| Built on | MUI `Link` (native `<a href>`), styled only from Biowave tokens; MUI underline, palette colours and typography are not used |
| Import | `import { Link } from '@biowave/web'` |
| Version | 1.0 · 2026-10-21 |
| Source code | `src/components/link/` (built) |
| Tokens | [`link.tokens.json`](link.tokens.json) |
| Source | [`link.md`](link.md) @ `50cebc918fef769f` |

## 1. What it is

### 4.2 Component tokens

The code token map must equal [`link.tokens.json`](link.tokens.json) (tests compare them).

| Collection | Variable | Modes → semantic token |
|---|---|---|
| Link / Size | height | lg: `size-control-height-lg` · md: `size-control-height-md` · sm: `size-control-height-sm` |
| Link / Size | padding-inline | lg: `spacing-control-padding-inline-lg` · md: `spacing-control-padding-inline-md` · sm: `spacing-control-padding-inline-sm` |
| Link / Size | padding-block | lg: `spacing-none` · md: `spacing-none` · sm: `spacing-none` |
| Link / Size | gap | lg: `spacing-control-gap-lg` · md: `spacing-control-gap-md` · sm: `spacing-control-gap-sm` |
| Link / Size | icon | lg: `size-icon-lg` · md: `size-icon-md` · sm: `size-icon-sm` |
| Link / Size | radius | lg: `radius-2xl` · md: `radius-2xl` · sm: `radius-2xl` |
| Link / Color | label/default | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · success: `color-text-role-success` · error: `color-text-role-error` · warning: `color-text-role-warning` · info: `color-text-role-info` · neutral: `color-text-subtle` · inverse: `color-text-inverse` |
| Link / Color | label/hovered | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · success: `color-text-role-success` · error: `color-text-role-error` · warning: `color-text-role-warning` · info: `color-text-role-info` · neutral: `color-text-subtle` · inverse: `color-text-inverse` |
| Link / Color | label/pressed | brand: `color-text-role-brand` · secondary: `color-text-role-secondary` · success: `color-text-role-success` · error: `color-text-role-error` · warning: `color-text-role-warning` · info: `color-text-role-info` · neutral: `color-text-default` · inverse: `color-text-inverse` |
| Link / Color | label/disabled | brand: `color-text-disabled` · secondary: `color-text-disabled` · success: `color-text-disabled` · error: `color-text-disabled` · warning: `color-text-disabled` · info: `color-text-disabled` · neutral: `color-text-disabled` · inverse: `color-text-disabled` |
| Link / Color | icon/default | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · success: `color-icon-role-success` · error: `color-icon-role-error` · warning: `color-icon-role-warning` · info: `color-icon-role-info` · neutral: `color-icon-subtle` · inverse: `color-icon-inverse` |
| Link / Color | icon/hovered | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · success: `color-icon-role-success` · error: `color-icon-role-error` · warning: `color-icon-role-warning` · info: `color-icon-role-info` · neutral: `color-icon-subtle` · inverse: `color-icon-inverse` |
| Link / Color | icon/pressed | brand: `color-icon-role-brand` · secondary: `color-icon-role-secondary` · success: `color-icon-role-success` · error: `color-icon-role-error` · warning: `color-icon-role-warning` · info: `color-icon-role-info` · neutral: `color-icon-default` · inverse: `color-icon-inverse` |
| Link / Color | icon/disabled | brand: `color-icon-disabled` · secondary: `color-icon-disabled` · success: `color-icon-disabled` · error: `color-icon-disabled` · warning: `color-icon-disabled` · info: `color-icon-disabled` · neutral: `color-icon-disabled` · inverse: `color-icon-disabled` |
| Link / Color | container | brand: `color-background-transparent-default` · secondary: `color-background-transparent-default` · success: `color-background-transparent-default` · error: `color-background-transparent-default` · warning: `color-background-transparent-default` · info: `color-background-transparent-default` · neutral: `color-background-transparent-default` · inverse: `color-background-transparent-default` |
| Link / Color | border | brand: `color-border-default` · secondary: `color-border-default` · success: `color-border-default` · error: `color-border-default` · warning: `color-border-default` · info: `color-border-default` · neutral: `color-border-default` · inverse: `color-border-default` |
| Link / Color | focus-ring | brand: `color-border-focus` · secondary: `color-border-focus` · success: `color-border-focus` · error: `color-border-focus` · warning: `color-border-focus` · info: `color-border-focus` · neutral: `color-border-focus` · inverse: `color-border-inverse` |

## 9. How to build it

### Goal

### Scope

### Approach

### Token gaps

### Files to create / change

## 10. Tests

## 11. Acceptance criteria (the Reviewer checks exactly these)

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

1. Fill [C8 Execution log](link.md#c8-execution-log-filled-by-the-executor) in `link.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `link.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
