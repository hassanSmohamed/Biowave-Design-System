# Review round 3 — Wave 9: Web (round 2 fixes) and Mobile

| | |
|---|---|
| Reviewer | Claude · 2026-11-18 |
| Branch reviewed | `ag/wave9-feedback` @ `bd3b760` (Web: `c5f7c89` Alert · `aecb291` Snackbar · `96875bb` Empty state · `bd3b760` Skeleton; Mobile: `a4a595c`) |
| How | Live Figma read of every set and docs section: review lint, a **docs-fit check** (every visible node inside its parent frame and inside its page; result per page), language of the instances on page 08, glyph fills, screenshots |
| Verdict | **Web — Approved.** **Mobile — Changes requested** (2 blockers, 2 major). Tablet not reviewed yet (after Mobile, same method) |

## Web — Approved

| Check | Result |
|---|---|
| Review lint on the 4 sets | `issues: []` |
| Docs fit, 44 pages (4 × 11) | 0 nodes outside their frame, 0 outside their page — R2-1 fixed |
| Page 08 RTL | AR instances present (EN beside them as a labelled comparison) — R2-3 fixed |
| Snackbar close (R2-2) | Glyph bound to `color/icon/inverse` in all 4 variants; white on the inverse bar (screenshot) |
| R2-5 · R2-6 · R2-7 | `Show icon` default `false` in spec and Figma · AR column aligned · runner README states the file-queue trust boundary |

## Mobile — what is fixed (round 1)

`OS = Android · iOS` on Snackbar (8 variants, radius 8 / 12) · real `.Button` and `Icon Button` in Snackbar · Alert 328 wide · Alert glyphs `info` · `warning` · `lightbulb` · Empty state actions vertical and FILL · Buttons hug · review lint `issues: []`.

## Mobile — findings

Severity: 🔴 blocker · 🟠 major · 🟡 minor.

| # | Sev | Where | Problem | Fix |
|---|---|---|---|---|
| R3-1 | 🔴 | Alert set `181:16391`, all 10 variants | At 328 wide the content, action button and close sit **in one row**, so the text column is ~80 px: words break inside ("schedu/led", "attenda/nce"); variants are up to **350 tall** and **overlap each other** in the set | Mobile layout: row 1 = icon · content (title + description, FILL) · close (top-aligned, end); row 2 = action button under the text, aligned to the content start (HUG). Re-place the variants in a grid with gaps so none overlap. Check that no word breaks in EN or AR |
| R3-2 | 🔴 | Snackbar set `181:16450`, all 8 variants | Close glyph **black on the inverse bar** (the R2-2 problem, fixed on Web only) | Same fix as Web: bind the glyph fills to `color/icon/inverse`; check contrast ≥ 3:1 Light and Dark |
| R3-3 | 🟠 | Snackbar `With action` variants | The action Button shows its **leading and trailing chevrons** (`⌄ Undo ⌄`, `⌄ تراجع`) | Turn the Button's leading / trailing icon properties off (text-only action), as on Web |
| R3-4 | 🟠 | Snackbar `OS = Android` | Leading `check` icon is visible on Android; FB-05 and the spec: icon **on by default for iOS only**, off for Android | Android variants: icon hidden by default (`Show icon` false); iOS: visible. Spec D4 already says so |
| R3-5 | 🟠 | Docs of all 4 Mobile components — pages 00, 03, 05, 07, 08 | Docs-fit check: Alert 00 (10 nodes spill), 03 (9 + 3 off page), 05 (4), 08 (4 + 2 off page); Snackbar 03, 05, 07 (`Devices row` off page), 08; Empty state 00, 03 (5 off page), 05 (4 off page), 08; Skeleton 00, 03, 05, 08. This is round 2 R2-1 on Mobile | Apply the Web method that passed (pages and rows HUG, tiles fit or rescale, tiles clip again). Acceptance: docs-fit check 0 / 0 on every page, and a screenshot of each section |
| R3-6 | 🟡 | D11 of the 4 Mobile specs | Snackbar D11 says "Docs unclipped … lint issues: []" while R3-2 … R3-5 are visible | Rewrite D11 after the fixes from what the screenshots show |

## Docs-fit check (use it before every push)

Read-only; run per docs section; every page must return `edge: 0, spill: 0`.

```js
const SECTION = '181:21193'; const T = 2; const sec = await figma.getNodeByIdAsync(SECTION); const out = {};
const vis = (n) => { let q = n; while (q && q.type !== 'PAGE') { if (q.visible === false) return false; q = q.parent; } return true; };
for (const pg of sec.children) { const pb = pg.absoluteBoundingBox; let edge = 0, spill = 0;
  for (const n of pg.findAll((x) => !!x.absoluteBoundingBox)) { if (!vis(n)) continue; const a = n.absoluteBoundingBox;
    if (a.x < pb.x - T || a.y < pb.y - T || a.x + a.width > pb.x + pb.width + T || a.y + a.height > pb.y + pb.height + T) edge++;
    const p = n.parent; if (p && p !== pg && p.absoluteBoundingBox && p.type !== 'GROUP' && p.type !== 'BOOLEAN_OPERATION' && !p.clipsContent) { const b = p.absoluteBoundingBox;
      if (a.x < b.x - T || a.y < b.y - T || a.x + a.width > b.x + b.width + T || a.y + a.height > b.y + b.height + T) spill++; } }
  out[pg.name] = { edge, spill }; }
return out;
```

## Order of work (Antigravity)

1. R3-1, R3-2, R3-3, R3-4 in the Mobile sets → screenshot each set.
2. R3-5 docs with the Web method → docs-fit check 0 / 0 on all 44 Mobile pages → screenshots.
3. R3-6 D11, CHANGELOG. Commit per component, push, **stop**. Tablet comes after Mobile is approved.
