# Review — Wave 10 early work found in Figma (Accordion · Card, Web) + Wave 9 status

| | |
|---|---|
| Reviewer | Claude · 2026-11-17 (second check, same day) |
| What was found | **Nothing pushed** since `194ddba`. Wave 9 sets **unchanged** in all three files (same findings as `2026-11-17-wave9-feedback-review.md`). New Web pages `↳ Accordion` `706:22199` and `↳ Card` `706:22358` with sets and docs sections, **without a brief or specs** |
| Verdict | Wave 9 fixes first. Wave 10 work stays as a draft; it restarts at step 1 (brief, G1) of `2026-11-17-execution-plan.md` and reuses what is good here |

## Process

| # | Sev | Problem | Fix |
|---|---|---|---|
| P1 | 🔴 | Wave 10 was built before the Wave 9 fixes and before a brief was approved (plan §1 G1); nothing is in Git, so the work exists only in Figma | Finish Wave 9 fixes → push. Then write the Wave 10 brief (decisions below) → stop for G1 |
| P2 | 🔴 | **15 orphan components and frames** on the `↳ Accordion` page, outside any section: `706:22211` (`Expanded=false, Language=EN`), `706:22212` `header`, `706:22213`, `706:22218`, `706:22219`, `706:22369` `footer`, `706:22370`, and 12 Card variants `706:22360` … `706:22654` (`Variant=… , Selected=…, Language=…`). Left from failed runs; they would publish as stray components | Delete them (after checking nothing uses them: `getInstancesAsync()` empty). Page holds only the two sections |

## Accordion `732:4818` (Web) — good base

Lint clean, AR mirrored, `Expanded` × `Language`, chevron from Material Symbols. For the brief:

| # | Sev | Problem | Fix / decision to ask |
|---|---|---|---|
| A1 | 🟠 | Content is fixed text | Content as a **SLOT** (like Dialog `Body`), default = text |
| A2 | 🟠 | No interaction states | `State = Default · Hovered · Focused · Disabled` on the header (focus ring `color-border-focus`) |
| A3 | 🟡 | Only single items; no group | Document an Accordion group (stacked items, shared borders or Divider between) — decide in the brief: separate cards vs one bordered list |
| A4 | 🟡 | `Leading icon` default glyph `help` | Default `info` or a neutral glyph; icon optional |

## Card `738:7973` (Web) — needs rework

| # | Sev | Problem | Fix / decision to ask |
|---|---|---|---|
| C1 | 🔴 | 24 `.Button` instances fixed 278 / `minWidth` 200; in `Selected=true` the button is **cut on the right** | `minWidth = null`; footer buttons `HUG` (or `FILL` in a stacked footer) — same fix as Wave 9 finding 2 |
| C2 | 🟠 | EN footer = outlined "Cancel", AR footer = filled "تأكيد" — the two languages show different components | Same button (emphasis and slot) in EN and AR |
| C3 | 🟠 | Selectable card = thicker brand border only; no Checkbox / Radio. ROADMAP P-05 / IC-07: selectable card = **Checkbox card**, `selectionMode` single (Radio) · multiple (Checkbox) + Card group | Add `Selection = None · Checkbox · Radio` with the real Checkbox / Radio instances (top-end), selected border + fill; Card group in docs |
| C4 | 🟠 | Variants fixed 320 × 260 with empty space at the bottom | Height `HUG`; width sample 320, FILL in grids |
| C5 | 🟠 | Leading circle is drawn; content is fixed text; `Show media` shows nothing in the samples | Leading = `Avatar` instance (or icon) slot; body and media as **SLOTS**; media sample with an image placeholder bound to `color-background-neutral-default` |
| C6 | 🟡 | Card radius / elevation not stated anywhere | In the brief: `radius-2xl` (cards, `radius.md`), Elevated = `Elevation/1` or `/2` (`elevation.md`), Outlined = `border-width-default color-border-subtle`, Filled = `color-surface-subtle` |

Use the review lint from the Wave 9 review on both sets; it must return `issues: []`.
