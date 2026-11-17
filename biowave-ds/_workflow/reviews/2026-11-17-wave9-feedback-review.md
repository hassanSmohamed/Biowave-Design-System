# Review — Wave 9 Feedback & Loading (Alert · Snackbar · Empty state · Skeleton)

| | |
|---|---|
| Reviewer | Claude · 2026-11-17 |
| Branch reviewed | `ag/wave9-feedback` @ `194ddba` (one commit, 83 files) |
| Brief | `_workflow/tasks/2026-11-14-wave9-feedback-brief.md` (FB-01 … FB-07, approved by Hassan) |
| How | Repo checks run on the branch; every Wave 9 set read in Figma (properties, variants, nested instances, independent lint, overflow), screenshots of the sets and of one docs section |
| Verdict | **Changes requested** — 3 blockers, 6 major, 5 minor. The fixer is Antigravity; this file is the work list |

## What passed

- Brief: legacy audit is thorough (node IDs, contrast failure of the old snackbar found), decisions recorded as approved.
- Repo: `docs:check` ✓ (71 files) · `tokens:check` ✓ 402/402 · `component-tokens` ✓ · specs `Plan: Finished`, `Figma build: Built`, D11 filled with node IDs, README rows, CHANGELOG, contracts.
- Figma, all three files: no unbound fills, strokes, padding, gaps, radius or effects; every text has a text style; Arabic variants set the AR Typography mode; Alert and Web Snackbar reuse `.Button _en/_ar` and `Icon Button`; icons come from the Material Symbols library; `Status = Info · Success · Warning · Error · Neutral` (FB-01), `Show title` (FB-02), Snackbar on `color-surface-inverse` (FB-04), `Size = MD · SM` (FB-06), `Shape = Line · Circle · Block` (FB-07).
- `npm run sync` section 4 ✗ is the older known item (HANDOFF §5), not from this wave.

## Findings

Severity: 🔴 blocker (must fix before merge) · 🟠 major (fix in this wave) · 🟡 minor.

| # | Sev | Where | Problem | Fix |
|---|---|---|---|---|
| 1 | 🔴 | `_workflow/figma-runner/bridge.mjs` | `POST /exec` runs any posted code in Figma. The server listens on **all interfaces** (`server.listen(PORT)`) and answers `Access-Control-Allow-Origin: *`. While the bridge runs, any web page open in Hassan's browser, or any device on the same network, can send a script that edits or deletes Figma content with his account | Listen on `127.0.0.1` only (`server.listen(PORT, '127.0.0.1')`). Remove the `*` CORS header; answer CORS only for the plugin UI origin (`null`) on `/poll` and `/result`. Require a random token on `/exec`: the bridge writes it to `_workflow/.local/bridge-token` at start, `exec.mjs` sends it in a header, the bridge rejects requests without it. Document in the runner README |
| 2 | 🔴 | Alert · Empty state · Snackbar (Web) — Web, Tablet, Mobile | Every `.Button` instance is **fixed 278 wide with `minWidth` 200** (the Button master's default). Effects: Empty state `actions` row is 563 wide inside a 480 / 384 component and **sticks out on both sides** in all 12 variants (3 files); Alert and Snackbar squeeze their text (Web Snackbar message wraps "Device settings updated." onto 2 lines in a 480 bar) | On each button instance: `minWidth = null`, `layoutSizingHorizontal = 'HUG'` (same fix as Dialog footer buttons, Wave 8). Empty state: `actions` stays HUG and centred; Alert / Snackbar: text block `FILL`, action and close `HUG`. Re-run the lint below (it now catches overflow) |
| 3 | 🔴 | Snackbar — Mobile set `181:16450` | **No `OS = Android · iOS` axis.** The Mobile spec (FB-05, D2 line `Action × OS × Language`, D4 `OS` VARIANT) requires it, but the set has `Action × Language` only (4 variants) and D11 says "Built", "deviations: none" | Add `OS`: `Android` = current bar (M3, `radius-md`, bottom); `iOS` = Biowave floating toast (`radius-xl`, leading icon on by default, `Elevation/3`) → 8 variants. Update docs 00, 02, 03, 07 (iPhone and Android side by side) and D11 |
| 4 | 🟠 | Snackbar — Tablet `218:650210`, Mobile `181:16450` | Action ("Undo") and close are **hand-drawn frames** (`action-button`, `close-button` with a bare `close` glyph), not components. The close has no states and no Icon Button target; the Web set does it right | Replace with `.Button _en/_ar` (text style, `sm`) and `Icon Button` (`sm`, glyph `close` swapped into `Outlined icon`, `Appearance › Color = inverse` or the inverse variant used on Web) |
| 5 | 🟠 | Alert — all three files | Wrong status glyphs: **Info = `help` (?)**, **Warning = `priority_high` (!)**, **Neutral = `notifications` (bell)**. Spec A4 says Info = info circle, warning triangle; FB-01 says Neutral = `lightbulb` (or `info`) | Info → Material Symbols `info`; Warning → `warning`; Neutral → `lightbulb`. Success `check_circle` and Error `error` are fine. Check the doc pages update through the instances |
| 6 | 🟠 | Alert — Mobile `181:16391` | Variants are **640 wide** — wider than a phone (360) | Mobile sample width 328 (360 − 2 × `spacing-xl`), used FILL in screens. Docs 07 on a phone frame. Tablet 640 is fine |
| 7 | 🟠 | Empty state — Mobile `181:16557` (and Tablet portrait) | Actions sit side by side. Mobile spec (A8 / line 129): "buttons wrap vertically to full width on narrow viewports" | Mobile: `actions` VERTICAL, buttons FILL, primary on top; Tablet keeps side by side (portrait example in docs 07 stacked) |
| 8 | 🟠 | Docs — e.g. Web Empty state docs `699:9786` | Examples are **clipped**: page 00 cells cut the visual and hide the actions; page 03 tiles show only the top of each example; page 08 shows one clipped tile. Likely in every Wave 9 docs section (cause: findings 2 and the fixed component height) | After fixes 2–7, rebuild the docs sections (or unclip cells and re-fit tiles, as the doc builder does: widen tiles, rescale slot children, `clipsContent = false` on page-00 cells). Screenshot every docs section before reporting |
| 9 | 🟠 | Process — D11 of all 12 specs | D11 says "lint 0 · Light/Dark/RTL verified" but overflow, the missing OS axis and the hand-drawn controls were not caught. A D11 must match what is in Figma | Use the lint below (adds overflow + hand-drawn control checks), screenshot each set and docs section, and list real deviations in D11 |
| 10 | 🟡 | Empty state — Web `694:220298` | Variants have a **fixed height 240** (MD and SM); content is not hugged (Tablet / Mobile hug correctly) | `primaryAxisSizingMode = 'AUTO'` on each variant |
| 11 | 🟡 | Snackbar — Web | `With action` EN 480×56 vs AR 480×60 | Resolves with fix 2 (message FILL, one line) |
| 12 | 🟡 | Alert — EN variants | All five EN statuses show the same copy ("Shift update scheduled") because Title/Description are set-wide TEXT properties | Fine for the set; in docs examples override title/description per status (AR variants already have per-status copy) |
| 13 | 🟡 | `_workflow/claude-handoff/spec-generators/wave9_specs.py` | Hard-coded personal path `ROOT = '/Users/hassansaid/Downloads/…'` | Derive ROOT from the script location (`Path(__file__).resolve().parents[3]`) |
| 14 | 🟡 | Process | The whole wave (3 platforms × 4 components, specs, docs, tooling) is one commit, so a regression cannot be reverted per component; HANDOFF §0 asks for a review stop after Web, Tablet and Mobile | Next waves: one commit per component per platform; stop for Hassan after Web |

## Lint to use from now on (replaces `lint-component-section.js` for reviews)

Read-only. Run in each file with the set IDs; it must return `issues: []`.

```js
const SETS = ['691:219739', '694:220191', '694:220298', '694:219746']; // set IDs of this file
const issues = [];
for (const id of SETS) {
  const s = await figma.getNodeByIdAsync(id);
  for (const v of s.children) {
    for (const n of v.findAll(() => true)) {
      let q = n.parent, inInst = false; while (q && q !== v) { if (q.type === 'INSTANCE') { inInst = true; break; } q = q.parent; }
      if (n.type === 'INSTANCE' && !inInst) {
        const m = await n.getMainComponentAsync(); const setName = m && m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name : '';
        if (/\.Button _/.test(setName) && (n.minWidth || n.layoutSizingHorizontal === 'FIXED')) issues.push(`${v.name} › ${n.name}: Button fixed ${Math.round(n.width)} / minWidth ${n.minWidth}`);
      }
      if (inInst || n.type === 'INSTANCE') continue;
      for (const k of ['fills', 'strokes']) if (Array.isArray(n[k])) n[k].forEach((p) => { if (p.type === 'SOLID' && p.visible !== false && !(p.boundVariables && p.boundVariables.color)) issues.push(`${v.name} › ${n.name} raw ${k}`); });
      if (n.type === 'TEXT' && !n.textStyleId) issues.push(`${v.name} › ${n.name} no text style`);
      if (n.layoutMode && n.layoutMode !== 'NONE') for (const k of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing']) if (n[k] > 0 && !(n.boundVariables && n.boundVariables[k])) issues.push(`${v.name} › ${n.name} raw ${k}`);
      if (n !== v && n.absoluteBoundingBox && v.absoluteBoundingBox) { const a = n.absoluteBoundingBox, b = v.absoluteBoundingBox; if (a.x < b.x - 0.5 || a.x + a.width > b.x + b.width + 0.5) issues.push(`${v.name} › ${n.name} sticks out of the variant`); }
      if (n.type === 'FRAME' && /button/i.test(n.name)) issues.push(`${v.name} › ${n.name}: hand-drawn control — use Button / Icon Button`);
    }
  }
}
return { issues: [...new Set(issues)] };
```

## Order of work for the fixer

1. Finding 1 (bridge security) — before running the bridge again.
2. Findings 2, 10, 11 in Web → screenshot → Tablet → Mobile.
3. Findings 5 (glyphs), 4 (Snackbar controls), 6 and 7 (Mobile widths and stacking), 3 (Mobile Snackbar OS).
4. Finding 8 (docs), then 9 (lint + screenshots + honest D11), CHANGELOG entry, `docs:check`, `sync:done:<plat>`.
5. Report back to Hassan with screenshots of each set; Claude re-checks the IDs above.
