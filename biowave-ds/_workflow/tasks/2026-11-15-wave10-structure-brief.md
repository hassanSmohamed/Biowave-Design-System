# Wave 10 — Structure Brief: Accordion & Card

**Date:** 2026-11-15  
**Owner:** Hassan (Design Lead) · **Planner:** Antigravity  
**Platforms:** Web (`3-web-components`) · Tablet (`4-tablet-components`) · Mobile (`5-mobile-components`)  
**References:** `2-foundations/guidelines/{colors,typography,spacing,radius,elevation,motion,icons,a11y,content}.md`, `_workflow/tasks/2026-11-12-next-waves-plan.md`, legacy Foundations pages (`AyFaSmfDUlTax3GpKhRdHI`), **Material 3 Design Kit** (`Cards`), **iOS and iPadOS 27** kit (`Grouped List / Inset Grouped`).

---

## 1. Context & Scope

Wave 10 covers **Page Structure**:
- **Tabs** and **Breadcrumbs** were completed in earlier sessions.
- **Wave 10 remainder** covers:
  1. **Accordion (`accordion`)** — collapsible content sections with header trigger, chevron indicator, and expandable panel slot.
  2. **Card (`card`)** — foundational content container supporting Outlined, Elevated, and Filled styles, with header, body content slot, footer actions, and selectable state.

---

## 2. Legacy Audit (Foundations File `AyFaSmfDUlTax3GpKhRdHI`)

| Component | Legacy Page & Node ID | What is on Canvas | Findings & Issues |
|---|---|---|---|
| **Accordion** (Web) | `↳ Accordion` (`3555:404`) → `Accordion` (`3557:1230`) | 2 variants (`1015 px` wide): `Expanded = No` (`1015 × 49`), `Expanded = Yes` (`1015 × 844`). Also `Component 4` (`3558:1713`). | Header row with text title, trailing `chevron_down` / `chevron_up`, light border (`#E5E7EB`), white fill. When expanded, body content sits below a divider. Needs token rebinding (`color/surface/default`, `color/border/default`, `radius/md`, `spacing/*`), proper RTL support, and mobile touch targets (48 dp). |
| **Cards** (Web) | `↳ Cards` (`1268:3237`) | Various product cards: `Upload Photo` (`3292:17726`), `Form Pop-up` (`3485:1081`), Notification card (`3422:1038`), Stat & Details frames (`3630:2649`, `3630:2558`). | Highly fragmented; specific ad-hoc cards rather than a reusable design system primitive. We need a clean, composable base `Card` primitive (`Outlined`, `Elevated`, `Filled`) with standard slots. |
| **Cards** (Mobile) | `↳ Cards` (`4131:18937`) | Attendance cards, request status cards (`358 × 160`), summary cards with avatar and chip. | Mobile cards use `radius-lg` (12 dp) or `radius-md` (8 dp), white surface, 1 px border or subtle drop shadow (`Elevation/1` or `Elevation/2`). |

---

## 3. Platform & Native Strategy

Both **Accordion** and **Card** are core content/structure components rather than OS system chrome:
- **One Biowave design across all 3 platforms** (Web, Tablet, Mobile) driven by Foundations tokens.
- On Mobile and Tablet, interactive targets (accordion header, card click target) maintain minimum `48 × 48 dp` touch areas.
- On Mobile, cards use full container width (`size/container/xs` / 100% minus 16 dp page margins) and support grouped inset layouts.

| Component | Web (`3-web-components`) | Tablet (`4-tablet-components`) | Mobile (`5-mobile-components`) |
|---|---|---|---|
| **Accordion** | Desktop width / container width, hover states on header trigger | Same layout, 48 dp touch target on header trigger | Full-width (16 dp margins), 48 dp touch target |
| **Card** | Flexible widths (`sm`, `md`, `lg` or fill), hover elevation/border transitions | Tablet grid cards (2-column list-detail) | Full width / stacked cards, swipe/tap affordances |

---

## 4. Key Proposed Decisions for Review

### 4.1 Accordion Proposals
- **AC-01 (Component Structure):**
  - Build as an `Accordion` item component set with properties:
    - `Expanded`: `false · true`
    - `Language`: `EN · AR`
    - `Title`: TEXT (default: `"Section title"`)
    - `Subtitle`: TEXT (optional secondary line)
    - `Show subtitle`: BOOLEAN (default: `false`)
    - `Leading icon`: BOOLEAN (default: `false`, Material Symbols icon)
    - `Disabled`: BOOLEAN (default: `false`)
  - Content area is a dedicated `SLOT` frame so designers and developers can insert any nested layout (text, form fields, table, list items).
- **AC-02 (Grouping & Dividers):**
  - Standalone item has border (`color/border/default`), `radius/md` (8 dp).
  - When multiple items are stacked into an Accordion Group, adjacent borders collapse or share a 1 px divider (`color/border/subtle`).
- **AC-03 (Chevron Icon):**
  - Trailing chevron: `expand_more` (rotates 180° to `expand_less` when expanded, or swaps). In RTL (`Language = AR`), chevron moves to left edge and text aligns right.

### 4.2 Card Proposals
- **CR-01 (Card Variants):**
  - Three visual variants:
    1. `Outlined`: 1 px `color/border/default` border, `color/surface/default` fill, no shadow (clean, preferred for dashboards and forms).
    2. `Elevated`: `color/surface/default` fill, `Elevation/1` (subtle shadow), no border (soft visual hierarchy).
    3. `Filled`: `color/surface/subtle` fill, no border, no shadow (grouping content within an already bordered or elevated page).
- **CR-02 (Interactive & Selectable):**
  - `Interactive`: BOOLEAN (`false · true`). When true, adds hover effect (subtle border/elevation lift) and keyboard focus ring.
  - `Selected`: BOOLEAN (`false · true`). For selection cards (e.g. branch selection, plan picker, shift card), `Selected = true` applies `color/border/brand` (2 px) or tint fill.
- **CR-03 (Card Anatomy & Slots):**
  - `Header`: Title (`title/md` or `title/lg`), optional subtitle, optional trailing action/menu/status badge.
  - `Media`: Optional cover image / illustration slot (`Show media = false · true`).
  - `Body`: Open content `SLOT`.
  - `Footer`: Optional action button bar (`Primary action`, `Secondary action`).

---

## 5. Next Steps

1. **Hassan's review & alignment** on decisions `AC-01` … `AC-03` and `CR-01` … `CR-03`.
2. Generate specs and contracts for Web, Tablet, and Mobile.
3. Build in Figma: Web → Tablet → Mobile (Component sets → Docs 00–09, 11 → Components List cards).
