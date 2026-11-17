# Execution plan — remaining waves to Design System 1.0 (Antigravity executes · Claude + Hassan plan and review)

> Written by Claude (Planner / Reviewer) on 2026-11-17 at Hassan's request. **Antigravity** executes every wave; **Claude + Hassan** approve the brief and review each phase. Sources: `ROADMAP.md` (45 components + 13 patterns), `_workflow/tasks/2026-11-12-next-waves-plan.md` (waves, native layer, R-items), section READMEs, `HANDOFF.md`, the Wave 9 review.

## 1. How every wave runs

| Step | Who | Output | Gate |
|---|---|---|---|
| 1. Audit + brief | Antigravity | `_workflow/tasks/<date>-<wave>-brief.md`: legacy Figma audit (node IDs), kit references (iOS and iPadOS 27 / M3), repo state, **open decisions with a recommendation each** (like `2026-11-13-navigation-brief.md`) | **G1 — Claude reviews, Hassan approves the decisions.** Nothing is built before |
| 2. Specs | Antigravity | `<name>.md` A–D, F on each platform (Part A identical except A8), `<name>.tokens.json` only if a component collection is needed, contracts (`npm run contract`) | `docs:check` ✓ |
| 3. Web build | Antigravity via Script Runner | Set + private parts, docs 00–09 + 11, Components List card, **review lint `issues: []`** (lint in `_workflow/reviews/2026-11-17-wave9-feedback-review.md`), screenshot of the set and every docs page | **G2 — Claude reviews Web** |
| 4. Tablet → Mobile | Antigravity | Same; Mobile with `OS = iOS · Android` only where the plan's native rule says so | **G3 — Claude reviews Tablet + Mobile** |
| 5. Close | Antigravity | D11 per spec (honest deviations), README rows, CHANGELOG, `sync:done:<plat>`, push | Merge |

Rules that apply to every wave (from `AGENTS.md`, `HANDOFF.md` §1, the Wave 9 review):

- One branch per wave `ag/<wave>`, based on the latest approved branch. **One commit per component per platform**.
- Reuse sets: Button, Icon Button, Badge, Avatar, Divider, Tooltip, Menu, List item, Checkbox, Chip, Progress, Select… — never redraw a control. Button instances: `minWidth = null`, `HUG` (or `FILL` in stacks).
- Every value bound; AR variants with the AR Typography mode; never mirror logos, check marks, numbers.
- Mobile phone samples are 360 wide (content 328); touch targets `target-min`.
- The bridge (`_workflow/figma-runner/bridge.mjs`) runs only after review finding 1 is fixed (localhost + token).

## 2. Plan

Effort: S ≈ 1 session · M ≈ 2–3 · L ≈ 4+. "Give it" = what Hassan sends Antigravity to start the wave (the prompt is in §3).

| # | Wave | Components / scope | Platforms | Expected from Antigravity | Give it | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| 0 | **9-fix** | Fix Wave 9 (Alert · Snackbar · Empty state · Skeleton) | W T M | All 14 findings of the review, Web first with screenshots, then Tablet / Mobile; Mobile Snackbar `OS` axis; honest D11 | `_workflow/reviews/2026-11-17-wave9-feedback-review.md` | — | M |
| 1 | **10 — Containers** | **Card** (outlined · filled · elevated; selectable card = checkbox / radio card, `selectionMode`, Card group — P-05, IC-07) · **Accordion** (single / multi expand, with Divider) | W T M | Brief from legacy `↳ Cards` (incl. Notification Toast already used by Alert) and Accordion frames; M3 Card / iOS grouped list references; decide card radius / elevation (`radius-2xl`, `elevation-*` per guidelines), Card header / media / actions slots | ROADMAP Day 5 + Day 12 rows; plan §2 Wave 10; `radius.md`, `elevation.md` | Checkbox, Radio sets (Figma) | M |
| 2 | **11 — Action bar** | **Action bar** (bulk / contextual actions, count, close; directional) | W T + M native | Web / Tablet bar above lists and tables; Mobile `OS`: iOS bottom toolbar · M3 bottom app bar (plan §3) | ROADMAP Day 15 row; plan §3 native table; P-05 | Button group, Icon Button, Menu, Divider | S |
| 3 | **S1 — Specs back-fill: selection & status** | Checkbox · Radio · Switch · Segmented button (+ day picker) · Chip (input · filter · assist + Tag / Status) · Progress (linear · circular) · Verification code | W T M | **No new Figma build.** Write A–F specs **from the existing Figma sets** (Figma-first input build, Nov 9–11), `tokens.json` for their existing component collections (`Checkbox / Size`, …), contracts; list every gap between Figma and the guidelines as findings | `_workflow/tasks/2026-11-09-inputs-figma-{web,tablet,mobile}.md` (decisions §2, change logs); `_audits/input-family.md`, `_audits/input-catalog.md` | — | M |
| 4 | **S2 — Specs back-fill: lists, overlays, fields** | List item (+ notification item) · Menu · Popover · Select · Search field · Autocomplete (multi + tags) · Phone field · Field parts | W T M (Popover W T) | Same as S1 | same | S1 | M |
| 5 | **S3 — Specs back-fill: pickers & uploads** | Calendar · Date picker · Date range picker · Time picker · Color picker · File upload (+ photo / avatar) · Message composer | W T M | Same as S1; pickers keep Western digits (D-10); Mobile pickers note R-3 | same + R-1 notes in plan §4 | S2 | M |
| 6 | **12 — Data table** | **Data table** (sorting, selection, row actions, density, sticky header, loading = Skeleton, empty = Empty state, pagination) | W T | Brief from legacy `↳ Table` (`Table / Web` `4637:1501`, `TableEmpty`); MUI X DataGrid (P-02) restyled; Tablet compact; header cell, row, cell parts as private sets | ROADMAP Day 18 row; P-02; Wave 9 Empty state `sm` (FB-06) | Checkbox, Menu, Chip, Pagination, Skeleton, Empty state, Action bar | L |
| 7 | **N — Native Mobile forms (R-3)** | Switch (iOS / M3) · Progress spinner · Date / Time / Date range pickers (iOS wheel / compact in a sheet · M3 picker) · Select on iOS (pull-down / action sheet) · Segmented button vs iOS segmented control | M | `OS = iOS · Android` on the existing Mobile sets; update their Mobile specs (B "iOS / Android" table); replace the 07 examples | plan §3 table; iOS and iPadOS 27 kit; M3 kit; O-07 | S1–S3 | M |
| 8 | **B — Button family & Text field to spec** | Button · Icon · Icon button · Split button · Button group · Link · Text field · Avatar — Figma build status `Planned` | W T M | Compare each existing Figma set with its spec D (and `_workflow/tasks/2026-11-03-button-family-rebind-web.md`); rebuild / rebind only what differs; then **sync section 4**: push component tokens (`sync:plan` → `figma-apply-tokens-<file>.js` → verify → `sync:done:tokens:<file>`) | spec D of each; AGENTS §7; HANDOFF §5 | — (touches sets used everywhere: Hassan approves timing) | L |
| 9 | **C — Clean-up** | R-2 Tablet 07 field width · R-4 Mobile Button Group page · R-5 legacy sets → `_Deprecation Ground` · R-6 decision D-19 + Mobile spec template section · R-7 unused `hovered` modes · icons index (7 not indexed: `sync:icons:plan`) · Doc Kit sync flag · Logo SVG / PNG + Arabic wordmark (assets from Hassan) | W T M F | One small commit per item | plan §4; `logos.md` | 8 | S |
| 10 | **P0 — Patterns setup** | `7-patterns/README.md`, `_templates/pattern.md` (P-03), Figma pattern page structure | — | Template + section README + docs:check rule | ROADMAP §6, P-03 | 1–6 | S |
| 11 | **P1 — App frame** | App shell · Page header | W T M | Pattern guideline + reference composition per platform (no new components, no new tokens) + Figma pattern page | ROADMAP §6 rows | P0 | M |
| 12 | **P2 — Forms & feedback** | Forms and validation · Destructive actions and confirmation · Loading, empty and error states · Feedback and notifications | W T M | Same | same | P0, 9-fix | M |
| 13 | **P3 — Data & identity** | Data list page · Sign-in and OTP verification · Detail and profile page · Settings | W T M | Same | same | 6 | M |
| 14 | **P4 — Product flows** | Clock in / out and breaks · Requests and approvals · Dashboard (charts deferred) | W T M | Same | same | 1 | M |
| 15 | **1.0 — Release audit** | Full a11y, RTL, dark pass; docs site; Components List complete; ROADMAP / CHANGELOG / packages 1.0.0 | all | Audit report with findings; fixes as small commits | ROADMAP Day 26 | all | M |

Code (Executor role, `Code: Planned` on most components) is **not** in this plan: it starts when Hassan decides, from the generated `<name>-contract.md` files.

## 3. Prompt to start a wave (Hassan → Antigravity)

```text
Read biowave-ds/AGENTS.md, biowave-ds/HANDOFF.md and biowave-ds/_workflow/tasks/2026-11-17-execution-plan.md (§1 rules, row <#> "<wave>").
Create branch ag/<wave> from <base branch>. Do step 1 only: audit and write the brief with open decisions and your recommendation for each. Push and stop — Claude and I review the brief before anything is built.
```

After G1: `Brief approved with these answers: … Do steps 2–3 (specs + Web build). Use the review lint; it must return issues: []. Screenshot every set and docs page. Push and stop.`
After G2: `Web approved / fix list: … Do step 4 (Tablet, then Mobile). Push and stop.`

## 4. What Claude needs for each review

Branch name + the D11 node IDs (Claude reads the rest from GitHub and Figma). Reviews are written to `_workflow/reviews/<date>-<wave>-review.md` on the wave branch with severity, place, problem and fix, like the Wave 9 review.
