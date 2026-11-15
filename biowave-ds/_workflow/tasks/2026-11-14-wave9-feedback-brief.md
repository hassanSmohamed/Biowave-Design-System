# Wave 9 — Feedback & Loading Brief (Alert · Snackbar · Empty state · Skeleton)

**Date:** 2026-11-14
**Owner:** Hassan (Design Lead) · **Planner:** Antigravity
**Platforms:** Web (`3-web-components`) · Tablet (`4-tablet-components`) · Mobile (`5-mobile-components`)
**References:** `2-foundations/guidelines/{colors,typography,spacing,radius,elevation,motion,icons,illustration,a11y,content}.md`, `_workflow/tasks/2026-11-12-next-waves-plan.md`, legacy Figma pages in Foundations (`AyFaSmfDUlTax3GpKhRdHI`), **iOS and iPadOS 27** kit (`4645:37214`), **Material 3 Design Kit** (`4645:88169`).

---

## 1. Legacy Audit (Foundations File `AyFaSmfDUlTax3GpKhRdHI`)

Before proposing new sets, we audited all existing feedback and loading frames in the Foundations Figma file.

| Component | Legacy Page & Node ID | What is on Canvas | Findings & Issues |
|---|---|---|---|
| **Alert** (Web) | `↳ Banners` (`1268:3453`) → `Banner` (`3284:367`) | 5 variants (`1015 × 72`): `State = Success · Error · Warning · Info · State5` (Neutral). Rounded box (`radius 8`), 1 px role border, light tint fill, leading status icon (`24 px`), 1-line message in role text color, trailing text `Button`, trailing `✕` icon button. | Single-line only (no title). `State5` is an unnamed neutral state with a `lightbulb` icon. Uses legacy colour styles (`Green/Green 50`, etc.) instead of semantic variables. |
| **Alert / Notification card** (Web) | `↳ Cards` (`1268:3237`) → `Notification Toast` (`3567:1040`) | 5 variants (`452 × 135`): `Type = Success · Failed · Warning · Info · Neutral`. White card with 1 px neutral border, leading status icon in a tinted circle, **Title + Description**, top-end `✕` close button, bottom-end outlined `Button`. | Gives us the **multi-line titled Alert** anatomy (Title + Description + Action + Close), whereas `3284:367` is single-line. |
| **Status Banner** (Mobile) | `↳ Banners` (`4131:28945`) → `Status Banners / Mobile` (`4595:1329`, 6 variants `320 × 48`, LTR & RTL) + `Status Banners` (`4131:28965`, 3 variants `388 × 48`) | `Status = Pending · Approved · Rejected` × `Direction = Ltr · Rtl`. Shows a status dot + label (`Approved`) on one side and an approver `Avatar + Name` (`Ali Al-Qahtani`) on the other. | This is **not** a general Alert banner. It is a domain-specific **request approval header strip** placed at the top of `Request Details` (`4615:54`). Mobile still needs a general inline `Alert` for forms, sections, and Dialogs. |
| **Snackbar** (Mobile) | `↳ Snackbar` (`4131:29001`) → `Notification Bar / Mobile` (`4131:29007`, 24 variants `358 × 56`) | `States = Success · Wrong · Warning · Information` × `Control State = Default · Action Pressed · Dismiss Pressed` × `Direction = LTR · RTL`. Solid green / red / orange / blue fill, leading status icon, message text, `Retry` button, `✕` button. | **Contrast failure & token mismatch:** dark text (`#191D23`) on solid green (`#16A34A`) and blue (`#2563EB`) fails WCAG AA 4.5:1. Also conflicts with `colors.md`, which defines Snackbar on `color-surface-inverse` (`#141414` Light / `#FFFFFF` Dark) with `color-text-inverse`. |
| **Empty state** (Web) | `↳ Table` (`1276:34`) → `TableEmpty` (`4101:2812`, `800 × 240`), `Table/Empty` (`4163:15687`, `1200 × 240`), `Table / Web` (`4637:1501`) | Centered vertical stack inside the table body: circular icon/illustration placeholder (`4101:2812`), title (`No data found` / `No matching results` / `Unable to load table data`), helper line (`Try adjusting your filters or search terms.`). | No standalone `Empty state` component set exists yet; only embedded table frames without action buttons (`Clear filters` / `Add employee`). |
| **Skeleton** (Web & Doc Kit) | `↳ Table` (`1276:34`) → `TableLoading` (`4101:2817`), `Table/Loading` (`4163:15690`), `Table / Web` `State=Loading` (`4637:1412`); Doc Kit `Doc/Skeleton` (`cdb8f9c...`) | Table rows filled with grey rounded bars (`#F0F0F0` / `#E5E7EB`). Doc Kit has `Doc/Skeleton` with `Shape = Line · Block · Avatar`. | No product `Skeleton` component set exists in the Web, Tablet, or Mobile libraries yet. |

---

## 2. Platform & Native Matrix

Per `2026-11-12-next-waves-plan.md` (§2–§3) and **N-01 / N-02**:
- **Alert**, **Empty state**, and **Skeleton** live inside page/card content (not OS system chrome). They use **one Biowave design** across Web, Tablet, and Mobile.
- **Snackbar** on Mobile is a system-level transient overlay (`layer-toast` 1500) and gets **`OS = iOS · Android`** variants:
  - **Android:** Material 3 `Snackbar` at the bottom (`color-surface-inverse`, `elevation-3`, `radius-xs` 4 px or `radius-md` 8 px, 1–2 lines, optional single text action, optional `✕`).
  - **iOS:** iOS has no native snackbar (`2026-11-12-next-waves-plan.md` §1 & §3). We use a **Biowave floating toast** (`color-surface-inverse`, `elevation-3`, pill/rounded `radius-xl` 12 px or `radius-2xl` 16 px, optional leading status icon, message, optional action/dismiss).

| Component | Web (`3-web-components`) | Tablet (`4-tablet-components`) | Mobile (`5-mobile-components`) | Mobile `OS = iOS · Android`? |
|---|---|---|---|---|
| **Alert** | ✓ Inline banner (page, section, form summary, or inside `Dialog` / `Side sheet`) | ✓ Same anatomy, touch target `48 × 48` on actions | ✓ Same anatomy, touch target `48 × 48`, actions stack below text when needed | **No** — one Biowave design (content component) |
| **Snackbar** | ✓ Floating bar at bottom-end or bottom-center (`layer-toast` 1500) | ✓ Floating bar at bottom (`layer-toast` 1500) | ✓ Floating toast/bar (`layer-toast` 1500) | **Yes** — **Android** = M3 Snackbar; **iOS** = Biowave floating toast |
| **Empty state** | ✓ Full-page / section (`md`) and compact table/card (`sm`) | ✓ Same (`120 × 120` illustration in `md`) | ✓ Same (`120 × 120` illustration in `md`) | **No** — one Biowave design |
| **Skeleton** | ✓ `Line · Circle · Block` building blocks | ✓ Same | ✓ Same | **No** — one Biowave design |

---

## 3. Proposed Component Designs & Token Bindings

### 3.1 Alert (`alert`)

An inline status banner that stays visible until the condition resolves or the user dismisses it. Used at the top of a page or section, above a form as an error summary (`a11y.md` §Forms), or inside the `Alert` slot of `Dialog` (`dialog.md` A2 / A4.4).

- **Statuses:** `info` · `success` · `warning` · `error` · *(plus optional `neutral` — see **FB-01**)*.
  - Icons (`icons.md`): `info` (`info`) · `check_circle` (`success`) · `warning` (`warning`) · `error` (`error`) · `info` or `lightbulb` (`neutral`).
- **Layout modes:**
  - **Single-line (`Show title = false`):** leading icon + body message + optional trailing action `Button` + optional close `Icon button` (matches legacy `Banner` `3284:367`).
  - **Titled (`Show title = true`):** leading icon + vertical stack (`Title` + `Description`) + optional action `Button` + optional close `Icon button` (matches legacy `Notification Toast` `3567:1040` and `Dialog` warning/error alerts).
- **Semantic tokens (`colors.md`, `spacing.md`, `radius.md`, `typography.md`):**
  - Container fill: `color-background-{info|success|warning|error}-subtlest` (and `color-surface-subtle` or `color-background-base-subtlest` if `neutral` is included).
  - Border: `border-width-default` (1 px) solid `color-border-{info|success|warning|error}` (≥ 3:1 against surfaces).
  - Radius: `radius-md` (8 px — matches legacy `Banner` and fits cleanly inside `Dialog`) or `radius-2xl` (16 px — `radius.md` *"banner inside content"*); see **FB-02**.
  - Leading icon: `size-icon-lg` (24 px), `color-icon-role-{info|success|warning|error}`.
  - Text: title `title-sm` (or `label-lg`), description `body-md` on Web / `body-lg` on Tablet & Mobile (`typography.md` lines 81–82). Title & description color: `color-text-default` (or `color-text-role-{status}` — see **FB-02**).
  - Padding & gaps: padding `spacing-xl` (16 px) or `spacing-lg` (12 px); icon-to-text gap `spacing-lg` (12 px); content-to-action gap `spacing-xl` (16 px, `spacing.md`).
  - Actions: reuses `Button` (`sm`, `text` or `outlined`) and `Icon button` (`sm`, `standard`, `close` icon).
- **Accessibility:** `role="status"` (`aria-live="polite"`) for `info` / `success`; `role="alert"` (`aria-live="assertive"`) for `warning` / `error` when dynamically injected; status is conveyed by icon + role prefix + text, never color alone (`a11y.md`).

### 3.2 Snackbar (`snackbar`)

A brief, auto-dismissing feedback bar at `layer-toast` (1500) that confirms an action (`Request submitted`, `Device synced`, `Employee removed — Undo`) without interrupting the user's workflow.

- **Surface & Contrast (Foundations vs Legacy — see FB-04):**
  - `2-foundations/guidelines/colors.md` explicitly assigns **Snackbar** to the inverse surface:
    - Container fill: `color-surface-inverse` (`#141414` in Light, `#FFFFFF` in Dark).
    - Message text: `color-text-inverse` (`#FFFFFF` in Light, `#141414` in Dark — **18.6:1** contrast).
    - Leading icon / close icon: `color-icon-inverse`.
    - Elevation: `elevation-3` (`elevation.md`: *"Dropdown menu, popover, toast/snackbar, floating toolbar"*).
  - If a status indicator is needed on the inverse surface (`Default · Success · Warning · Error`), a leading status icon (`check_circle`, `warning`, `error`, `info`) can be shown while keeping the high-contrast `color-surface-inverse` container.
- **Typography & Sizing:**
  - Message: 1–2 lines, `body-sm` on Web (`typography.md` line 83: *"Snackbar on Web"*), `body-md` on Tablet and Mobile.
  - Max width: `size-container-sm` (480 px) or `size-container-xs` (384 px, `size.json`: *"Small dialogs, toasts"*) on Web and Tablet; full width minus `spacing-xl` (16 px) horizontal margins on Mobile.
  - Min height: `48 px` (`size-control-lg`). Padding: horizontal `spacing-xl` (16 px), vertical `spacing-md` (8 px) or `spacing-lg` (12 px); content-to-action gap `spacing-xl` (16 px, `spacing.md`).
  - Optional action: at most **one** short text button (`Undo`, `Retry`, `View`). Never place two buttons in a Snackbar (`Dialog` is used for blocking two-action decisions).
  - Optional dismiss `✕` icon button.
- **Timing & Motion (`motion.md`, `a11y.md`):**
  - Enter: `motion-duration-md` (200 ms) `motion-easing-emphasized-decelerate`.
  - Exit: `motion-duration-sm` (100 ms) `motion-easing-standard-accelerate`.
  - Auto-dismiss: 4–6 seconds when text-only; pauses on hover/focus; **does not auto-dismiss** (or stays ≥ 10 s) when an action button (`Undo` / `Retry`) is present so keyboard and screen-reader users can reach it (WCAG 2.2.1).

### 3.3 Empty state (`empty-state`)

Explains why a page, section, Data table, search result, or card has no items to show, and offers the next step.

- **Sizes (`Size = md · sm` — see FB-06):**
  - **`md` (Page / Section):** used for empty modules, first-use screens, and full-section zero-results.
    - Visual slot: Spot illustration (`160 × 160` on Web, `120 × 120` on Tablet & Mobile per `illustration.md`) **or** large icon badge (`size-icon-3xl` 48 px in a `color-surface-subtle` circle).
    - Title: `title-lg` (`color-text-default`).
    - Description: `body-lg` (`color-text-subtle`), max width `size-container-xs` (384 px) or `size-container-sm` (480 px), centered, 1–2 sentences (`content.md`: state what is empty and what to do next).
    - Spacing (`spacing.md`): visual-to-text `spacing-3xl` (24 px), title-to-description `spacing-md` (8 px), text-to-actions `spacing-2xl` (20 px).
  - **`sm` (Compact — Data table / Card / Side sheet / Panel):** replaces the ad-hoc `TableEmpty` (`4101:2812`) and `Table/Empty` (`4163:15687`) frames.
    - Visual slot: Icon (`size-icon-2xl` 40 px, `icons.md`: *"Empty state inside a small card or table"*, `color-icon-subtlest` in a `color-surface-subtle` circle, or hidden via `Show visual = false`).
    - Title: `title-sm` or `title-md` (`color-text-default`).
    - Description: `body-md` (`color-text-subtlest`).
    - Spacing: visual-to-text `spacing-xl` (16 px), title-to-description `spacing-xs` (4 px), text-to-actions `spacing-xl` (16 px).
- **Actions:** optional primary `Button` (`Filled`, e.g. `Add employee`, `Create request`) and optional secondary `Button` (`Outlined` or `Text`, e.g. `Clear filters`, `Learn more`).

### 3.4 Skeleton (`skeleton`)

A low-contrast placeholder shape that previews the layout of text, avatars, cards, and table rows while data is loading (`aria-busy="true"`). Used when loading takes longer than 300 ms and the layout shape is known (`Progress` is used when the shape is unknown or for inline button/field spinners).

- **Shapes (`Shape = line · circle · block`):**
  - **`line` (Text line):** rounded bar with `radius-xs` (4 px), height matching the target text line (`16 px` body/label, `24 px` title, `12 px` caption) and configurable width (`100%`, `75%`, `50%`).
  - **`circle` (Avatar / Icon placeholder):** equal width & height with `radius-full` (`9999 px`), matching avatar/icon sizes (`24`, `32`, `40`, `48`, `64`).
  - **`block` (Media / Card / Rectangular block):** rectangular container with `radius-md` (8 px) or `radius-2xl` (16 px) for cards, thumbnails, and chart blocks.
- **Tokens (Audit item S-06 — see FB-07):**
  - **Option A (No new tokens — use existing semantic tokens):**
    - Base fill: `color-background-base-subtle` (`neutral.100` `#EFEFEF` in Light / `neutral.800` in Dark).
    - Shimmer highlight / pulse peak: `color-background-base-subtlest` (`neutral.50` `#F7F7F7` in Light) or `color-border-default` (`neutral.200`).
    - Animation duration: `motion-duration-progress` (1000 ms, `motion.json`) with `motion-easing-linear`.
  - **Option B (Add dedicated `color-skeleton-base` and `color-skeleton-highlight` semantic tokens per `_audits/foundations.md` S-06).**
- **Reduced Motion (`motion.md`, `a11y.md`):**
  - When `prefers-reduced-motion: reduce` (Web) or `MediaQuery.disableAnimations` (Flutter) is active, the moving shimmer stops and Skeleton renders a static `color-background-base-subtle` fill (or a gentle opacity fade without spatial movement).

---

## 4. Decisions — Approved by Hassan (2026-11-14) (`FB-01` … `FB-07`)

All 7 recommendations below were **approved by Hassan on 2026-11-14** ("تمام"):

| ID | Topic | Question | Approved Decision |
|---|---|---|---|
| **FB-01** | **Alert statuses** | Should `Alert` have **4 semantic statuses** (`info · success · warning · error`) or **5 statuses** (adding `neutral` as in legacy Web `Banner` `3284:367` and `Notification Toast` `3567:1040`)? | **Approved — 5 statuses (`info · success · warning · error · neutral`)** so neutral system hints / tips (with `lightbulb` / `info` icon on `color-surface-subtle` + `color-border-default`) are covered without misusing `info` blue. |
| **FB-02** | **Alert layout, radius & text color** | 1) Support both single-line (`Show title = false`) and titled (`Show title = true`) in one `Alert` set?<br>2) Corner radius: `radius-md` (8 px, matching legacy `Banner` and fitting cleanly inside `Dialog`) or `radius-2xl` (16 px)?<br>3) Body text color: `color-text-default` (easier to read for 2–3 lines, with status icon + border + title carrying the role color) or `color-text-role-{status}` for all text? | **Approved:**<br>**1) Yes**, boolean `Show title` covers both legacy `Banner` and `Notification Toast`.<br>**2) `radius-md` (8 px)** so one `Alert` works both on pages and inside `Dialog` (`radius-2xl`).<br>**3) Title in `color-text-role-{status}`, description in `color-text-default`** (or `color-text-role-{status}` when single-line). |
| **FB-03** | **Mobile legacy `Status Banners` (`4595:1329`)** | Legacy Mobile `↳ Banners` has `Status Banners / Mobile` (`Approved / Pending / Rejected` + Approver Avatar & Name for `Request Details`). How should we handle it? | **Approved:** Build the standard inline **`Alert`** on Mobile (matching Web & Tablet), and **keep `Status Banners / Mobile` untouched as a legacy/domain request-status header** (or re-skin it later in the Request Details screen wave), rather than mixing approver avatars into `Alert`. |
| **FB-04** | **Snackbar surface: Inverse (`colors.md`) vs Colored status fills (Legacy)** | Legacy `Notification Bar / Mobile` (`4131:29007`) used solid green/red/orange/blue fills with dark text (which fails WCAG 4.5:1 contrast), while `2-foundations/guidelines/colors.md` specifies `color-surface-inverse` (`#141414` Light / `#FFFFFF` Dark) with `color-text-inverse`. Which do we use? | **Approved — Follow Foundations (`color-surface-inverse` + `color-text-inverse`)** for 18.6:1 contrast and M3 alignment, with an optional leading status icon (`check_circle`, `warning`, `error`, `info`) when a status cue is needed. |
| **FB-05** | **Snackbar on Mobile (`OS = iOS · Android`)** | Confirm the native split on Mobile (`2026-11-12-next-waves-plan.md` §3): **Android** = M3 `Snackbar` at bottom (`radius-xs` 4 px or `radius-md` 8 px); **iOS** = Biowave floating toast (`radius-xl` 12 px or pill, at bottom above tab bar or top below status bar)? | **Approved:** `OS = Android` (M3 Snackbar, `radius-md` 8 px, bottom) and `OS = iOS` (Biowave floating toast, `radius-xl` 12 px, floating with leading icon). |
| **FB-06** | **Empty state sizes & table reuse** | Should `Empty state` have two sizes — **`md`** (full page / section with `160×160` Web / `120×120` Touch illustration or `48 px` icon) and **`sm`** (compact for Data table `Table/Empty`, cards, and side sheets with `40 px` icon)? | **Approved — Yes (`Size = md · sm`)**, so Data table (Wave 10) and Cards can slot `Empty state` (`sm`) directly instead of drawing custom empty frames. |
| **FB-07** | **Skeleton shapes & tokens (S-06)** | 1) Confirm shapes: `Shape = line · circle · block`?<br>2) Use existing semantic tokens (`color-background-base-subtle` + `color-background-base-subtlest` + `motion-duration-progress`) or add new `color-skeleton-*` tokens to Foundations? | **Approved:**<br>**1) `Shape = line · circle · block`**. <br>**2) Reuse existing `color-background-base-subtle` / `color-background-base-subtlest` and `motion-duration-progress`** so we do not need a Foundations token rebuild and library republish before Wave 9. |
