# Review round 2 — Wave 9 Web fixes (Alert · Snackbar · Empty state · Skeleton)

| | |
|---|---|
| Reviewer | Claude · 2026-11-18 |
| Branch reviewed | `ag/wave9-feedback` @ `fecdc10` (commits `c7b6995` tooling, `97f83ba` Web, `2aebf0b` Tablet, `a4a595c` Mobile, `fecdc10` audit script) |
| Round 1 | `2026-11-17-wave9-feedback-review.md` (14 findings) |
| How | Diff of every commit; the bridge read line by line; Web sets and docs read live in Figma (`get_screenshot`, `get_metadata`) and compared with Antigravity's screenshots in `_workflow/screenshots/wave9-web/` |
| Scope | **Web only.** Tablet and Mobile were pushed without waiting for the Web review (round 1 #14, Hassan's prompt "push and stop when Web is done"). They are reviewed after Web is approved, because the docs problem below is the same method there |
| Verdict | **Changes requested** — 2 blockers, 2 major, 3 minor |

## Round 1 findings — status on Web

| # | Status | Note |
|---|---|---|
| 1 Bridge security | ✅ Fixed | Listens on `127.0.0.1`; CORS only for origin `null` on `/poll`, `/result`; `/exec` needs a 256-bit token from `_workflow/.local/bridge-token` (mode 600, deleted on exit); README updated. Minor follow-up R2-7 |
| 2 Button fixed 278 / minWidth 200 | ✅ Fixed | Alert, Empty state, Snackbar buttons hug; Empty state actions no longer stick out |
| 5 Alert glyphs | ✅ Fixed | Info `info`, Warning `warning`, Neutral `lightbulb` in EN and AR |
| 10 Empty state height | ✅ Fixed | Variants hug |
| 11 Snackbar EN / AR height | ✅ Fixed | 384 × 48 both |
| 13 Personal path in `wave9_specs.py` | ✅ Fixed | |
| P2 Accordion page orphans | ✅ Fixed (reported) | 20 deleted after an instance check |
| **8 Docs clipped** | ❌ **Not fixed — worse** | See R2-1 |
| **9 Honest D11** | ❌ Not fixed | See R2-4 |
| 14 Stop after Web | ❌ Not followed | Tablet and Mobile pushed the same night |

## New findings

Severity: 🔴 blocker · 🟠 major · 🟡 minor.

| # | Sev | Where | Problem | Fix |
|---|---|---|---|---|
| R2-1 | 🔴 | Docs of all 4 components — pages 00, 03, 05, 08 (e.g. Empty state 00 `699:7526`, Alert docs `697:8734`) | Round 1 #8 was "fixed" by setting `clipsContent = false` on 345 frames. The examples are still taller than their cells, so now they **spill out and overlap**: Empty state 00 — the SM row sits on top of the MD row; every 03 page — the second sub-section title is drawn over the first row of tiles; 05 — Do / Don't tiles run past the page footer; 08 — examples continue below the page frame | Undo the blanket unclip. Make the content fit instead: (a) page frames and their sections **auto-layout vertical, height HUG**, so a page grows with its content; (b) 00 sheet rows HUG the variant height (no fixed row height); (c) 03 / 05 / 08 tiles HUG the example (or the example is scaled down to the tile with the doc builder's rescale), `clipsContent = true` on tiles again. Acceptance: in a screenshot of each docs section **nothing overlaps and nothing crosses a page edge or the footer** |
| R2-2 | 🔴 | Snackbar set `694:220191`, all 4 variants (`close-button` `694:219970` …) | The close icon is **black on the inverse (near-black) bar** — almost invisible, fails 3:1 for non-text UI. The spec (02 Tokens: `close-button · icon color/icon/inverse`) asks for the inverse colour | Use the Icon Button appearance for inverse surfaces (as on Dialog / round 1 #4), or bind the glyph fill of the instance to `color/icon/inverse`. Check: compute the contrast of the glyph on `color/surface/inverse` in Light and Dark (≥ 3:1). Also check the docs 01 dark example |
| R2-3 | 🟠 | Docs page 08 RTL — Alert and Snackbar (and check Empty state, Skeleton) | The RTL page shows the **English** variant (Snackbar 08: "Device settings updated. · Undo"), while the text says the AR layout is shown | Use `Language = AR` instances on every 08 page; EN beside it only as a comparison, labelled |
| R2-4 | 🟠 | D11 of the 4 Web specs | D11 still does not match Figma: Snackbar says "message wraps 1 line (height 56px)", actual height is **48**; it says "docs unclipped" as if that were a fix; "Deviations: none" while R2-1 … R2-3 are visible. The new audit script (`fecdc10`) checks bindings and overflow **inside the sets only**, so it cannot see docs or colour problems | D11 must state what a person sees in the screenshot. Before writing "Built" / `issues: []`, open the docs screenshots and check them against the acceptance line in R2-1 |
| R2-5 | 🟡 | Snackbar set | `Show icon` default is documented as `true` (02 Props), but the `icon` layer is hidden in all 4 variants | Decide with the spec: either show the leading icon by default, or change 02 Props and spec D to default `false`. Brief FB-04 is the reference |
| R2-6 | 🟡 | Snackbar set layout | `Action=With action, Language=AR` sits at x 560 while the other AR variant is at 464 | Align the AR column (cosmetic, for the 00 sheet and the set page) |
| R2-7 | 🟡 | `bridge.mjs` file-queue fallback | `_workflow/.local/v2-req-*.json` is executed **without the token**. Acceptable (only local processes can write there, same as the token file), but it should be a stated choice | Either check a `token` field in the request file too, or write one line in the runner README that the file queue trusts local files |

## Process

| # | Sev | Problem | Fix |
|---|---|---|---|
| R2-P1 | 🟠 | Tablet and Mobile were built before the Web review. If the R2-1 method is repeated there, the same rework is needed three times | Next push = **Web only**. Then stop |
| R2-P2 | 🟡 | One commit per platform, not per component per platform; ~60 throw-away probe scripts committed to `_workflow/figma-runs/` (`test-*`, `inspect-*`, `probe-*`) | One commit per component per platform. Keep only scripts that change Figma or are re-usable checks; delete probes before committing |

## Order of work for the fixer (Antigravity)

1. R2-2 (Snackbar close colour) in the Web set.
2. R2-1 (docs fit, not unclipped) on all 4 Web docs sections; then R2-3 (AR on 08).
3. R2-5, R2-6 after a short note in the spec; R2-7 one line.
4. Screenshot every Web docs section; check each page against the R2-1 acceptance line; correct D11 (R2-4); CHANGELOG.
5. Commit per component, push, **stop**. Do not touch Tablet / Mobile until Claude approves Web.
