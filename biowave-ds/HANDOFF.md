# HANDOFF — continuing the Biowave DS work in another agent (Antigravity)

> Written by Claude on 2026-11-14 at the end of the Claude session (2026-11-08 … 2026-11-14), at Hassan's request, so the next agent continues **without losing any detail**. Read this after [`AGENTS.md`](AGENTS.md) and before any task. Everything here is also in the repo; nothing lives only in Claude's memory.

## 0. Hassan's decision (2026-11-14)

Hassan (design lead) moves the execution to **Antigravity**. For the work listed in §6, Antigravity takes over the roles Claude had: **Planner** (Parts A–D and F, briefs in `_workflow/tasks/`), **Figma Agent** (component sets, docs 00–11, cards) and the repo bookkeeping (README rows, CHANGELOG, contracts, sync). This overrides `AGENTS.md` §0.4 for Antigravity only, from this date. Everything else in `AGENTS.md` still applies.

| Item | Value |
|---|---|
| Repo | `https://github.com/hassanSmohamed/Biowave-Design-System` (project folder `biowave-ds/`) |
| Branch to continue from | `claude/tender-shannon-1jpxey` — last commit at handoff in `git log -1`. Not merged to `main` yet. Antigravity works on its own branch **based on it** (e.g. `ag/wave9-feedback`) and opens PRs into it, or Hassan merges it to `main` first |
| Workspace | Windows `D:\workspaces\Design System\Biowave-Design-System` · Mac: Hassan's single clone (AGENTS.md §0.1). Both machines must be on this branch, not `main` (`git checkout claude/tender-shannon-1jpxey && git pull`) |
| Language to Hassan | Arabic (Egyptian, short). Repo text: English, plain, short sentences |
| Rhythm | Stop for Hassan's review after each major phase (brief → Web → Tablet → Mobile). Ask before decisions that are his |

## 1. Working rules learned in this session (keep them)

1. **Figma first, per platform:** Web → Tablet → Mobile. Each component: spec (A–D, F) → contracts → Figma set → docs 00–09 + 11 → Components List card → lint 0 → D11 log + `Figma build: Built` → README row → CHANGELOG → `npm run docs:build` · `docs:check` · `sync:done:<plat>` → commit and push.
2. **Reuse existing components** (Icon Button, Badge, Select, Menu, Progress, Tooltip…) — never redraw them. Legacy sets stay untouched in `_Deprecation Ground`.
3. **Mobile native layer (N-01 / N-02 / N-07):** OS-owned components get `OS=iOS · Android` variants with Biowave tokens. iOS only from the **iOS and iPadOS 27** kit; Android from **Material 3 (Expressive)** kit. Tablet stays one Biowave design (N-03). O-07: code waits for Flutter's iOS look; custom iOS widgets only if a gap is confirmed in review.
4. **Every value bound** to a Foundations variable or text/effect style; no local variables or styles in component files (AGENTS.md 3a). Lint (`figma-scripts/common/lint-component-section.js`) must return `unbound: []`.
5. **Page variable modes:** on each component page set the explicit mode of the Typography collection and, on Tablet / Mobile, the Grid collection (see §3), so `layout/*` and text resolve per platform. Arabic variants set the AR Typography mode on the variant itself.
6. **Arabic:** separate `Language=AR` variants. Instances cannot reorder children, so mirrored layouts are built as RTL variants (`Direction=LTR · RTL` on private parts). Never mirror logos, check marks, numbers.
7. **Contrast is computed, not assumed** — from `2-foundations/tokens` (Python snippet pattern in the conversation log). Non-text UI ≥ 3:1 (e.g. inactive dots moved to `color-border-bold`).
8. Report honestly: if something was skipped or a claim was wrong, say so (e.g. Icon Button already had `Appearance › State = disabled`).

## 2. Figma files and libraries

| File | Key | Notes |
|---|---|---|
| Biowave DS — Foundations | `AyFaSmfDUlTax3GpKhRdHI` | Variables, styles, `Logo` set (`5418:496`, key `9b46e7de73427b157abc3a24e5bd338c0887886b`). **Publish** after any change here |
| Annotation (Doc Kit) | `cBPWg6YZNqK8UIzgMQIpXl` | `Doc/*` components for docs pages |
| Web Components | `7nDhsPNntzIWlrjmuSmZ9l` | Components List page `75:85` |
| Tablet Components | `KTlAsEow60qCiYyU3J90kp` | Components List page `16:2` |
| Mobile Components | `249tIAxlZogRvgBBXjcIZ5` | Components List page found by name |

Library keys: Foundations `lk-e00b31b2…` (full in `_sync/figma-files.json`) · iOS and iPadOS 27 `lk-3167e7e1386e96621fc3b20782e2ec1b199754eeceff2ef04bf90d28a124be6414b67982dc8fb71ea1896b0310c316f54d7b9f0ac598cb3111748728c039a567` · Material 3 Design Kit `lk-5a31d104cabc6a74d4edf6425e7bc6575e9c0f18cda7efb746193aef4d915b077d115c985e6cf49d36d97d455a17d5127a2cbbfbc618b8a70a38669dccb61462` · Google Material Symbols `lk-4a2b9ed33589b66d97bf3701f7af9815e84ceaad5dfc7d9ee7f70a0e0d4d5c9d3e04301594bd27fef676ccd687e81b1def74342063c77ff305bd7fd4d989b1b5`.

**Node IDs of every built component** are in that component's spec, Part **D11** (`<section>/components/<name>/<name>.md`).

## 3. IDs used by every Figma script

| What | ID |
|---|---|
| Typography collection | `VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780` — modes Web EN `3869:6` · AR `5258:0`; Tablet EN `3869:8` · AR `5258:1`; Mobile EN `3869:7` · AR `5258:2` |
| Grid collection | `VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205` — Web `3889:0` · Tablet `3889:1` · Mobile `3889:2` |
| Variables by name | `figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()` filtered by `libraryName==='Biowave DS — Foundations'`, then `importVariableByKeyAsync`. Keys are also in `_sync/figma-library.json` |
| Text styles (keys) | `heading/sm 5598bdd8dbd514d94e313a799f1a6344c7ed688f` · `title/lg 2da324fe6d92dee8e8bfb65214f3572272421b71` · `title/md 80e371f8315ffdb2da029152a20e42afcd924824` · `body/md 87a12277da6eb5157d262a0d847b277747f73b69` · `body/sm 49f1d79a1ea0f0083dde003404f6295314f8804b` · `label/lg 9fe6ff3cff9d3abce486aab5175350b06e06b891` · `label/md e3c53522eceb6758fc2a3be8644311f584118505` · `label/sm fc468e6e7206673886492c3f7f3c44dd1a9f8265` · effect `Elevation/2 fd8b5244c1a24e80f6e0ca3b3aea0d95c40b94b1` · `Elevation/4 0918575e22aab65c62e4adf84b63a7d7761acc6d` (others: search the library or `_sync/figma-library.json`) |
| Material Symbols sets (import with `importComponentSetByKeyAsync`, use child `Style=Rounded, Fill=Unfilled`) | `chevron_right cdd1a195c723930ded7770d8c6f1bc432c385482` · `chevron_left 489e86470d75d0b400cb2670999c728ccfc8e27c` · `more_horiz b20a6f8323610d658f0068b530f72b73c210f748` · `check 7cffc6ec4f597c487859d4091ce6d499ea120150` · `priority_high a3e59dd796f70814461803f15a547cea25021f89` · `dashboard d9bb6585526d9fee184e35e84512364ad99d4229` · `group 23c00811474af20a3c0df7f64600651d00aa184f` · `assignment d55bdfd8b4c137b0526f5290a5e1bde4631c7c7d` · `schedule 89f2818a7ab025b819eefea315fc7ca3a5191bc7` · `key 80e8e4f67dad15297e7cd61d9f8842ac9bd12207` |
| Kit sets used as references | iOS 27 `Segmented Control f508912e2177f4744038dc6591e976abf1040806` · `Page Control 3b87ef1ea49a69a7828be9980b45b54e9a4f1e88` · M3 `Primary tabs/Label only 94e100e3db494a412e33829f9d81d34b460e09dc` · `Tabs c4816e9ba31977046bf2fdeb5c45bfb7ea217ae5` |
| Reused component sets | Icon Button: Web `116:30310` · Tablet `77:50515` · Mobile `76:60003` (glyph = swap the nested `Outlined icon`; state = exposed `Appearance › State`) · Badge: Web `620:136` · Tablet `165:136` · Select Web `.Select _en 469:25429` / `_ar 470:30799` · Menu Web `.Menu _en 451:8942`, Tablet `77:140080` · Progress Mobile `.Progress _en 76:129247` / `_ar 76:129276` · App header (Web) `647:485` · Top app bar Tablet `190:1240`, Mobile `150:1410` |

## 4. Tooling left in the repo — `_workflow/claude-handoff/`

| Path | What |
|---|---|
| `doc-builder/core-web.js` · `core-tablet-mobile.js` | Exact copies of the docs builder stored in each component file as shared plugin data `biowave` › `w8core` (Web differs from Tablet/Mobile; verified by hash). It builds pages 00–09 and 11 from the Doc Kit given `D` + `EX` |
| `doc-builder/store-core-*.js` | Scripts that write the builder into a file's plugin data (re-run if a file lost it) |
| `figma-scripts/common/run-doc-builder.js` | Template: the `D` schema and how to call the builder. Valid device names: `Desktop` · `Web narrow` · `Tablet landscape` · `Tablet portrait` · `Phone` |
| `figma-scripts/common/lint-component-section.js` · `add-components-list-card.js` | Lint (must be `[]`) and Components List card |
| `figma-scripts/navigation/*.js` | Builds of Breadcrumbs, Tabs, Pagination + Page control, Stepper, Primary navigation (Web) — patterns for new sets (private parts with `Direction`, AR variants, booleans, page modes) |
| `figma-scripts/wave7/`, `wave8-overlays/` | Badge · Divider · Tooltip; Dialog · Side sheet builds |
| `spec-generators/*.py` | Python that wrote the A–F spec files (`common.py` helpers; `ROOT` is the Linux path — change it). Patterns, not required |
| `figma-calls.jsonl.gz` | Every `use_figma` call of the session (1 174, with file key, description and code) — search it when you need how something was done |
| `conversation-log.md` | Hassan's messages and Claude's reports in order — the history of every decision |
| `references/wave0-*.md` | Wave 0 reference audits |

Known Figma API lessons (cost hours): TEXT / INSTANCE_SWAP properties hold one value per set — bind them on EN only, AR variants carry text directly · binding an INSTANCE_SWAP swaps every variant to its default · cloned variants lose `componentPropertyReferences` (rebind) · switching variants loses overrides when layer IDs differ · `resize()` after `primaryAxisSizingMode='AUTO'` resets it to FIXED (set AUTO after resizing) · slots: `createSlot()`, instance slots accept `appendChild` · an infinite loop freezes the file's plugin runtime for minutes · `use_figma` returns at most 48 KB — split large reads · doc frames are 1920 wide: rescale wide instances on page 00 and unclip their cells.

## 5. Current state (2026-11-14)

- **Built in Figma and specified** (status per component in each section README): Button family, Icon, Link, Text field and the full input family, Avatar, Badge, Divider, Tooltip, Dialog, Bottom sheet, Side sheet, **navigation family complete** — Primary navigation (+ Drawer), Top app bar, Tabs, Breadcrumbs, Pagination, Page control, Stepper. Table in `_workflow/tasks/2026-11-13-navigation-brief.md` §6.
- **Navigation review decisions NV-14 … NV-18 done** (brief §7): Tablet rail grey; Breadcrumbs current stays neutral; `size-indicator-sm/lg` tokens added and bound; Pagination disabled via Icon Button `Appearance › State`; Foundations `Logo` component, used in the Web App header.
- **Code** for the navigation and overlay families is `Planned` (Executors use the generated contracts).
- `npm run docs:check` ✓ · `npm run tokens` ✓ (402/402 contrast) · `component-tokens` ✓ at handoff.
- `npm run sync` at handoff: sections 1 (code), 2 (Figma variables — re-verified 2026-11-14 after `size-indicator`), 5 (library index) and 6 (contracts) ✓. **Section 4 is ✗ and older than the navigation work** (already ✗ at `adfb44a`): the component-token collections of the older components (13 Web, 7 Tablet, 7 Mobile, from their `<name>.tokens.json`) are not pushed to the component files. The Wave 7–8 and navigation sets bind semantic variables directly (no component tokens), so they were built anyway. Fixing it is its own task: `npm run sync:plan` → run `_sync/figma-apply-tokens-<file>.js` in each component file → `_sync/figma-read-tokens.js` → `npm run sync:verify-tokens -- <file> <dump>` → `npm run sync:done:tokens:<file>` (AGENTS.md §7). Ask Hassan before starting it: it touches the older Button / Text field sets.
- Section 3 lists the Doc Kit spec as "not built" — the Doc Kit exists and is used; this is a bookkeeping flag (`npm run sync:done:doc-kit` after checking it).

## 6. What comes next (in this order, each with a review stop)

1. **Wave 9 — Alert · Snackbar · Empty state · Skeleton** (`_workflow/tasks/2026-11-12-next-waves-plan.md` §2). Start with a brief like `2026-11-13-navigation-brief.md`: audit legacy Foundations sets + iOS 27 / M3 kits, propose decisions, wait for Hassan. Snackbar on Mobile: Android M3 snackbar · iOS Biowave toast (plan §3).
2. Wave 10 remainder — **Accordion · Card** (Tabs and Breadcrumbs are done). Wave 11 remainder — **Action bar** (iOS bottom toolbar · M3 bottom app bar). Wave 13 — **Data table**.
3. Plan §4 items: **R-2** Tablet 07 field width · **R-3** native forms for Switch, Progress spinner, pickers, Select · **R-4** Mobile Button Group page · **R-5** move legacy reference sets to `_Deprecation Ground` · **R-6** native-layer decision record D-19 + Mobile spec template section · **R-7** unused `hovered` modes.
4. Open asks: Logo SVG / PNG files in `2-foundations/assets/logos/` and an Arabic wordmark (from Hassan).

## 7. Connection check for the new agent (run before any task)

Run these and report the results to Hassan. Stop if one fails.

**Known, harmless:** on Hassan's Mac the sync watcher (`_sync/watch.mjs`, started at login by `_sync/install-watch.mjs`) rebuilds generated code when a checkout changes token files and rewrites `_sync/build-stamp.json`. If `git status` shows **only** that file, and `git diff` shows only `builtAt` (or a `sourceHash` equal to the committed one after a rebuild), it is not someone else's work: `git restore biowave-ds/_sync/build-stamp.json` and continue. Any other unexpected change → stop and report (AGENTS.md §0.3).

1. `git fetch && git checkout claude/tender-shannon-1jpxey && git log -1 --oneline` — matches GitHub.
2. `cd biowave-ds && npm ci && npm run docs:check && npm run tokens:check` — both ✓. `npm run sync` — sections 1, 2, 5, 6 ✓; section 4 ✗ is the known older item in §5 (not caused by the handoff).
3. **Figma MCP** with write access (the `use_figma` Plugin-API tool, `get_screenshot`, `search_design_system`): read `figma.root.getSharedPluginData('biowave','w8core').length` in the Web file (expect **13481**) and the Tablet and Mobile files (**13485**).
4. In the Web file: `importComponentSetByKeyAsync('9b46e7de73427b157abc3a24e5bd338c0887886b')` returns `Logo` with 12 variants; `importVariableByKeyAsync('c92e3f33bc4da813e300178b0eaee8aaf75f10ec')` returns `size/indicator/sm`.
5. `get_screenshot` of `647:485` (Web App header) shows the logo, breadcrumbs, actions and profile.
6. Can push to GitHub on a new branch.
