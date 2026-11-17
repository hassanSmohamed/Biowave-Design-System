# Screen-first plan — build only the components the product screens use

> Decided by Hassan on 2026-11-17. Written by Claude. **Replaces the wave order** of `2026-11-17-execution-plan.md` §2 from row 1 on. The rules of that plan (§1: one branch per unit, reuse sets, bound values, AR variants, lint `issues: []`) still apply.

## 1. Why

The ROADMAP lists 45 components + 13 patterns. Some of them may never appear in Biowave's screens. From now on a component is built (Figma or code) **only when a real screen needs it**.

## 2. The loop

| Step | Who | Output | Gate |
|---|---|---|---|
| 1. Screen | Hassan (in Figma, or designed with Claude) | Figma link (file + node ID) or PNG in `_workflow/screens/<flow>/` | — |
| 2. Analysis | Claude | `_workflow/screens/<flow>/analysis.md`: every element on the screen → DS component, variant, what exists (spec · Figma W/T/M · code), gap | **S1 — Hassan approves the gap list** |
| 3. Inventory | Claude | Update `_workflow/screens/component-inventory.md` (one row per component, `Needed by` screens) | — |
| 4. Build brief | Claude | `_workflow/tasks/<date>-<flow>-build.md`: what to build or change, where (Figma / code, platforms), decisions already made, acceptance criteria, checks | **S2 — Hassan approves, sends it to Antigravity** |
| 5. Build | Antigravity | Branch `ag/<flow>`, one commit per component per platform, screenshots, D11, CHANGELOG. Push and stop | — |
| 6. Review | Claude | `_workflow/reviews/<date>-<flow>-review.md`: severity, place, problem, **exact fix** | Verdict |
| 7. Fix | Antigravity | Fixes only the review findings. Push and stop | Back to 6 until **Approved** |
| 8. Sync | Claude (with Hassan's OK) | `docs:check`, `tokens:check`, `sync` green; merge and push to GitHub | Done |

Antigravity **does not** write briefs or take design decisions in this loop. If something in the brief is unclear or impossible, it writes a question in its handoff and stops.

## 3. Gap types in an analysis

| Type | Meaning | Action |
|---|---|---|
| ✅ Exists | Component and variant built on the needed platform | Reuse |
| 🟡 Extend | Component exists, a variant / state / slot is missing | Small brief item |
| 🔴 New | No component | Full unit: spec A–D, F → Figma → docs → card (→ code if asked) |
| 🔧 Fix first | Exists but has open review findings | Fix before the screen uses it |
| ⚪ Pattern | Composition of existing components, no new component | Pattern note, no build |

## 4. What happens to the old plan

| Old row (`2026-11-17-execution-plan.md` §2) | Status |
|---|---|
| 0 · 9-fix (Alert · Snackbar · Empty state · Skeleton) | **Continue now** (Hassan, 2026-11-17). Antigravity fixes all 14 findings of `2026-11-17-wave9-feedback-review.md` on `ag/wave9-feedback`, Web first, then Tablet / Mobile. Claude reviews; the loop in §2 steps 6–8 applies |
| 1 · Wave 10 Card · Accordion (Web draft in Figma) | **Paused.** Kept as a draft; resumes only if a screen needs it, with the fixes in `2026-11-17-wave10-early-review.md` |
| 2–15 | **Paused.** Each row starts only when the inventory marks its components `Needed` |
| 8 · Button family & Text field to spec | Triggered by the first screen that uses them |

## 5. Prompt to start a build (Hassan → Antigravity)

```text
Read biowave-ds/AGENTS.md, biowave-ds/HANDOFF.md and biowave-ds/_workflow/tasks/2026-11-17-screen-first-plan.md.
Then do exactly biowave-ds/_workflow/tasks/<date>-<flow>-build.md on a new branch ag/<flow> from <base branch>.
Do not take design decisions; if something is unclear, write it under Questions and stop. Push and stop when done.
```

After a review: `Fix the findings in biowave-ds/_workflow/reviews/<date>-<flow>-review.md only. Push and stop.`
