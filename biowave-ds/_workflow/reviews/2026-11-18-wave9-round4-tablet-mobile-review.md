# Review round 4 — Wave 9: Tablet (first review) and Mobile (round 3 fixes)

| | |
|---|---|
| Reviewer | Claude · 2026-11-18 |
| Branch reviewed | `ag/wave9-feedback` @ `f6e8c4b` |
| How | Live Figma read of every set and docs section: review lint, docs-fit check (round 3), overlap of variants inside each set, close-glyph binding, icon visibility, screenshots |
| Verdict | **Mobile — Approved with 2 minor fixes.** **Tablet — Changes requested** (1 blocker, 3 major). Web stays approved (round 3) |

## Mobile — Approved (minor fixes)

| Round 3 finding | Status |
|---|---|
| R3-1 Alert layout | ✅ Action under the text, close at top-end; no word breaks in EN or AR; variants 328 × 162–168, none overlap |
| R3-2 Snackbar close | ✅ White on the inverse bar (Icon Button inverse appearance) |
| R3-3 Action chevrons | ✅ Gone |
| R3-4 Android icon | ✅ Hidden on Android, shown on iOS |
| R3-5 Docs fit | ✅ 0 / 0 on all 44 pages |
| R3-6 D11 | ✅ Rewritten |

| # | Sev | Where | Problem | Fix |
|---|---|---|---|---|
| R4-M1 | 🟡 | Snackbar set `181:16450` | The 8 variants (384 wide) are placed 248 apart, so **6 pairs overlap** on the set page — the set is hard to read | Lay the set out as a grid: columns OS × Language, rows Action, gap `spacing-3xl` |
| R4-M2 | 🟡 | Empty state set `181:16557` | SM row touches / overlaps the MD row (**3 overlaps**) | Same: grid with a gap between rows |

## Tablet — Changes requested

Fixed already: review lint `issues: []` on all 4 sets · Alert layout and glyphs correct (`info`, `check_circle`, `warning`, `error`, `lightbulb`), 640 × 80–84, EN and AR · Buttons hug · Snackbar uses `.Button` and `Icon Button` · page 08 has AR instances · no overlapping variants.

| # | Sev | Where | Problem | Fix |
|---|---|---|---|---|
| R4-T1 | 🔴 | Snackbar set `218:650210`, 4 variants | Close glyph **black on the inverse bar** (bound to `transparent/icon/default` in the default Icon Button appearance) — same as R2-2 / R3-2 | Same fix as Mobile: the Icon Button's inverse appearance (or glyph fills bound to `color/icon/inverse`); contrast ≥ 3:1 Light and Dark |
| R4-T2 | 🟠 | Snackbar `With action` | The action Button shows its leading / trailing chevrons (`⌄ Undo ⌄`, `⌄ تراجع`) | Turn the Button's icon properties off (text-only), as on Web and Mobile |
| R4-T3 | 🟠 | Snackbar, all variants | Leading `check` icon visible; Tablet spec: `Show icon` default **false** (only Mobile iOS shows it) | Hide the icon by default (`Show icon` false), as on Web |
| R4-T4 | 🟠 | Docs of all 4 Tablet components | Docs-fit check fails: Alert 03 (8 spill · 2 off page), 05 (4), 08 (2 · 1 off page); Snackbar 03 (4), 05 (4), 08 (2); Empty state 00 (4), 03 (5 · 3 off page), 05 (4 · 4 off page), 08 (2 · 2 off page); Skeleton 00 (1), 03 (5), 05 (4 · 1 off page), 08 (2) | The Web / Mobile method (pages and rows HUG, tiles fit or rescale, tiles clip). Acceptance: docs-fit check 0 / 0 on all 44 pages + a screenshot of each section; then rewrite D11 |

## Order of work (Antigravity)

1. Tablet: R4-T1, R4-T2, R4-T3 in the Snackbar set → screenshot.
2. Tablet: R4-T4 docs → docs-fit 0 / 0 on all 44 pages → screenshots → D11.
3. Mobile: R4-M1, R4-M2 (set layout only).
4. CHANGELOG, commit per component per platform, push, **stop**. After this round Wave 9 can be closed and merged.
