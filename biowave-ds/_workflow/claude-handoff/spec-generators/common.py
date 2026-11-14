import os
ROOT = '/home/user/Biowave-Design-System/biowave-ds'
SEC = {'web': '3-web-components', 'tablet': '4-tablet-components', 'mobile': '5-mobile-components'}
LBL = {'web': 'Web', 'tablet': 'Tablet', 'mobile': 'Mobile'}
DATE = '2026-11-13'

def header(p, c):
    """c: dict with name, ar, slug, summary, summary_ar, parts, parts_ar, built_on, import_, figma_note"""
    plat = {'web': 'Web · React + MUI', 'tablet': 'Tablet · Flutter + Material 3', 'mobile': 'Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07)'}[p]
    src = f"`src/components/{c['slug']}/` — not built yet (the Executor creates it)" if p == 'web' else f"`lib/src/components/{c['slug']}/` — not built yet (the Executor creates it)"
    typo = '' if p == 'web' else f" (page Typography mode `{LBL[p]}`)"
    return f"""# {c['name']} · {c['ar']} — {LBL[p]}

> **One file for {c['name']} on {LBL[p]}:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- {p} {c['slug']}`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | {c['name']} · {c['ar']} |
| Summary | {c['summary']} |
| Summary (ar) | {c['summary_ar']} |
| Parts | {c['parts']} |
| Parts (ar) | {c['parts_ar']} |
| Platform | {plat} |
| Built on | {c['built_on'][p]} |
| Import | {c['import'][p]} |
| Figma | **Biowave DS — {LBL[p]} Components** › `↳ {c['name']}`{typo} · [Part D](#d--figma-build) |
| Version | 1.0 · {DATE} |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | {src} |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`{c['slug']}-contract.md`]({c['slug']}-contract.md) · [`figma-{c['slug']}-contract.md`](figma-{c['slug']}-contract.md) — generated, never edited |
| Docs page | [`{c['slug']}.html`]({c['slug']}.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

"""

def tail(p, c):
    return f"""## E · Review

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
| 1.0 | {DATE} | Initial (Wave 8 brief, decisions O-01 … O-06) | — | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | {DATE} | Initial | No | — |
"""

def d_head(p, c, mode, depends):
    return f"""## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-{c['slug']}-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the {LBL[p]} set in **Biowave DS — {LBL[p]} Components**.

| Field | Value |
|---|---|
| Component | {c['name']} |
| Figma file | **Biowave DS — {LBL[p]} Components** (`_sync/figma-files.json` › `{p}`) — never the Foundations file |
| Page / section | `↳ {c['name']}` › sections `{c['name']}` and `{c['name']} — Documentation` |
| Mode | {mode} |
| Depends on | {depends} |
| Plan version | 1 · {DATE} |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
""" + ('' if p == 'web' else f"""- **Typography mode:** on page `↳ {c['name']}` set the explicit variable mode **`{LBL[p]} · EN`** of `5. Typography` (Arabic variants and examples: **`{LBL[p]} · AR`**).
""") + """- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.
"""

def write(p, slug, text):
    for comp in ['side-sheet', 'bottom-sheet']:
        text = text.replace(f'](../{comp}/{comp}.md', f'](../../../4-tablet-components/components/{comp}/{comp}.md')
    d = os.path.join(ROOT, SEC[p], 'components', slug)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, slug + '.md'), 'w').write(text)
