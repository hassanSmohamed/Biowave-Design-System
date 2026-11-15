#!/usr/bin/env python3
"""Generate Wave 9 specs (Alert, Snackbar, Empty state, Skeleton) across Web, Tablet, Mobile."""

import os

ROOT = '/Users/hassansaid/Downloads/Biowave Design System/biowave-ds'
SEC = {'web': '3-web-components', 'tablet': '4-tablet-components', 'mobile': '5-mobile-components'}
LBL = {'web': 'Web', 'tablet': 'Tablet', 'mobile': 'Mobile'}
DATE = '2026-11-14'

PLAT_META = {
    'web': {'platform': 'Web · React + MUI', 'src': 'src/components'},
    'tablet': {'platform': 'Tablet · Flutter + Material 3', 'src': 'lib/src/components'},
    'mobile': {'platform': 'Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07)', 'src': 'lib/src/components'},
}


def header(p, c):
    pm = PLAT_META[p]
    slug = c['slug']
    fig_suffix = ' (page Typography mode `Tablet`)' if p == 'tablet' else (' (page Typography mode `Mobile`)' if p == 'mobile' else '')
    return f"""# {c['name']} · {c['ar']} — {LBL[p]}

> **One file for {c['name']} on {LBL[p]}:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- {p} {slug}`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | {c['name']} · {c['ar']} |
| Summary | {c['summary']} |
| Summary (ar) | {c['summary_ar']} |
| Parts | {c['parts']} |
| Parts (ar) | {c['parts_ar']} |
| Platform | {c.get('platform', {}).get(p, pm['platform'])} |
| Built on | {c['built_on'][p]} |
| Import | `{c['import_line'][p]}` |
| Figma | **Biowave DS — {LBL[p]} Components** › `↳ {c['name']}`{fig_suffix} · [Part D](#d--figma-build) |
| Version | 1.0 · {DATE} |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `{pm['src']}/{slug}/` — not built yet (the Executor creates it) |
| Tokens | {c.get('tokens_note', 'No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly')} |
| Contracts | [`{slug}-contract.md`]({slug}-contract.md) · [`figma-{slug}-contract.md`](figma-{slug}-contract.md) — generated, never edited |
| Docs page | [`{slug}.html`]({slug}.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---
"""


def guidelines_block(p, c):
    slug = c['slug']
    return f"""## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/{slug}/{slug}.md#b--spec) · [Tablet](../../../4-tablet-components/components/{slug}/{slug}.md#b--spec) · [Mobile](../../../5-mobile-components/components/{slug}/{slug}.md#b--spec) |
| Figma | `↳ {c['name']}` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components**{c.get('figma_top_note', '')} |
| Version | 1.0 · {DATE} |

{c['a1_to_a7']}

{c['a8'][p]}

{c['a9_to_a10']}

---
"""


def d_head(p, c, mode, depends):
    slug = c['slug']
    return f"""## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-{slug}-contract.md`.

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the {LBL[p]} set in **Biowave DS — {LBL[p]} Components**.

| Field | Value |
|---|---|
| Component | {c['name']} |
| Figma file | **Biowave DS — {LBL[p]} Components** (`_sync/figma-files.json` › `{p}`) — never the Foundations file |
| Page / section | `↳ {c['name']}` › sections `{c['name']} — Component` and `{c['name']} — Documentation` |
| Mode | {mode} |
| Depends on | {depends} |
| Plan version | 1 · {DATE} |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file (`.Button _en` / `.Button _ar` or `Button`, `Icon Button`) — never detached, never redrawn.
"""


def tail_block(p, c, goal, scope_extra, approach, files, extra_tests, d2, d3, d4, d5, d6, d7, d8_notes, desc, d9_map, d10_extra):
    slug = c['slug']
    if p == 'web':
        checks = '`npm run test:web`, `npm run typecheck`, `npm run docs:check`'
    else:
        checks = f'`npm run test:{p}`, `flutter analyze`, `npm run docs:check`'

    return f"""---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `{slug}-contract.md`.

> Written by the Planner (Antigravity). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · {DATE} |

### C1 Goal

{goal}

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
{scope_extra}

### C3 Approach

{approach}

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
{files}
```

### C6 Tests

Implement every item in B9, plus:
{extra_tests}
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; {checks} pass
- [ ] AC-6 Exported from the package entry file; README status updated; nothing outside C5 changed

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | |
| Date | |
| Files changed | |

**Deviations from the plan or spec:**
- none

**Questions for the Planner:**
- none

---

{d_head(p, c, c['d_mode'][p], c['d_depends'][p])}
### D2 Component structure

```
{d2}
```

### D3 Layer tree and auto layout

```
{d3}
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
{d4}

### D5 Variants to generate

{d5}

### D6 States, interactions and motion

{d6}

### D7 RTL

{d7}

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `{c['name']} — Documentation`, frames `{c['name']} / 00 Component sheet` … `{c['name']} / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for {c['name']}:
{d8_notes}

Component description: "{desc}. Spec: {SEC[p]}/components/{slug}/{slug}.md".

### D9 Code Connect

- File: `{c['d9_file'][p]}`
- Mapping: {d9_map}. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `{c['name']}`, nested instances and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5
- [ ] F-AC-4 Zero raw values: fills, radius, padding, gaps, sizes, text and effects bound (lint 0)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances
{d10_extra}
---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component set `—` · docs section `—` · pages `—` |
| QA report | pending |

**Deviations:**
- none

**Questions for the Planner:**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| — | — | not reviewed | not reviewed |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — first version.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | {DATE} | Initial (Wave 9 Feedback brief, FB-01 … FB-07) | — | Planner (Antigravity) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | {DATE} | Initial | No | — |
"""


def write_spec(p, slug, content):
    out_dir = os.path.join(ROOT, SEC[p], 'components', slug)
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f'{slug}.md')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'wrote {SEC[p]}/components/{slug}/{slug}.md')


# ==============================================================================
# 1. ALERT
# ==============================================================================
ALERT_A1_A7 = """### A1 Overview

An alert is an inline status banner placed inside page, section, form or dialog content to surface important contextual information (`info`, `success`, `warning`, `error`, `neutral`). Unlike a snackbar, it stays in the layout until the underlying condition is resolved or the user explicitly dismisses it. Both single-line banners and multi-line titled alerts share one component.

### A2 Anatomy

```
Single-line:  ┌──────────────────────────────────────────────────────────┐
              │ [i] ① ②  Changes saved successfully.      [Action] [✕]   │
              └──────────────────────────────────────────────────────────┘
                         ④                                 ⑤        ⑥

Titled:       ┌──────────────────────────────────────────────────────────┐
              │ [!] ① ②  Connection issue              [Action] [✕]      │
              │          ③  Check your network settings and retry.       │
              └──────────────────────────────────────────────────────────┘
                         ④
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Tinted surface with a `1 px` role border and `8 px` rounded corners |
| 2 | `icon` | Yes | Leading status icon paired with role colour so status is never conveyed by colour alone |
| 3 | `title` | No | Optional short heading (`Show title`) when more than one line of context is needed |
| 4 | `description` | Yes | Clear statement of what happened and, for warnings/errors, what to do next |
| 5 | `action` | No | Optional single compact `Button` for immediate resolution (`Retry`, `View details`) |
| 6 | `close-button` | No | Optional `Icon button` (`✕`) when the banner is non-critical and user-dismissible |

### A3 Usage

**When to use**
- Form validation error summary anchored above form fields
- Contextual warnings, notices or status callouts inside a [Dialog](../dialog/dialog.md#a--guidelines), Side sheet or page section
- Persistent system or billing announcements (`neutral` for helpful tips, `warning` for upcoming limits)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Brief confirmation after an action (`Saved`, `Request sent`) | Snackbar |
| Blocking yes/no decision or destructive confirmation | [Dialog](../dialog/dialog.md#a--guidelines) |
| Full section or table has zero items | Empty state |
| Short status pill next to a row title | Badge / Tag |

### A4 Options

#### 4.1 `status`
| Value | Icon cue | Pick it when |
|---|---|---|
| `info` | Info circle | **Default.** Helpful explanation, policy note or neutral-positive system context |
| `success` | Check circle | Persistent confirmation that an account, sync or setup condition is healthy |
| `warning` | Warning / exclamation | Attention needed soon, partial failure or risk before a user submits |
| `error` | Error circle | Validation failure, failed action or blocked operation requiring user fix |
| `neutral` | Hint / neutral icon | General tip or announcement without positive/negative urgency |

#### 4.2 Layout & actions
| Option | Default | Pick it when |
|---|---|---|
| `showTitle` | `true` (on when title provided) | Turn **off** for concise single-line announcements; keep **on** when explaining cause + next step |
| `action` | off | One actionable link/button (`Retry`, `Update`, `Learn more`). Maximum 1 action button |
| `dismissible` | `true` for non-blocking | Adds trailing `✕` close button (`Icon button`). Omit for blocking `error` summaries that clear on fix |

**Combination rules**
- Maximum one `action` per Alert; never show two side-by-side buttons inside an inline banner (use [Dialog](../dialog/dialog.md#a--guidelines) instead)
- Never put an `action` that says "Dismiss" or "Close" — use `dismissible` (`✕`) for dismissal

### A5 States and behavior

| State | Trigger | What the user sees |
|---|---|---|
| Visible | Page load, state update or form submit error | Banner sits inline in layout, pushing content below without overlaying it |
| Dismissed | User activates `✕` close button | Banner exits smoothly; focus moves logically to the container or next element |
| Wrapped | Narrow viewport or longer Arabic copy | `description` wraps cleanly onto multiple lines; container grows vertically |

**Behavior rules**
- Text wraps freely and never truncates with ellipsis
- Arabic text is ~25% longer; allow at least 2–3 wrapped lines cleanly

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| title | Short summary in sentence case: "Unable to save changes" | 48 chars |
| description | Plain explanation + action to take | 140 chars (1–2 sentences) |
| action | Concise verb or verb phrase: "Retry", "Review" | 2 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Connection lost · Check your network settings and try again. · Retry | انقطع الاتصال · تحقّق من إعدادات الشبكة وأعد المحاولة. · إعادة المحاولة | Error 504 · Something went wrong on the server. · Click here |
| Shifts updated for May. | تم تحديث مناوبات شهر مايو. | Success! |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Pair icon, border, fill and clear text so status is clear without colour | Convey alert status with border or fill colour alone |
| Keep single-line alerts without a title for simple announcements | Force a redundant title above a 5-word sentence |
| Place error alerts next to or directly above the affected form | Stack 3+ full-width banners at the top of every screen |
| Omit close (`✕`) on critical unresolved blockers | Allow users to dismiss a blocking validation error without fixing it |
"""

ALERT_A8 = {
    'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Layout | Action button sits inline at trailing end beside `✕` on desktop; wraps below text only on narrow panels |
| Controls | Action uses `Button` (`sm`); close uses `Icon button` (`sm`) |
| Width | Fills parent container width (`100%`) |""",
    'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Layout | Inline action sits at trailing end in landscape cards and stacks cleanly below text in narrow portrait containers |
| Controls | Action and close `Icon button` use `48 × 48 dp` minimum touch targets |
| Legacy | Unified Biowave content design across Tablet and Web |""",
    'mobile': """### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Layout | Single column; `action` wraps below text when label exceeds one row so description never crushes into a narrow strip |
| Controls | Action and close `Icon button` enforce `48 × 48 dp` minimum touch targets |
| Legacy note | Legacy `Status Banners / Mobile` (approval status + approver avatar header strip) remains untouched as a domain header, not replaced by `Alert` (FB-03) |""",
}

ALERT_A9_A10 = """### A9 Accessibility (design)

- Use `role="status"` (`aria-live="polite"`) for `info`, `success` and `neutral`; use `role="alert"` (`aria-live="assertive"`) when dynamically injecting urgent `warning` or `error` banners
- Icon + border + concise wording ensure status is accessible to colour-blind users
- Close button requires a clear accessible label (`"Dismiss alert"` / `"إغلاق التنبيه"`)

### A10 Related components

- [Dialog](../dialog/dialog.md#a--guidelines) — hosts an inline Alert slot for blocking warnings
- [Button](../button/button.md#a--guidelines) — reused for the optional banner action
- [Icon button](../icon-button/icon-button.md#a--guidelines) — reused for the optional close control
- [Snackbar](../snackbar/snackbar.md#a--guidelines) — transient auto-dismissing feedback"""

ALERT_CFG = {
    'slug': 'alert',
    'name': 'Alert',
    'ar': 'تنبيه',
    'summary': 'An inline banner that communicates important contextual status (info, success, warning, error, neutral) inside a page, section, form or dialog until the condition changes or it is dismissed.',
    'summary_ar': 'شريط تنبيه مضمّن يعرض حالة سياقية مهمة (معلومات، نجاح، تحذير، خطأ، محايد) داخل الصفحة أو القسم أو النموذج أو نافذة الحوار حتى تتغير الحالة أو يُغلق.',
    'parts': 'Container · icon · title · description · action · close button',
    'parts_ar': 'الحاوية · الأيقونة · العنوان · الوصف · إجراء · زر الإغلاق',
    'built_on': {
        'web': 'MUI `Alert` (`severity`, `variant="outlined"` overridden with semantic tokens) with Biowave `Button` (`sm`) and `IconButton` (`sm`)',
        'tablet': 'Flutter custom `BwAlert` widget built with semantic tokens, reusing `BwButton` and `BwIconButton` (`48 × 48` touch target)',
        'mobile': 'Flutter custom `BwAlert` widget built with semantic tokens (FB-03: legacy `Status Banners / Mobile` stays untouched as request-status header), reusing `BwButton` and `BwIconButton`',
    },
    'import_line': {
        'web': "import { Alert } from '@biowave/web'",
        'tablet': "import 'package:biowave_tablet/biowave_tablet.dart'; // BwAlert",
        'mobile': "import 'package:biowave_mobile/biowave_mobile.dart'; // BwAlert",
    },
    'a1_to_a7': ALERT_A1_A7,
    'a8': ALERT_A8,
    'a9_to_a10': ALERT_A9_A10,
    'd_mode': {
        'web': '**Create new.** Legacy Foundations `Banner` (`3284:367`) and `Notification Toast` (`3567:1040`) stay untouched in Foundations.',
        'tablet': '**Create new** in **Biowave DS — Tablet Components** (unified Biowave design with `48 × 48` action targets).',
        'mobile': '**Create new** in **Biowave DS — Mobile Components** (`FB-03`: legacy Foundations `Status Banners / Mobile` stays untouched).',
    },
    'd_depends': {
        'web': '`.Button _en` / `.Button _ar`, `Icon Button`, Icons & Foundations library variables',
        'tablet': '`Button`, `Icon Button`, Icons & Foundations library variables',
        'mobile': '`Button`, `Icon Button`, Icons & Foundations library variables',
    },
    'd9_file': {
        'web': '3-web-components/src/components/alert/Alert.figma.tsx',
        'tablet': '4-tablet-components/lib/src/components/alert/bw_alert.figma.dart',
        'mobile': '5-mobile-components/lib/src/components/alert/bw_alert.figma.dart',
    },
}


def alert_part_b(p):
    is_web = (p == 'web')
    desc_style = '`body-md`' if is_web else '`body-lg`'
    target_note = '`size-control-height-sm` (32)' if is_web else '`48 × 48 dp` (`size-control-height-lg`)'
    if is_web:
        api = """#### Alert (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `status` | `'info' \\| 'success' \\| 'warning' \\| 'error' \\| 'neutral'` | `'info'` | | Visual tone and leading status icon (FB-01) |
| `title` | `string` | `—` | | Optional short heading; hides heading row when omitted (FB-02) |
| `children` | `ReactNode` | — | ✓ | Body message (`description`) |
| `action` | `{ label: string; onClick: () => void }` | `—` | | Optional single compact button |
| `onDismiss` | `() => void` | `—` | | When provided, renders trailing `✕` IconButton |
| `closeLabel` | `string` | `'Dismiss alert'` | | Accessible label for the close button |"""
        ex = """```tsx
// EN — titled warning with action and close
<Alert status="warning" title="Unsaved changes" action={{ label: 'Review', onClick }} onDismiss={onClose}>
  Some shift edits have not been published yet.
</Alert>

// AR — single-line success (direction comes from the provider)
<Alert status="success" onDismiss={onClose}>
  تم حفظ التغييرات بنجاح.
</Alert>
```"""
        b6_role = '`role="status"` (`aria-live="polite"`) for `info`/`success`/`neutral`; `role="alert"` (`aria-live="assertive"`) for dynamically injected `warning`/`error`'
    else:
        api = """#### BwAlert (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `status` | `BwAlertStatus` (`info · success · warning · error · neutral`) | `BwAlertStatus.info` | | Visual tone and leading icon (FB-01) |
| `title` | `String?` | `null` | | Optional short heading; hides heading row when `null` (FB-02) |
| `description` | `String` | — | ✓ | Body message |
| `actionLabel` | `String?` | `null` | | Label for optional action button (requires `onAction`) |
| `onAction` | `VoidCallback?` | `null` | | Action callback |
| `onDismiss` | `VoidCallback?` | `null` | | Renders trailing `✕` `BwIconButton` when non-null |
| `closeSemanticLabel` | `String?` | localised `"Dismiss alert"` | | Screen-reader label for close button |"""
        ex = """```dart
// EN
BwAlert(
  status: BwAlertStatus.error,
  title: 'Connection lost',
  description: 'Check your network settings and try again.',
  actionLabel: 'Retry',
  onAction: onRetry,
  onDismiss: onClose,
)

// AR (direction comes from Directionality / locale)
BwAlert(
  status: BwAlertStatus.info,
  description: 'يتم تطبيق التغييرات في المناوبة التالية.',
  onDismiss: onClose,
)
```"""
        b6_role = '`Semantics(liveRegion: true)` on dynamic banners; `Semantics(label: ...)` on icon-only close button; icon excluded (`ExcludeSemantics`)'

    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** (`{"console.warn" if is_web else "assert"}` in development):
| Combination | Fallback |
|---|---|
| `action` provided without handler | Ignores handlerless action button, warns |
| Empty `title` string `""` passed | Treats as omitted (`Show title = false`) |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| container | radius · border width | `radius-md` (8) · `border-width-default` (1) |
| container | padding-block · padding-inline | `spacing-lg` (12) · `spacing-xl` (16) |
| container | gap `icon`–`content` · `content`–actions | `spacing-lg` (12) · `spacing-xl` (16) |
| leading `icon` | size | `size-icon-lg` (24) |
| `content` | gap `title`–`description` | `spacing-xs` (4) |
| `title` | text style | `title-md` |
| `description` | text style | {desc_style} |
| `action` · `close-button` | target height · gap between them | {target_note} · `spacing-md` (8) |

### B3 Tokens by part and state

Every value is a semantic token; there is no `alert.tokens.json`.

| Part | `info` | `success` | `warning` | `error` | `neutral` |
|---|---|---|---|---|---|
| container fill | `color-background-info-subtlest` | `color-background-success-subtlest` | `color-background-warning-subtlest` | `color-background-error-subtlest` | `color-surface-subtle` |
| container border | `color-border-info` | `color-border-success` | `color-border-warning` | `color-border-error` | `color-border-default` |
| leading `icon` | `color-icon-role-info` | `color-icon-role-success` | `color-icon-role-warning` | `color-icon-role-error` | `color-icon-subtle` |
| `title` (FB-02) | `color-text-role-info` | `color-text-role-success` | `color-text-role-warning` | `color-text-role-error` | `color-text-default` |
| `description` (titled, FB-02) | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-default` |
| `description` (single-line, FB-02) | `color-text-role-info` | `color-text-role-success` | `color-text-role-warning` | `color-text-role-error` | `color-text-default` |

Contrast (Light / Dark): role text/icon on subtlest — `info` 7.36:1 / 9.21:1 · `success` 5.73:1 / 10.02:1 · `warning` 7.68:1 / 8.85:1 · `error` 6.95:1 / 8.58:1 · `neutral` 18.48:1 / 13.58:1; body `color-text-default` on subtlest ≥ 12.47:1 across all statuses; border on `color-surface-default` ≥ 3.24:1 Light / ≥ 6.64:1 Dark.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | Mount / alert shown | opacity `0 → 1`, subtle expand | `motion-duration-md` (200 ms) | `motion-easing-standard-decelerate` |
| Visible → Dismissed | Close activated | opacity `1 → 0`, collapse | `motion-duration-sm` (100 ms) | `motion-easing-standard-accelerate` |

Reduced motion: instant (`motion-duration-instant`).

### B5 RTL

| Part | In RTL |
|---|---|
| horizontal layout | Leading `icon` moves to right edge; `action` and `close-button` move to left edge |
| `title` · `description` | Right-aligned (`text-align: start`) |
| status icons | Info, check, warning and error exclamation do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | {b6_role} |
| Focus | Keyboard focus outline `border-width-focus` (`color-border-focus`) with `border-focus-offset` on action & close buttons |
| Target size | {target_note} |

### B7 Examples

{ex}

### B8 Figma

Structure, properties, Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: all 5 statuses (`info`, `success`, `warning`, `error`, `neutral`) bind B2–B3 semantic tokens
- [ ] Titled (`title` + `children`) vs single-line (`children` only) layout and colour rules (FB-02)
- [ ] `onDismiss` shows close button and triggers callback; `action` invokes callback
- [ ] RTL mirrors horizontal order without mirroring status icons
- [ ] Accessibility role/live-region and tap target / contrast checks pass
"""


# ==============================================================================
# 2. SNACKBAR
# ==============================================================================
SNACKBAR_A1_A7 = """### A1 Overview

A snackbar is a brief, non-blocking transient bar at `layer-toast` (1500) that confirms the result of an action ("Changes saved", "Device removed — Undo") at the bottom of the screen without interrupting workflow. Unlike an Alert, it floats above the UI and dismisses automatically after a few seconds (unless an interactive action requires more time).

### A2 Anatomy

```
┌────────────────────────────────────────────────────────┐
│ [✓] ①  Device settings updated.          [Undo]  [✕]   │
└────────────────────────────────────────────────────────┘
       ②  ③                                   ④     ⑤
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | High-contrast inverse floating surface (`color-surface-inverse`) with `Elevation/3` shadow |
| 2 | `icon` | No | Optional leading status/context icon (`Show icon`), tinted `color-icon-inverse` |
| 3 | `message` | Yes | Concise 1–2 line confirmation of what just happened |
| 4 | `action` | No | Optional single text action (`Undo`, `Retry`, `View`) — maximum 1 button |
| 5 | `close-button` | No | Optional `✕` dismiss button for manual dismissal |

### A3 Usage

**When to use**
- Confirm a background or save action (`Changes saved`, `Employee added`, `Export ready`)
- Offer a quick reversible undo (`Item archived` + `Undo`) or single retry (`Failed to sync` + `Retry`)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Persistent error or form summary that must stay visible | [Alert](../alert/alert.md#a--guidelines) |
| Blocking yes/no decision or destructive warning | [Dialog](../dialog/dialog.md#a--guidelines) |
| Multi-step feedback or empty view guidance | [Empty state](../empty-state/empty-state.md#a--guidelines) |

### A4 Options

#### 4.1 `action`
| Value | Looks like | Pick it when |
|---|---|---|
| `none` | `[icon] message [✕]` | **Default.** Simple status confirmation with no follow-up action |
| `withAction` | `[icon] message [Button] [✕]` | Single immediate follow-up (`Undo`, `Retry`, `View`) |

#### 4.2 Toggles
| Option | Default | Notes |
|---|---|---|
| `showIcon` | `false` (Web · Tablet · Mobile Android) · `true` (Mobile iOS toast) | Leading cue icon in `color-icon-inverse` |
| `dismissible` | `false` on short auto-dismiss; `true` when persistent or actionable | Trailing `✕` `Icon button` |

**Combination rules**
- Maximum one `action` button (`Undo`, `Retry`, `View`); never place two actions inside a Snackbar
- Never show more than one Snackbar at a time — queue or replace cleanly

### A5 States and behavior

| State | Trigger | What the user sees |
|---|---|---|
| Entering | User completes or triggers an action | Floats up / fades in above bottom navigation at `layer-toast` |
| Visible | Auto-timer running | Stays for 4–6 seconds when text-only; pauses timer on pointer hover or keyboard focus |
| Interactive timer | `action` is present | Persists ≥ 10 seconds (or until dismissed) so keyboard/screen-reader users can reach the action (WCAG 2.2.1) |
| Exiting | Timer ends, user activates action/dismiss | Fades/slides out cleanly |

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| message | Past-tense result + subject: "Shift schedule published." | 60 chars (1–2 lines) |
| action | Single verb: "Undo", "Retry", "View" | 1–2 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Employee added. | تم إضافة الموظف. | Success! The employee record has been successfully saved to the database. |
| Device removed. · Undo | تم حذف الجهاز. · تراجع | Deleted · Click to restore |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Use `color-surface-inverse` with `color-text-inverse` for 18:1+ contrast (FB-04) | Colour the bar solid green/blue with dark text (fails contrast) |
| Keep messages short enough to read within 4–5 seconds | Put multi-paragraph instructions or form errors inside a Snackbar |
| Give interactive snackbars extended / non-expiring focus time | Auto-hide an `Undo` action in 2 seconds before users can activate it |
| Show one snackbar at a time | Stack 3 snackbars vertically over screen content |
"""

SNACKBAR_A8 = {
    'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Placement | Floating bottom-end (`spacing-3xl` inset from viewport edge), `layer-toast` (1500) |
| Radius & type | `radius-md` (8), message `body-sm` |
| Width | Hugs content (`size-container-xs` 384 min → `size-container-sm` 480 max) |""",
    'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Placement | Bottom-start / bottom-end inset (`spacing-3xl`) in landscape, bottom-center in portrait |
| Radius & type | `radius-md` (8), message `body-md` |
| Touch target | `48 × 48 dp` minimum touch target on action and `✕` |""",
    'mobile': """### A8 Platform notes — Mobile

Mobile splits into two `OS` variants on the native/Biowave toast layer (FB-05):

| | `OS = Android` | `OS = iOS` |
|---|---|---|
| Pattern | Material 3 `SnackBar` pinned near bottom margin (`radius-md` 8 px) | Biowave floating toast (`radius-xl` 12 px, centered horizontal inset) |
| Icon | `showIcon` optional (default `false`) | `showIcon` on by default (`true`) |
| Tokens | Both use `color-surface-inverse`, `color-text-inverse`, `color-icon-inverse`, `Elevation/3`, `body-md` |""",
}

SNACKBAR_A9_A10 = """### A9 Accessibility (design)

- Announce non-urgent messages via `aria-live="polite"` (`role="status"` on Web / `SemanticsService.announce` on Flutter)
- Actionable snackbars (`Undo` / `Retry`) pause auto-dismiss on focus/hover and allow ≥ 10 s or explicit dismiss (WCAG 2.2.1 Timing Adjustable)
- High-contrast `color-surface-inverse` + `color-text-inverse` satisfies WCAG AAA (`18.42:1` Light / `19.8:1` Dark)

### A10 Related components

- [Alert](../alert/alert.md#a--guidelines) — persistent inline status inside pages, forms and dialogs
- [Dialog](../dialog/dialog.md#a--guidelines) — blocking confirmations with primary + secondary choices
- [Button](../button/button.md#a--guidelines) — text action styling
- [Icon button](../icon-button/icon-button.md#a--guidelines) — optional `✕` dismiss control"""

SNACKBAR_CFG = {
    'slug': 'snackbar',
    'name': 'Snackbar',
    'ar': 'شريط إشعار',
    'summary': 'A brief, high-contrast inverse bar at `layer-toast` (1500) that confirms an action or offers a single follow-up (Undo, Retry) without interrupting the user.',
    'summary_ar': 'شريط إشعار مؤقت عالي التباين يظهر أعلى المحتوى لتأكيد نتيجة إجراء أو إتاحة إجراء سريع واحد (تراجع، إعادة المحاولة) دون مقاطعة المستخدم.',
    'parts': 'Container · icon · message · action · close button',
    'parts_ar': 'الحاوية · الأيقونة · الرسالة · إجراء · زر الإغلاق',
    'built_on': {
        'web': 'MUI `Snackbar` + styled inverse surface (`color-surface-inverse`, `Elevation/3`), using Biowave `Button` (`text`) and `IconButton`',
        'tablet': 'Flutter M3 `ScaffoldMessenger.showSnackBar` (`SnackBarBehavior.floating`) themed with semantic inverse tokens, `48 × 48` action/close targets',
        'mobile': 'Flutter adaptive `BwSnackbar` (FB-05): Android → floating M3 `SnackBar` (`radius-md`); iOS → Biowave floating toast (`radius-xl`, leading icon on by default), both on `color-surface-inverse`',
    },
    'import_line': {
        'web': "import { Snackbar } from '@biowave/web'",
        'tablet': "import 'package:biowave_tablet/biowave_tablet.dart'; // BwSnackbar, showBwSnackbar",
        'mobile': "import 'package:biowave_mobile/biowave_mobile.dart'; // BwSnackbar, showBwSnackbar",
    },
    'figma_top_note': ' (Mobile has `OS = Android · iOS`, FB-05)',
    'a1_to_a7': SNACKBAR_A1_A7,
    'a8': SNACKBAR_A8,
    'a9_to_a10': SNACKBAR_A9_A10,
    'd_mode': {
        'web': '**Create new** in **Biowave DS — Web Components**.',
        'tablet': '**Create new** in **Biowave DS — Tablet Components**.',
        'mobile': '**Create new** in **Biowave DS — Mobile Components** (with `OS = Android · iOS`, FB-05). Legacy Foundations `Notification Bar / Mobile` (`4131:29007`, low-contrast solid fills) stays untouched.',
    },
    'd_depends': {
        'web': '`.Button _en` / `.Button _ar`, `Icon Button`, Icons & Foundations library variables',
        'tablet': '`Button`, `Icon Button`, Icons & Foundations library variables',
        'mobile': '`Button`, `Icon Button`, Icons & Foundations library variables',
    },
    'd9_file': {
        'web': '3-web-components/src/components/snackbar/Snackbar.figma.tsx',
        'tablet': '4-tablet-components/lib/src/components/snackbar/bw_snackbar.figma.dart',
        'mobile': '5-mobile-components/lib/src/components/snackbar/bw_snackbar.figma.dart',
    },
}


def snackbar_part_b(p):
    is_web = (p == 'web')
    is_mobile = (p == 'mobile')
    msg_style = '`body-sm`' if is_web else '`body-md`'
    radius_tok = '`radius-md` (8) on Android · `radius-xl` (12) on iOS (FB-05)' if is_mobile else '`radius-md` (8)'
    width_tok = 'inset `spacing-xl` (16) each side, max `size-container-sm` (480)' if is_mobile else 'min `size-container-xs` (384) · max `size-container-sm` (480)'
    if is_web:
        api = """#### Snackbar (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `open` | `boolean` | — | ✓ | Controls visibility |
| `message` | `string` | — | ✓ | 1–2 line status message |
| `icon` | `ReactNode` | `—` | | Optional leading icon (`color-icon-inverse`) |
| `action` | `{ label: string; onClick: () => void }` | `—` | | Optional single text action (`Undo`, `Retry`) |
| `onClose` | `() => void` | — | ✓ | Called on timeout, dismiss click or Esc |
| `autoHideDuration` | `number \\| null` | `5000` (min `10000` when `action` present) | | Auto-dismiss delay in ms (`null` disables) |"""
        ex = """```tsx
// EN — confirmation with Undo
<Snackbar open={open} message="Device settings updated." action={{ label: 'Undo', onClick: onUndo }} onClose={onClose} />

// AR — simple confirmation (direction comes from the provider)
<Snackbar open={open} message="تم إرسال الطلب." onClose={onClose} />
```"""
        b6_impl = 'Floating live container `role="status"` (`aria-live="polite"`); pauses timer on `onMouseEnter` / `onFocus`; Esc dismisses'
    else:
        os_note = '\n| `os` | `BwSnackbarStyle` (`adaptive · android · ios`) | `adaptive` | | Adaptive Android M3 bar vs iOS floating toast (FB-05) |' if is_mobile else ''
        api = f"""#### BwSnackbar / showBwSnackbar (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `message` | `String` | — | ✓ | 1–2 line feedback copy |
| `icon` | `IconData?` | `null` (`Icons.check_circle_outline` on iOS toast default) | | Optional leading icon (`color-icon-inverse`) |
| `actionLabel` | `String?` | `null` | | Single action button label (`Undo`, `Retry`) |
| `onAction` | `VoidCallback?` | `null` | | Callback when action pressed |
| `showCloseButton` | `bool` | `false` | | Renders trailing `✕` dismiss control |
| `duration` | `Duration` | `5s` (`10s` if `actionLabel != null`) | | Display duration before exit |{os_note}"""
        ex = """```dart
// EN
showBwSnackbar(
  context,
  message: 'Device settings updated.',
  actionLabel: 'Undo',
  onAction: onUndo,
);

// AR (direction comes from Directionality / locale)
showBwSnackbar(context, message: 'تم حفظ التغييرات.');
```"""
        b6_impl = '`Semantics(liveRegion: true)` announcement (`SemanticsService.announce`); `48 × 48 dp` minimum touch targets on action and dismiss'

    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** (`{"console.warn" if is_web else "assert"}` in development):
| Combination | Fallback |
|---|---|
| `actionLabel` without callback | Ignores action button, warns |
| `autoHideDuration` < 4000 ms with an `action` | Clamps to 10 000 ms (WCAG 2.2.1) and warns |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| `container` | width · min-height | {width_tok} · `size-control-height-lg` (48) |
| `container` | radius · elevation | {radius_tok} · `Elevation/3` |
| `container` | padding-inline · padding-block | `spacing-xl` (16) · `spacing-md` (8) |
| `container` | gap `icon`–`message` · `content`–actions | `spacing-lg` (12) · `spacing-xl` (16) |
| leading `icon` | size | `size-icon-md` (20) |
| `message` | text style | {msg_style} |
| `action` · `close-button` | gap between them | `spacing-xs` (4) |

### B3 Tokens by part and state

Every value is a semantic token; there is no `snackbar.tokens.json` (FB-04).

| Part | Property | Token |
|---|---|---|
| `container` | surface fill | `color-surface-inverse` |
| `container` | shadow · z-index | `Elevation/3` · `layer-toast` (1500) |
| `message` | text fill | `color-text-inverse` |
| leading `icon` · `close-button` | icon fill | `color-icon-inverse` |
| `action` | button variant · colour | Text `Button` · `inverse` (`color-text-inverse`) |

Contrast (Light / Dark): `color-text-inverse` and `color-icon-inverse` on `color-surface-inverse` — **18.42:1 Light / 19.8:1 Dark**.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | Trigger fired | translateY (`16 → 0`), opacity `0 → 1` | `motion-duration-md` (200 ms) | `motion-easing-emphasized-decelerate` |
| Visible → Hidden | Timeout / Esc / close | opacity `1 → 0`, translateY (`0 → 8`) | `motion-duration-sm` (100 ms) | `motion-easing-standard-accelerate` |

Reduced motion: opacity fade only (`motion-duration-sm` / instant), no vertical slide.

### B5 RTL

| Part | In RTL |
|---|---|
| horizontal row | Leading `icon` at right edge; `message` right-aligned; `action` and `close-button` at left edge |
| icons | Status check/warning icons do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | {b6_impl} |
| Focus | Optional action & close reachable by Tab without trapping focus inside the page |

### B7 Examples

{ex}

### B8 Figma

Structure, properties, Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: inverse surface/text/icon contrast tokens (`color-surface-inverse`, `color-text-inverse`)
- [ ] Single-line vs wrapped 2-line message; `action` callback fires and dismisses
- [ ] Auto-dismiss pauses on hover/focus and extends when `action` is present
- [ ] RTL horizontal mirroring works automatically
- [ ] Accessibility live-region announcement and touch/contrast checks pass
"""


# ==============================================================================
# 3. EMPTY STATE
# ==============================================================================
EMPTY_A1_A7 = """### A1 Overview

An empty state fills an empty page, section, card, side sheet or data table with clear context explaining why nothing appears yet and offering the user a constructive next step ("Add employee", "Clear filters"). Sizes `md` (full-page / section) and `sm` (compact inside Data table, cards or panels) cover all contexts without drawing custom empty frames (FB-06).

### A2 Anatomy

```
      (  [◆]  )         ① visual (illustration or icon badge)
    No matching results ② title
Try adjusting your filters or search terms. ③ description
 [ Clear filters ]  [ Add employee ]        ④ actions (primary + optional secondary)
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `visual` | No | Spot illustration (`md`) or calm icon in a `color-surface-subtle` circle (`sm` / toggleable) |
| 2 | `title` | Yes | Short noun/statement explaining the empty condition |
| 3 | `description` | No | Concise guidance telling the user why it is empty and what to do next |
| 4 | `actions` | No | Optional primary `Button` (`Filled`) and optional secondary `Button` (`Outlined` or `Text`) |

### A3 Usage

**When to use**
- First-use / zero-data screens (`No shifts created yet` + `Create shift`)
- Search or filter queries returning zero results (`No matching employees` + `Clear filters`)
- Inline empty regions inside Data table (`sm`), Cards (`sm`) or Side sheets (`sm`)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Content is currently fetching for > 300 ms | [Skeleton](../skeleton/skeleton.md#a--guidelines) |
| Failed API call blocking the page with retry action | [Alert](../alert/alert.md#a--guidelines) (`error`) + Empty state fallback if whole canvas failed |
| Confirmation before deleting data | [Dialog](../dialog/dialog.md#a--guidelines) |

### A4 Options

#### 4.1 `size` (FB-06)
| Value | Visual slot | Pick it when |
|---|---|---|
| `md` | Large illustration (`160 × 160` Web / `120 × 120` touch) or `48 px` icon badge | **Default.** Full page, tab canvas or primary module with no records yet |
| `sm` | Compact `40 px` icon badge (or hidden via `showVisual`) | Inside Data table body (`TableEmpty`), dashboard cards or Side sheets |

#### 4.2 Visual & action slots
| Option | Default | Notes |
|---|---|---|
| `showVisual` | `true` | Hide only when vertical space inside a tiny card/sheet cannot fit the badge |
| `primaryAction` | on when actionable | Highest-priority recovery/create CTA (`Filled` Button) |
| `secondaryAction` | off | Optional secondary recovery CTA (`Outlined` or `Text` Button, e.g. `Learn more`) |

**Combination rules**
- Maximum two actions (`primary` + `secondary`); never stack three or more buttons
- Never show `primaryAction` when the user has read-only permission with no next action

### A5 States and behavior

| State | Trigger | What the user sees |
|---|---|---|
| Default | Zero items in source | Centered visual, title, description and action buttons |
| Filtered empty | Active search/filter returns 0 rows | Helper copy suggests clearing filters with a `Clear filters` action |
| Narrow width | Panel or mobile viewport shrinks | Text wraps inside max container width; action pair wraps into a centered row or column |

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| title | What is missing, plain sentence case: "No employees yet", "No matching results" | 48 chars |
| description | Why it is empty + concrete next step | 120 chars (1–2 sentences) |
| action | Clear verb phrase: "Add employee", "Clear filters" | 2–3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| No matching results · Try adjusting your search or filter settings. · Clear filters | لا توجد نتائج مطابقة · جرّب تعديل كلمات البحث أو الفلاتر. · مسح الفلاتر | Empty · Nothing here · Back |
| No requests yet · New attendance requests will appear here. · New request | لا توجد طلبات بعد · ستظهر طلبات الحضور الجديدة هنا. · طلب جديد | Error 404 |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Explain both why the area is empty and what action solves it | Display a bare "No data" string with no explanation |
| Use `sm` size inside Data table and dashboard cards (FB-06) | Drop a huge `160 px` empty-state illustration inside a `240 px` table body |
| Match empty state tone to Biowave calm neutral styling | Use bright error red for a harmless zero-results search |
"""

EMPTY_A8 = {
    'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Visual (`md`) | Illustration frame up to `160 × 160` (`illustration.md`) or centered `size-icon-3xl` (48) badge inside `color-surface-subtle` circle |
| Actions | Inline centered row (`Primary` + `Secondary`), `Button` `md` (`sm` inside compact `sm` Data table slots) |""",
    'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Visual (`md`) | Illustration up to `120 × 120` (`illustration.md`) or `48 px` icon badge |
| Actions | `48 × 48 dp` minimum touch height (`Button` `md`/`lg`), centered row |""",
    'mobile': """### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Visual (`md`) | Illustration up to `120 × 120` (`illustration.md`) or `48 px` icon badge |
| Actions | Centered buttons wrap vertically to full width on narrow viewports with `48 × 48 dp` touch target |""",
}

EMPTY_A9_A10 = """### A9 Accessibility (design)

- Visual illustration/icon is decorative (`aria-hidden="true"` / `ExcludeSemantics`) unless it conveys unique information
- Title uses appropriate heading hierarchy (e.g. `<h2>` / `<h3>` depending on page section) so screen-reader landmarks make sense
- `color-text-default` (`19.8:1`), `color-text-subtle` (`14.55:1`) and `color-text-subtlest` (`7.57:1`) all exceed WCAG AA 4.5:1 in Light and Dark themes

### A10 Related components

- [Button](../button/button.md#a--guidelines) — primary and secondary call-to-action controls
- [Alert](../alert/alert.md#a--guidelines) — inline status/error banners rather than empty canvases
- [Skeleton](../skeleton/skeleton.md#a--guidelines) — shown before data arrives when loading takes > 300 ms
- Data table — hosts `Empty state` (`size="sm"`) in its zero-rows state (Wave 10)"""

EMPTY_CFG = {
    'slug': 'empty-state',
    'name': 'Empty state',
    'ar': 'حالة فراغ',
    'summary': 'Explains why a page, section, card or Data table has no items to show and offers a clear next action in `md` (page) or `sm` (compact) size.',
    'summary_ar': 'يعرض سبب خلو الصفحة أو القسم أو الجدول أو البطاقة من البيانات ويقترح الخطوة التالية بحجم قياسي (`md`) أو مدمج (`sm`).',
    'parts': 'Visual badge · title · description · primary action · secondary action',
    'parts_ar': 'الوسيط البصري · العنوان · الوصف · الإجراء الرئيسي · الإجراء الثانوي',
    'built_on': {
        'web': 'Custom Biowave React layout component composed from semantic tokens, `Box`/`Stack`, `Icon`, and Biowave `Button`',
        'tablet': 'Custom Flutter `BwEmptyState` widget composed from semantic tokens and Biowave `BwButton`',
        'mobile': 'Custom Flutter `BwEmptyState` widget composed from semantic tokens and Biowave `BwButton`',
    },
    'import_line': {
        'web': "import { EmptyState } from '@biowave/web'",
        'tablet': "import 'package:biowave_tablet/biowave_tablet.dart'; // BwEmptyState",
        'mobile': "import 'package:biowave_mobile/biowave_mobile.dart'; // BwEmptyState",
    },
    'a1_to_a7': EMPTY_A1_A7,
    'a8': EMPTY_A8,
    'a9_to_a10': EMPTY_A9_A10,
    'd_mode': {
        'web': '**Create new** in **Biowave DS — Web Components** (replaces ad-hoc Foundations `TableEmpty` / `Table/Empty` frames; Foundations frames stay untouched).',
        'tablet': '**Create new** in **Biowave DS — Tablet Components**.',
        'mobile': '**Create new** in **Biowave DS — Mobile Components**.',
    },
    'd_depends': {
        'web': '`.Button _en` / `.Button _ar`, Icons & Foundations library variables',
        'tablet': '`Button`, Icons & Foundations library variables',
        'mobile': '`Button`, Icons & Foundations library variables',
    },
    'd9_file': {
        'web': '3-web-components/src/components/empty-state/EmptyState.figma.tsx',
        'tablet': '4-tablet-components/lib/src/components/empty_state/bw_empty_state.figma.dart',
        'mobile': '5-mobile-components/lib/src/components/empty_state/bw_empty_state.figma.dart',
    },
}


def empty_part_b(p):
    is_web = (p == 'web')
    if is_web:
        api = """#### EmptyState (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `size` | `'md' \\| 'sm'` | `'md'` | | `md` page/section vs `sm` compact card/table (FB-06) |
| `visual` | `ReactNode \\| null` | default search icon badge | | Illustration or icon node; pass `null` to hide |
| `title` | `string` | — | ✓ | Primary heading |
| `description` | `string` | `—` | | Supporting explanation |
| `primaryAction` | `{ label: string; onClick: () => void }` | `—` | | Optional filled primary `Button` |
| `secondaryAction` | `{ label: string; onClick: () => void }` | `—` | | Optional outlined secondary `Button` |"""
        ex = """```tsx
// EN — compact inside a table
<EmptyState
  size="sm"
  title="No matching results"
  description="Try adjusting your filters or search terms."
  primaryAction={{ label: 'Clear filters', onClick: onReset }}
/>

// AR — full page (direction comes from the provider)
<EmptyState
  title="لا توجد بيانات بعد"
  description="ابدأ بإضافة أول موظف في هذا الفرع."
  primaryAction={{ label: 'إضافة موظف', onClick: onAdd }}
/>
```"""
        b6_impl = 'Root container `<section>` or `<div role="status">`; decorative `visual` marked `aria-hidden="true"`; `title` renders heading'
    else:
        api = """#### BwEmptyState (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `size` | `BwEmptyStateSize` (`md · sm`) | `BwEmptyStateSize.md` | | Page/section (`md`) vs compact table/card (`sm`, FB-06) |
| `visual` | `Widget?` | default subtle icon badge | | Custom illustration/icon widget |
| `showVisual` | `bool` | `true` | | Hides visual slot when `false` |
| `title` | `String` | — | ✓ | Primary heading |
| `description` | `String?` | `null` | | Supporting explanation |
| `primaryActionLabel` | `String?` | `null` | | Primary button label |
| `onPrimaryAction` | `VoidCallback?` | `null` | | Primary button callback |
| `secondaryActionLabel` | `String?` | `null` | | Secondary button label |
| `onSecondaryAction` | `VoidCallback?` | `null` | | Secondary button callback |"""
        ex = """```dart
// EN
BwEmptyState(
  size: BwEmptyStateSize.sm,
  title: 'No matching results',
  description: 'Try adjusting your filters or search terms.',
  primaryActionLabel: 'Clear filters',
  onPrimaryAction: onReset,
)

// AR (direction comes from Directionality / locale)
BwEmptyState(
  title: 'لا توجد بيانات بعد',
  description: 'ابدأ بإضافة أول موظف في هذا الفرع.',
  primaryActionLabel: 'إضافة موظف',
  onPrimaryAction: onAdd,
)
```"""
        b6_impl = '`visual` wrapped in `ExcludeSemantics`; `title` marked `Semantics(header: true)`; buttons enforce `48 × 48 dp` minimum target'

    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** (`{"console.warn" if is_web else "assert"}` in development):
| Combination | Fallback |
|---|---|
| `secondaryAction` without `primaryAction` | Promotes/renders single button cleanly or warns if mismatched hierarchy |
| Action label without handler | Ignores handlerless button and warns |

### B2 Dimensions

| Part | `size = md` (Page / Section) | `size = sm` (Compact) |
|---|---|---|
| container max width | `size-container-sm` (480) | `size-container-xs` (384) |
| container padding | `spacing-3xl` (24) | `spacing-xl` (16) |
| `visual` badge | icon `size-icon-3xl` (48) + `spacing-3xl` (24) pad (`radius-full`) | icon `size-icon-2xl` (40) + `spacing-xl` (16) pad (`radius-full`) |
| gap `visual`–text stack | `spacing-3xl` (24) | `spacing-xl` (16) |
| gap `title`–`description` | `spacing-md` (8) | `spacing-xs` (4) |
| `title` text style | `title-lg` | `title-md` |
| `description` text style | `body-lg` | `body-md` |
| gap text stack–`actions` | `spacing-2xl` (20) | `spacing-xl` (16) |
| gap between buttons | `spacing-md` (8) | `spacing-md` (8) |

### B3 Tokens by part and state

Every value is a semantic token; there is no `empty-state.tokens.json`.

| Part | Property | Token (`md` · `sm`) |
|---|---|---|
| `visual` badge background | fill | `color-surface-subtle` |
| `visual` icon | fill | `color-icon-subtlest` |
| `title` | text fill | `color-text-default` |
| `description` | text fill | `color-text-subtle` (`md`) · `color-text-subtlest` (`sm`) |
| `primaryAction` | Button | `Filled` · `brand` |
| `secondaryAction` | Button | `Outlined` · `neutral` |

Contrast (Light / Dark): `color-text-default` on `color-surface-default` — **19.8:1 / 17.2:1** · `color-text-subtle` — **14.55:1 / 13.31:1** · `color-text-subtlest` — **7.57:1 / 9.81:1**.

### B4 States and transitions

Static centered view. Entrance fade uses `motion-duration-md` (200 ms) `motion-easing-standard-decelerate`; instant under reduced motion.

### B5 RTL

| Part | In RTL |
|---|---|
| centered layout | Remains centered; secondary/primary button row flips right-to-left automatically |
| text alignment | Centered; mixed punctuation respects RTL direction |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | {b6_impl} |
| Actions | Keyboard focusable (`border-width-focus` `color-border-focus`), clear verb labels |

### B7 Examples

{ex}

### B8 Figma

Structure, properties, Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: both `md` and `sm` render B2 dimensions and B3 tokens
- [ ] `visual = null` / `showVisual = false` collapses visual slot cleanly
- [ ] Optional `description`, `primaryAction`, `secondaryAction` render only when passed
- [ ] RTL layout and Arabic copy wrap cleanly within container width
- [ ] Accessibility decorative visual hiding and button contrast/targets pass
"""


# ==============================================================================
# 4. SKELETON
# ==============================================================================
SKELETON_A1_A7 = """### A1 Overview

A skeleton is a low-contrast placeholder block that mirrors the approximate shape of text lines, avatars, cards or table rows while real data is loading (`aria-busy="true"`). It reassures users that the layout is stable without jumping once content arrives.

### A2 Anatomy

```
Line:     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   (radius-xs 4 px)

Circle:   ╭───╮                    (radius-full 9999 px)
          ╰───╯

Block:    ┌───────────────────────┐
          │ ░░░░░░░░░░░░░░░░░░░░░ │  (radius-md 8 px)
          └───────────────────────┘
```

| # | Part / Variant | Role |
|---|---|---|
| 1 | `line` | Placeholder bar matching a heading, body line or table cell height |
| 2 | `circle` | Circular placeholder matching an avatar, icon badge or status emblem |
| 3 | `block` | Rectangular placeholder matching a card, chart or media container |

### A3 Usage

**When to use**
- Initial page, card or Data table fetch taking longer than `300 ms` where the layout structure is already known

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Indeterminate action inside a Button or unknown duration | Progress (spinner / linear progress) |
| Data load completed with zero items | [Empty state](../empty-state/empty-state.md#a--guidelines) |
| Persistent warning about failed load | [Alert](../alert/alert.md#a--guidelines) |

### A4 Options

#### 4.1 `shape` (FB-07)
| Value | Radius | Pick it when |
|---|---|---|
| `line` | `radius-xs` (4) | **Default.** Replacing text strings (labels, headings, table cells) |
| `circle` | `radius-full` | Replacing circular avatars, emblems or icon badges |
| `block` | `radius-md` (8) or `radius-2xl` (16) | Replacing cards, thumbnails, banners or multi-row panels |

**Combination rules**
- Match placeholder shape and spacing tightly to the real component to avoid layout shift (CLS) when data swaps in
- Combine `line`, `circle` and `block` inside page/table/card loading compositions rather than creating dozens of rigid one-off skeleton sets

### A5 States and behavior

| State | Trigger | What the user sees |
|---|---|---|
| Animating | Standard motion preference | Gentle pulse/wave between `color-background-base-subtle` and `color-background-base-subtlest` |
| Static (reduced motion) | Reduced motion active | Static fill in `color-background-base-subtle` without shimmer movement |
| Resolved | Real data ready | Container `aria-busy` clears and real content replaces the skeleton |

**Behavior rules**
- Do not show skeletons for fast responses under `300 ms` (avoids distracting flash)
- Skeleton blocks never receive keyboard focus or interactive hover states

### A6 Content

Skeleton has no text strings or user-facing labels. Provide an accessible loading announcement (`"Loading…"` / `"جارٍ التحميل…"`) on the parent loading region (`aria-busy="true"`).

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Compose `line` + `circle` + `block` so loading previews match real layout proportions | Flash skeletons for < 200 ms instant fetches |
| Disable shimmer motion cleanly under `prefers-reduced-motion` | Animate bright white flashing bars in Dark theme |
| Reuse existing `color-background-base-subtle` / `subtlest` tokens (FB-07) | Hardcode raw grey hex fills per page |
"""

SKELETON_A8 = {
    'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Reduced motion | `@media (prefers-reduced-motion: reduce)` switches shimmer/pulse animation to static `color-background-base-subtle` |
| Width & height | Accepts CSS tokens/values; defaults fit text lines (`16 px`) and table rows cleanly |""",
    'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Reduced motion | Respects `MediaQuery.disableAnimations` (`animationDuration = Duration.zero`, static fill) |
| Layout | Composed in grid rows and cards using semantic spacing tokens |""",
    'mobile': """### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Reduced motion | Respects `MediaQuery.disableAnimations` (static `color-background-base-subtle` fill without wave motion) |
| Layout | Composed inside mobile list rows, cards and detail headers |""",
}

SKELETON_A9_A10 = """### A9 Accessibility (design)

- Individual `Skeleton` primitives are decorative (`aria-hidden="true"` / `ExcludeSemantics`)
- The parent loading region carries `aria-busy="true"` (Web) or a single `"Loading"` semantic label (Flutter) so screen readers do not announce dozens of blank shapes

### A10 Related components

- [Empty state](../empty-state/empty-state.md#a--guidelines) — shown once loading finishes with zero items
- [Alert](../alert/alert.md#a--guidelines) — shown when the fetch fails
- Data table — uses `Skeleton` primitives in its `loading` state (Wave 10)"""

SKELETON_CFG = {
    'slug': 'skeleton',
    'name': 'Skeleton',
    'ar': 'هيكل التحميل',
    'summary': 'Low-contrast animated placeholder (`line`, `circle`, `block`) reusing existing subtle background tokens to preview layout while content loads.',
    'summary_ar': 'عنصر نائب منخفض التباين (`line`، `circle`، `block`) يمهّد شكل المحتوى أثناء التحميل مع دعم تقليل الحركة.',
    'parts': 'Line · circle · block',
    'parts_ar': 'سطر · دائرة · كتلة',
    'built_on': {
        'web': 'MUI `Skeleton` (`variant="text" | "circular" | "rectangular" | "rounded"`) themed with existing semantic tokens (FB-07)',
        'tablet': 'Custom Flutter `BwSkeleton` shimmer/pulse widget driven by a single `AnimationController` and semantic tokens (FB-07)',
        'mobile': 'Custom Flutter `BwSkeleton` shimmer/pulse widget driven by a single `AnimationController` and semantic tokens (FB-07)',
    },
    'import_line': {
        'web': "import { Skeleton } from '@biowave/web'",
        'tablet': "import 'package:biowave_tablet/biowave_tablet.dart'; // BwSkeleton",
        'mobile': "import 'package:biowave_mobile/biowave_mobile.dart'; // BwSkeleton",
    },
    'a1_to_a7': SKELETON_A1_A7,
    'a8': SKELETON_A8,
    'a9_to_a10': SKELETON_A9_A10,
    'd_mode': {
        'web': '**Create new** in **Biowave DS — Web Components** (replaces ad-hoc Foundations `TableLoading` frames; Foundations stays untouched).',
        'tablet': '**Create new** in **Biowave DS — Tablet Components**.',
        'mobile': '**Create new** in **Biowave DS — Mobile Components**.',
    },
    'd_depends': {
        'web': 'Foundations library variables only',
        'tablet': 'Foundations library variables only',
        'mobile': 'Foundations library variables only',
    },
    'd9_file': {
        'web': '3-web-components/src/components/skeleton/Skeleton.figma.tsx',
        'tablet': '4-tablet-components/lib/src/components/skeleton/bw_skeleton.figma.dart',
        'mobile': '5-mobile-components/lib/src/components/skeleton/bw_skeleton.figma.dart',
    },
}


def skeleton_part_b(p):
    is_web = (p == 'web')
    if is_web:
        api = """#### Skeleton (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `shape` | `'line' \\| 'circle' \\| 'block'` | `'line'` | | Geometric placeholder shape (FB-07) |
| `width` | `number \\| string` | `'100%'` (`line`/`block`) · `40` (`circle`) | | Explicit width matching target content |
| `height` | `number \\| string` | `16` (`line`) · `40` (`circle`) · `112` (`block`) | | Explicit height matching target line/media |
| `animation` | `'pulse' \\| 'wave' \\| false` | `'wave'` | | Disabled cleanly when `prefers-reduced-motion` matches |"""
        ex = """```tsx
// EN / AR — language-neutral placeholder
<Stack spacing={1.5} aria-busy="true" aria-label="Loading card">
  <Skeleton shape="circle" width={40} height={40} />
  <Skeleton shape="line" width="75%" />
  <Skeleton shape="block" height={120} />
</Stack>
```"""
        b6_impl = 'Primitives render `aria-hidden="true"` `tabIndex={-1}`; wrapping loading container uses `aria-busy="true"`'
    else:
        api = """#### BwSkeleton (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `shape` | `BwSkeletonShape` (`line · circle · block`) | `BwSkeletonShape.line` | | Geometric placeholder shape (FB-07) |
| `width` | `double?` | `double.infinity` (`line`/`block`) · `40` (`circle`) | | Width in logical pixels |
| `height` | `double?` | `16` (`line`) · `40` (`circle`) · `112` (`block`) | | Height in logical pixels |
| `animate` | `bool` | `true` | | Static when `false` or `MediaQuery.disableAnimations` is true |"""
        ex = """```dart
Semantics(
  label: 'Loading',
  child: Column(
    children: const [
      BwSkeleton(shape: BwSkeletonShape.circle, width: 40, height: 40),
      SizedBox(height: 12),
      BwSkeleton(shape: BwSkeletonShape.line, width: 240),
      SizedBox(height: 12),
      BwSkeleton(shape: BwSkeletonShape.block, height: 112),
    ],
  ),
)
```"""
        b6_impl = 'Each `BwSkeleton` uses `ExcludeSemantics`; parent loading block provides a single localised `Semantics(label: ...)`'

    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** (`{"console.warn" if is_web else "assert"}` in development):
| Combination | Fallback |
|---|---|
| Negative `width` or `height` | Clamps to `>= 0`, warns |
| `shape = 'circle'` with unequal `width` and `height` | Uses `width` for both axes to keep circle round, warns |

### B2 Dimensions

| Shape | Radius token | Default sample size in Figma |
|---|---|---|
| `line` | `radius-xs` (4) | `width`: `size-container-xs` (384) · `height`: `spacing-xl` (16) |
| `circle` | `radius-full` (9999) | `width` = `height`: `size-control-height-md` (40) |
| `block` | `radius-md` (8) | `width`: `size-container-xxs` (320) · vertical padding `2 × size-control-height-xl` (112) |

### B3 Tokens by part and state

Reuses existing Foundations semantic tokens (FB-07); there is no `skeleton.tokens.json`.

| Property | Token | Light / Dark behaviour |
|---|---|---|
| base fill | `color-background-base-subtle` | `neutral.100` Light / `neutral.800` Dark |
| shimmer highlight peak | `color-background-base-subtlest` | `neutral.50` Light / `neutral.900` Dark |

Contrast note: Skeleton is a purely decorative non-text loading placeholder (`aria-hidden`) excluded from text contrast ratios.

### B4 States and transitions

| State | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Shimmer / pulse | Mounted while loading | background gradient / opacity sweep | `motion-duration-progress` (1000 ms loop) | `motion-easing-linear` |
| Reduced motion | `prefers-reduced-motion` / `disableAnimations` | static `color-background-base-subtle` fill | `motion-duration-instant` | — |

### B5 RTL

| Part | In RTL |
|---|---|
| `line` / `circle` / `block` | Shapes are symmetrical; directional shimmer wave (when used) sweeps right-to-left in RTL |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | {b6_impl} |
| Focus | Non-focusable, non-interactive |

### B7 Examples

{ex}

### B8 Figma

Structure, properties, Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark: binds `color-background-base-subtle` / `subtlest` tokens; no raw hex
- [ ] All 3 shapes (`line`, `circle`, `block`) render expected corner radii (`radius-xs`, `radius-full`, `radius-md`)
- [ ] Unequal circle dims fallback cleanly; reduced motion renders static fill
- [ ] Decorative `aria-hidden` / `ExcludeSemantics` verified
"""


# ==============================================================================
# Build scripts & per-component specs
# ==============================================================================
def build_alert(p):
    files = (
        '3-web-components/src/components/alert/Alert.tsx · Alert.test.tsx · index.ts   new\n'
        '3-web-components/src/index.ts · README.md · CHANGELOG.md   change'
        if p == 'web' else
        f'{SEC[p]}/lib/src/components/alert/bw_alert.dart · test/alert_test.dart   new\n'
        f'{SEC[p]}/lib/biowave_{p}.dart · README.md · CHANGELOG.md   change'
    )
    approach = (
        '- **Base:** MUI `Alert` (`severity`, `variant="outlined"`) styled cleanly from B2–B3 semantic tokens, slotting Biowave `Button` (`sm`) and `IconButton` (`sm`).'
        if p == 'web' else
        '- **Base:** Custom `BwAlert` Flutter `Container` + `Row`/`Wrap` using semantic token decoration (`radius-md`, `border-width-default`), reusing `BwButton` and `BwIconButton`.'
    )
    d2 = """❖ Alert                           ← set: Status = Info · Success · Warning · Error · Neutral × Language = EN · AR
  ├─ icon                         ◇ Material Symbols instance (rounded)
  ├─ content                      ↕ title + description
  ├─ action                       ◇ instance .Button _en / _ar (Web) or Button (Tablet/Mobile)
  └─ close-button                 ◇ instance Icon Button"""
    d3 = """Alert                     ↔ horizontal · gap spacing/lg · pad-block spacing/lg · pad-inline spacing/xl
│                           radius/md · border/width/default · stroke color/border/{status} · fill B3
├── icon                  ◇ Icon · size size/icon/lg · fill color/icon/role/{status}
├── content               ↕ vertical (fill) · gap spacing/xs
│   ├── title             T title/md · fill color/text/role/{status} · BOOLEAN `Show title` · TEXT `Title`
│   └── description       T body/md (Web) or body/lg (Tablet/Mobile) · fill color/text/default · TEXT `Description`
├── action                ◇ Button (sm Web / touch target Tablet & Mobile) · BOOLEAN `Action`
└── close-button          ◇ Icon Button · BOOLEAN `Close button`"""
    d4 = """| `Status` | VARIANT | `Info` · `Success` · `Warning` · `Error` · `Neutral` | `Info` | `status` | `'info'` … `'neutral'` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Heads up` / `تنبيه` | `title` | |
| `Description` | TEXT | | message copy | `children` / `description` | |
| `Show title` | BOOLEAN | | `true` | `title` present | |
| `Action` | BOOLEAN | | `true` | `action` present | |
| `Close button` | BOOLEAN | | `true` | `onDismiss` present | |"""
    d5 = '- `Alert`: `Status` (5) × `Language` (2) = **10** variants.\n- Grid layout: rows = `Status`, columns = `EN · AR`; gap `spacing/xl`.'
    d6 = 'No prototype interactions on the set. Visible/dismiss transition (B4) and action button states are shown on doc page 04.'
    d7 = f'`Language=AR`: Typography mode `{LBL[p]} · AR`, container flips icon to right edge and action/close to left edge; copy uses A6 Arabic examples.'
    d8 = '- 01: `Warning` titled alert above a sample form/dialog preview\n- 03: all 5 statuses (`Info · Success · Warning · Error · Neutral`), single-line (`Show title=false`) and titled (`Show title=true`), with/without action & close\n- 05 Usage: A7 Do/Don\'t pairs with live instances\n- 07 Platform: desktop width and narrow panel wrap'
    desc = ALERT_CFG['summary']
    return (
        header(p, ALERT_CFG)
        + guidelines_block(p, ALERT_CFG)
        + alert_part_b(p)
        + tail_block(
            p, ALERT_CFG,
            f'The {LBL[p]} `Alert` matches B1–B6 and passes B9 and C6.',
            '- Transient toast confirmations (`Snackbar`)\n- Legacy Mobile `Status Banners / Mobile` approval header strip (FB-03)',
            approach, files,
            '- [ ] Single-line vs titled text colour difference (FB-02)\n- [ ] Action + dismiss keyboard/focus behaviour',
            d2, d3, d4, d5, d6, d7, d8, desc, 'D4 table (Status · Show title · Action · Close button)', ''
        )
    )


def build_snackbar(p):
    is_mobile = (p == 'mobile')
    files = (
        '3-web-components/src/components/snackbar/Snackbar.tsx · Snackbar.test.tsx · index.ts   new\n'
        '3-web-components/src/index.ts · README.md · CHANGELOG.md   change'
        if p == 'web' else
        f'{SEC[p]}/lib/src/components/snackbar/bw_snackbar.dart · test/snackbar_test.dart   new\n'
        f'{SEC[p]}/lib/biowave_{p}.dart · README.md · CHANGELOG.md   change'
    )
    approach = (
        '- **Base:** MUI `Snackbar` + styled inverse surface (`color-surface-inverse`, `Elevation/3`, `layer-toast`), using Biowave `Button` (`text`, `inverse`) and `IconButton`.'
        if p == 'web' else
        (
            '- **Base:** Adaptive helper choosing floating M3 `SnackBar` on Android (`radius-md`) vs Biowave floating toast on iOS (`radius-xl`, leading icon on by default), both rendered on `color-surface-inverse` with `Elevation/3` (FB-04, FB-05).'
            if is_mobile else
            '- **Base:** Flutter `ScaffoldMessenger` floating `SnackBar` themed on `color-surface-inverse` with `Elevation/3` and `48 × 48 dp` action/close targets.'
        )
    )
    if is_mobile:
        d2 = """❖ Snackbar                        ← set: Action = None · With action × OS = Android · iOS × Language = EN · AR
  ├─ icon                         ◇ Material Symbols instance (rounded)
  ├─ message                      T text
  ├─ action                       ◇ instance Button
  └─ close-button                 ◇ instance Icon Button"""
        d4_os = '\n| `OS` | VARIANT | `Android` · `iOS` | `Android` | `os` | `\'android\'` · `\'ios\'` |'
        d5 = '- `Snackbar`: `Action` (2) × `OS` (2) × `Language` (2) = **8** variants (`Android` uses `radius/md`, `iOS` uses `radius/xl` floating toast with `Show icon = true` default).'
    else:
        d2 = """❖ Snackbar                        ← set: Action = None · With action × Language = EN · AR
  ├─ icon                         ◇ Material Symbols instance (rounded)
  ├─ message                      T text
  ├─ action                       ◇ instance .Button _en / _ar (Web) or Button (Tablet)
  └─ close-button                 ◇ instance Icon Button"""
        d4_os = ''
        d5 = '- `Snackbar`: `Action` (2) × `Language` (2) = **4** variants.'
    d3 = """Snackbar                  ↔ horizontal · gap spacing/lg · pad-block spacing/md · pad-inline spacing/xl
│                           min-height size/control/height/lg · fill color/surface/inverse · Elevation/3 · radius B2
├── icon                  ◇ Icon · size size/icon/md · fill color/icon/inverse · BOOLEAN `Show icon`
├── message               T body/sm (Web) or body/md (Tablet/Mobile) · fill color/text/inverse · TEXT `Message`
├── action                ◇ Button (Text · Inverse) · visible in `Action=With action` · TEXT `Action label`
└── close-button          ◇ Icon Button (Inverse) · BOOLEAN `Close button`"""
    d4 = f"""| `Action` | VARIANT | `None` · `With action` | `None` | `action` | absent / present |{d4_os}
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Message` | TEXT | | `Device settings updated.` | `message` | |
| `Action label` | TEXT | | `Undo` / `تراجع` | `action.label` | |
| `Show icon` | BOOLEAN | | `{"false" if not is_mobile else "false (Android) / true (iOS)"}` | `icon` present | |
| `Close button` | BOOLEAN | | `true` | `onClose` / `showCloseButton` | |"""
    d6 = 'No prototype interactions on the set. Enter/exit animations and timer pauses (B4) are shown on doc page 04.'
    d7 = f'`Language=AR`: Typography mode `{LBL[p]} · AR`, layout flips icon to right edge and action/close to left edge; Arabic copy uses A6 examples.'
    d8 = '- 01: bottom floating snackbar preview inside device viewport\n- 03: `None` vs `With action`, leading icon on/off, Light + Dark inverse surface' + (' · Android vs iOS variants' if is_mobile else '') + '\n- 05 Usage: A7 Do/Don\'t pairs with live instances\n- 07 Platform: ' + ('Android M3 bar vs iOS floating toast framing' if is_mobile else 'viewport bottom placement & width clamp')
    return (
        header(p, SNACKBAR_CFG)
        + guidelines_block(p, SNACKBAR_CFG)
        + snackbar_part_b(p)
        + tail_block(
            p, SNACKBAR_CFG,
            f'The {LBL[p]} `Snackbar` matches B1–B6 and passes B9 and C6.',
            '- Persistent inline banners (`Alert`)\n- Multi-action prompts (`Dialog`)',
            approach, files,
            '- [ ] Contrast check passes in Light and Dark (`18.42:1` / `19.8:1`)\n- [ ] Action timer clamps to ≥ 10 s and pauses on hover/focus',
            d2, d3, d4, d5, d6, d7, d8, SNACKBAR_CFG['summary'], 'D4 table', ''
        )
    )


def build_empty_state(p):
    is_web = (p == 'web')
    files = (
        '3-web-components/src/components/empty-state/EmptyState.tsx · EmptyState.test.tsx · index.ts   new\n'
        '3-web-components/src/index.ts · README.md · CHANGELOG.md   change'
        if is_web else
        f'{SEC[p]}/lib/src/components/empty_state/bw_empty_state.dart · test/empty_state_test.dart   new\n'
        f'{SEC[p]}/lib/biowave_{p}.dart · README.md · CHANGELOG.md   change'
    )
    approach = (
        '- **Base:** Vertical centered React flex container using B2 spacing/container tokens and Biowave `Button`.'
        if is_web else
        '- **Base:** Centered Flutter `Column` constrained by `ConstrainedBox` (`size-container-sm` / `xs`), circular badge in `color-surface-subtle`, reusing `BwButton`.'
    )
    d2 = """❖ Empty state                     ← set: Size = MD · SM × Language = EN · AR
  ├─ visual                       ● circular badge (`color-surface-subtle` + Icon)
  ├─ text-stack                   ↕ title + description
  └─ actions                      ↔ primary Button + secondary Button"""
    d3 = """Empty state               ↕ vertical centered · gap spacing/3xl (MD) or spacing/xl (SM) · max-width B2
├── visual                ● circle pad spacing/3xl (MD) or spacing/xl (SM) · fill color/surface/subtle · radius/full · BOOLEAN `Show visual`
│   └── icon              ◇ Icon · size/icon/3xl (MD) or size/icon/2xl (SM) · fill color/icon/subtlest
├── text-stack            ↕ vertical centered · gap spacing/md (MD) or spacing/xs (SM)
│   ├── title             T title/lg (MD) or title/md (SM) · fill color/text/default · TEXT `Title`
│   └── description       T body/lg (MD) or body/md (SM) · fill color/text/subtle(st) · TEXT `Description`
└── actions               ↔ horizontal centered · gap spacing/md
    ├── primary           ◇ Button (Filled · Brand) · BOOLEAN `Primary action`
    └── secondary         ◇ Button (Outlined · Neutral) · BOOLEAN `Secondary action`"""
    d4 = """| `Size` | VARIANT | `MD` · `SM` | `MD` | `size` | `'md'` · `'sm'` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `No matching results` | `title` | |
| `Description` | TEXT | | helper copy | `description` | |
| `Show visual` | BOOLEAN | | `true` | `visual` / `showVisual` | |
| `Primary action` | BOOLEAN | | `true` | `primaryAction` present | |
| `Secondary action` | BOOLEAN | | `true` | `secondaryAction` present | |"""
    d5 = '- `Empty state`: `Size` (2) × `Language` (2) = **4** variants.'
    d6 = 'No prototype interactions on the set. Action button hover/press/focus states follow `Button`.'
    d7 = f'`Language=AR`: Typography mode `{LBL[p]} · AR`; centered layout swaps button pair order (Primary on right in RTL); Arabic copy uses A6 examples.'
    d8 = '- 01: `MD` empty page example and `SM` compact card example\n- 03: `Size = MD · SM`, with/without visual and secondary action\n- 05 Usage: A7 Do/Don\'t pairs with live instances'
    return (
        header(p, EMPTY_CFG)
        + guidelines_block(p, EMPTY_CFG)
        + empty_part_b(p)
        + tail_block(
            p, EMPTY_CFG,
            f'The {LBL[p]} `Empty state` matches B1–B6 and passes B9 and C6.',
            '- Loading placeholders (`Skeleton`)\n- Full illustration asset pack authoring (`2-foundations/guidelines/illustration.md`)',
            approach, files,
            '- [ ] `sm` renders compact inside constrained table/card height\n- [ ] Dual action buttons wrap cleanly on narrow widths',
            d2, d3, d4, d5, d6, d7, d8, EMPTY_CFG['summary'], 'D4 table', ''
        )
    )


def build_skeleton(p):
    is_web = (p == 'web')
    files = (
        '3-web-components/src/components/skeleton/Skeleton.tsx · Skeleton.test.tsx · index.ts   new\n'
        '3-web-components/src/index.ts · README.md · CHANGELOG.md   change'
        if is_web else
        f'{SEC[p]}/lib/src/components/skeleton/bw_skeleton.dart · test/skeleton_test.dart   new\n'
        f'{SEC[p]}/lib/biowave_{p}.dart · README.md · CHANGELOG.md   change'
    )
    approach = (
        '- **Base:** MUI `Skeleton` styled cleanly with `color-background-base-subtle`, `color-background-base-subtlest` highlight, and `motion-duration-progress`.'
        if is_web else
        '- **Base:** Custom Flutter `BwSkeleton` using `AnimatedBuilder` + `LinearGradient` between `color-background-base-subtle` and `color-background-base-subtlest`, static when `MediaQuery.disableAnimations` is true.'
    )
    d2 = """❖ Skeleton                        ← set: Shape = Line · Circle · Block
  └─ shape surface                rectangle / circle / block bound to Foundations tokens"""
    d3 = """Skeleton (Line)           □ width size/container/xs (384) · height spacing/xl (16) · radius/xs · fill color/background/base/subtle
Skeleton (Circle)         ● width size/control/height/md (40) · height size/control/height/md (40) · radius/full · fill color/background/base/subtle
Skeleton (Block)          □ width size/container/xxs (320) · vertical pad 2 × size/control/height/xl (112) · radius/md · fill color/background/base/subtle"""
    d4 = """| `Shape` | VARIANT | `Line` · `Circle` · `Block` | `Line` | `shape` | `'line'` · `'circle'` · `'block'` |"""
    d5 = '- `Skeleton`: `Shape` (3) = **3** variants (language-neutral; composed into loading rows/cards inside apps and Data table).'
    d6 = 'No prototype interactions on the set. Shimmer animation timing (`motion-duration-progress` 1000 ms, linear) and reduced-motion static state are documented on page 04.'
    d7 = 'Shapes are language-neutral; loading compositions in RTL mirror the host layout (e.g., `Circle` avatar on the right of `Line` text rows).'
    d8 = '- 01: composed employee card & table-row skeleton preview using live instances of `Line`, `Circle`, `Block`\n- 03: all 3 `Shape` variants (`Line · Circle · Block`) in Light and Dark\n- 04: motion pulse vs reduced-motion static fill\n- 08 RTL: composed card/list loading row mirrored in RTL'
    return (
        header(p, SKELETON_CFG)
        + guidelines_block(p, SKELETON_CFG)
        + skeleton_part_b(p)
        + tail_block(
            p, SKELETON_CFG,
            f'The {LBL[p]} `Skeleton` matches B1–B6 and passes B9 and C6.',
            '- Page-specific bespoke skeleton layouts (apps compose `Line`, `Circle`, `Block`)',
            approach, files,
            '- [ ] Light and Dark fills verified against Foundations semantic tokens',
            d2, d3, d4, d5, d6, d7, d8, SKELETON_CFG['summary'], 'D4 table', ''
        )
    )


def main():
    builders = {
        'alert': build_alert,
        'snackbar': build_snackbar,
        'empty-state': build_empty_state,
        'skeleton': build_skeleton,
    }
    for p in ('web', 'tablet', 'mobile'):
        for slug, fn in builders.items():
            write_spec(p, slug, fn(p))


if __name__ == '__main__':
    main()
