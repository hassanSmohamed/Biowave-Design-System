# Input catalog and gap analysis — all input types × Web · Tablet · Mobile

> Agent summary: the full list of input types a product UI can need, checked against (1) the Gemini screen report `ui_input_inventory_and_gap_analysis_report.md` (product screens, 2026-11-08) and (2) what Biowave already has or has planned (`_audits/input-family.md` I-01 … I-14, ROADMAP §4–§8, the three Text field specs). For each type: where it lives in Biowave, its status, its platforms and its props. Ends with the gaps and the decisions **IC-01 … IC-12** to close before the next input specs. Read-only audit: no spec, token or Figma file was changed.

| Field | Value |
|---|---|
| Date | 2026-11-08 |
| Inputs | Gemini screen report (uploaded by the design lead) · `_audits/input-family.md` · `ROADMAP.md` v3 · `3-/4-/5-…/components/text-field/text-field.md` v1.2 · section README status tables |
| Platforms | **W** Web (React + MUI) · **T** Tablet (Flutter + M3) · **M** Mobile (Flutter + M3) — every input below targets all three unless the table says otherwise |
| Plan status | **Draft** — waiting for IC-01 … IC-12 |

## 1. Platform agreement

All input components ship on **W, T and M**, with one Part A (guidelines) per component copied to the three files (AGENTS rule 10). The only exceptions are listed in §3 (`—` in a platform column). Rules that already hold for every field (I-05, Text field A8):

| Rule | Web | Tablet | Mobile |
|---|---|---|---|
| Sizes | `sm` · `md` · `lg` | `md` · `lg` | `lg` only (48 touch target) |
| Default size | `md` | `lg` | `lg` |
| Hover state | ✓ | — (pointer optional) | — |
| Focus | Border → `color-border-focus` (I-04) | same | same |
| Keyboard | Physical; Tab order | Physical + on-screen | On-screen keyboard matched to the value (`inputMode` / `TextInputType`), action key Next / Done |
| Pickers (list, date, time) | Popover anchored to the field | Popover or dialog | **Bottom sheet** or full-screen dialog (IC-08) |
| Resize handle (multiline) | ✓ | — | — |
| Layout | Parent decides width; multi-column forms | 1–2 columns | Full width, one field per row |

## 2. Status today (from the section README tables, 2026-11-08)

| Input | Web | Tablet | Mobile |
|---|---|---|---|
| Text field (incl. Text area, password, prefix/suffix, counter) | Spec Finished · **Code Approved** · Figma Planned | Spec Finished · Code Planned | Spec Finished · Code Planned |
| Every other input type in §3 | No spec yet | No spec yet | No spec yet |

The roadmap scheduled Checkbox · Radio · Switch (Day 6), Select (Day 7), Verification code and Segmented button (Day 8). None of them has a spec yet, so the input family is the main open block of Phase 1.

## 3. Full catalog

Legend — **Status**: ✅ spec exists · 📅 on the roadmap (day) · 🗂 backlog (after 1.0) · ➕ new, needs a decision · ✗ not needed. **Screens**: ✓ seen in the Gemini report / legacy screens.

### 3.1 Text entry

| Input type | Screens | Biowave home | Status | W | T | M |
|---|:-:|---|---|:-:|:-:|:-:|
| Text field (single line) | ✓ | Text field | ✅ | ● | ● | ● |
| Text area (multiline + counter) | ✓ | Text field `multiline` (I-06) | ✅ | ● | ● | ● |
| Password (show/hide) | ✓ | Text field `type=password` + `passwordToggle` | ✅ | ● | ● | ● |
| Email · URL · plain number | ✓ | Text field `type` / `inputMode` | ✅ | ● | ● | ● |
| Prefix / suffix text (`http://`, `SAR`, `kg`) | ✓ legacy | Text field `prefix` · `suffix` (I-12) | ✅ | ● | ● | ● |
| Field + attached button (Copy) | ✓ legacy | Text field `endButton` (I-14) | ✅ | ● | ● | ● |
| Field with scan / custom action | ✓ | Text field `action` (I-13) | ✅ | ● | ● | ● |
| Typed confirmation (Disconnect integration) | ✓ | Pattern "Destructive actions" (Day 21) = Dialog + Text field + rule | 📅 21 | ● | ● | ● |
| Search field | ✓ legacy | Search field | 📅 13 | ● | ● | ● |
| Number field with stepper (− / +) | — | ➕ Text field option or own component (IC-02) | ➕ | ● | ● | ● |
| Masked / formatted text (national ID, IBAN, IP, duration) | ✓ (IP, time) | ➕ Text field `mask` (IC-03) | ➕ | ● | ● | ● |
| IP address (4 segments) | ✓ | ➕ Text field + mask, not a segmented component (IC-04) | ➕ | ● | ● | — ? |
| Chat / message composer | ✓ | ➕ Message composer (IC-05) | ➕ | ● | ● | ● |
| Rich text editor | — | Backlog | 🗂 | | | |
| Inline edit (click text to edit) | — | — | ✗ (use Text field in a Dialog / Side sheet) | | | |

### 3.2 Formatted and structured entry

| Input type | Screens | Biowave home | Status | W | T | M |
|---|:-:|---|---|:-:|:-:|:-:|
| Verification code / OTP / PIN (4 · 6 cells) | ✓ | Verification code (I-08) | 📅 8 | ● | ● | ● |
| Phone number (country Select + number) | ✓ | Phone field (I-07) | 📅 13 | ● | ● | ● |
| Date (field + calendar) | ✓ | Date picker | 📅 14 | ● | ● | ● |
| Time of day | ✓ | Time picker | 📅 15 | ● | ● | ● |
| Date range | — | Date range picker | 📅 15 | ● | ● | ● |
| Duration `00 : 00 : 00` (hours · min · sec) | ✓ | ➕ not covered by Time picker (IC-06) | ➕ | ● | ● | ● |
| Date + time together | — | Date picker + Time picker side by side (layout) | ✗ new component | | | |
| Month / year only | — | Date picker `views` option (decide on Day 14) | 📅 14 | ● | ● | ● |

### 3.3 Selection

| Input type | Screens | Biowave home | Status | W | T | M |
|---|:-:|---|---|:-:|:-:|:-:|
| Select (single, closed list) | ✓ | Select | 📅 7 | ● | ● | ● |
| Multi-select with chips | ✓ | Autocomplete `multiple` (I-01) | 📅 13 | ● | ● | ● |
| Autocomplete / combobox (search a long list) | ✓ legacy | Autocomplete | 📅 13 | ● | ● | ● |
| Free-entry tags (type and press Enter) | ✓ legacy | Autocomplete `freeSolo` + `multiple` | 📅 13 | ● | ● | ● |
| Checkbox (+ group) | ✓ | Checkbox | 📅 6 | ● | ● | ● |
| Radio group | ✓ | Radio | 📅 6 | ● | ● | ● |
| Switch / toggle | ✓ | Switch | 📅 6 | ● | ● | ● |
| Segmented control (single or multi, e.g. weekend days) | ✓ | Segmented button (incl. day picker, P-05) | 📅 8 | ● | ● | ● |
| Radio cards / visual selector (device model, fingerprint) | ✓ | Card `selectable` (P-05) — needs single **and** multi mode (IC-07) | 📅 5 | ● | ● | ● |
| Filter chips | — | Chip `filter` | 📅 4 | ● | ● | ● |
| Slider / range slider | — | Slider (designed in Figma) | 🗂 | | | |
| Rating | — | Backlog | 🗂 | | | |
| Color picker | — | — | ✗ | | | |
| Transfer list (two lists) | — | — | ✗ (use Autocomplete multi) | | | |

### 3.4 Uploads and media

| Input type | Screens | Biowave home | Status | W | T | M |
|---|:-:|---|---|:-:|:-:|:-:|
| File / document upload (dropzone + file list + progress) | ✓ | File upload | 📅 16 | ● | ● | ● |
| Avatar / photo upload | ✓ | File upload `variant=avatar` (P-05) | 📅 16 | ● | ● | ● |
| Camera capture (mobile) | — | File upload source option on T/M | 📅 16 | — | ● | ● |
| Location picker (field + map) | ✓ | Text field `action` (map icon) + Map in Dialog; Map is backlog (P-05) | 🗂 (IC-09) | ● | ● | ● |
| Fingerprint / biometric enrollment | ✓ | Biometric enrollment pattern | 🗂 | | | |
| Signature pad | — | — | ✗ | | | |

## 4. Gemini report — check item by item

| Report item | Verdict | Where it is handled |
|---|---|---|
| 1.1 Standard text, password, text area + counter | ✅ Already in Text field (B1: `passwordToggle`, `maxLength` + `showCounter`, `minRows`/`maxRows`, `resize`) | text-field.md |
| 1.1 Chat input | ➕ Gap | IC-05 |
| 1.1 Destructive confirmation input | ✅ Pattern, not a component — Text field + exact-match rule in a Dialog | ROADMAP Day 21 |
| 1.2 Phone · OTP | 📅 Phone field Day 13 · Verification code Day 8 | input-family I-07, I-08 |
| 1.2 IP address (4 boxes) | ➕ Gap — recommend a masked Text field, not 4 boxes (paste, screen readers, RTL) | IC-03, IC-04 |
| 1.2 Time & date with mask `00 : 00 : 00` | Date/time ✅ planned; the three-part **duration** is not | IC-06 |
| 1.3 Single / multi select, toggle, segmented, checkboxes | 📅 all planned (Day 6–8, 13) | ROADMAP |
| 1.3 Radio cards | 📅 Card selectable — confirm it covers single (radio) and multi (checkbox) | IC-07 |
| 1.4 File upload, avatar upload | 📅 File upload Day 16 incl. avatar variant | P-05 |
| 1.4 Location picker | 🗂 Map is backlog | IC-09 |
| 2.1 Missing states (hover, focus, disabled, error, success) | Hover · Focus · Disabled · Error · Read-only are already the field model (I-05). **Success is not** | IC-10 |
| 2.2 Required indicator inconsistent | Text field has `required` (asterisk). There is no `optional` marker yet | IC-01 |
| 2.2 "Placeholder" written as a value | ✅ Token exists: placeholder uses `color-text-subtlest`; content rule in Text field A6. Fix the product mockups | text-field A6 |
| 2.2 Upload looks like a text field | ✅ File upload will be a dropzone, not a field | Day 16 |
| 2.2 2–4 options hidden in a dropdown | ➕ Add as a "When not to use" rule in Select A3 | IC-11 |
| 2.2 Helper text vs "i" tooltip | ✅ Decided: help icon in the label row with a tooltip, supporting text for what everyone needs (I-11, Text field A4.3) | text-field A4.3 |
| 2.3 "Rest" → "Reset", "Remotely Work" → "Remote work" | Product copy, not the design system — send to the product team. Button labels follow `content.md` | — |
| 3.5 State matrix for IP, OTP, multi-select | Each component spec carries its own B4 States table and Figma `State` axis | per spec |

## 5. Props — shared field model

Every field component (Text field, Select, Autocomplete, Search field, Phone field, Verification code, Date / Time picker fields, Number field, File upload field) reuses the shared field parts from Text field (I-09: `.Field/Label`, `.Field/Container`, `.Field/Supporting text`). They all take these props, with the same names on every platform:

| Prop (code) | Figma property | Type | Notes |
|---|---|---|---|
| `label` · `hideLabel` | `Label` (text) · `Show label` | text · boolean | Static, above the field (I-02) |
| `required` | `Required` | boolean | Asterisk + native required |
| `optional` *(IC-01)* | `Optional` | boolean | "(Optional)" after the label — only if IC-01 keeps it |
| `helpText` · `helpLabel` | `Help icon` | text | Help icon + Tooltip in the label row (I-11) |
| `helperText` | `Supporting text` | text | Hint, or the error message when `error` |
| `error` | `Error` | boolean | Error border + icon before the message (not inside the field) |
| `size` | `Size` | `sm` · `md` · `lg` | Per §1 |
| `disabled` · `readOnly` | `State` = Disabled · Read-only | boolean | Disabled wins |
| — | `State` = Default · Hover · Focus | variant | Hover web only |
| — | `Filled` | boolean | Value vs placeholder (not a state, IG-02) |
| — | `Language` | `EN` · `AR` | B-04 |
| `fullWidth` | — | boolean | Default true |
| `id` · `name` · `value` · `defaultValue` · `onChange` · `onBlur` · `onFocus` | — | native | Flutter: `controller`, `focusNode`, `onChanged` |
| `placeholder` | `Placeholder` (text) | text | Format hint only, `color-text-subtlest` |

## 6. Props — by input type (only what each adds to §5)

### 6.1 Select (Day 7)
| Prop | Type | Notes |
|---|---|---|
| `options` | `{ value, label, icon?, avatar?, dot?, disabled? }[]` | Leading visual per option: icon · avatar · status dot (legacy Dropdown `Type`) |
| `value` / `onChange` | value | Single value only — multi goes to Autocomplete |
| `startAdornment` | icon | Leading icon in the closed field |
| `open` · `onOpen` · `onClose` | boolean · callbacks | Figma: `State=Open` (chevron rotated) |
| `emptyText` | text | Shown when there are no options |
| `renderValue` | function | Custom closed display (web) |
| Mobile | — | Opens a bottom sheet list (IC-08) |

### 6.2 Autocomplete — single, multi, tags (Day 13)
| Prop | Type | Notes |
|---|---|---|
| `options` · `getOptionLabel` | list · function | |
| `multiple` | boolean | Selected values shown as dismissible Chips inside the field |
| `freeSolo` | boolean | Lets the user add values not in the list (tags) |
| `limitTags` | number | Collapse to "+N" |
| `loading` · `loadingText` · `noOptionsText` | boolean · text | Async search (Progress inside the list) |
| `onInputChange` | callback | Server search |
| `disableCloseOnSelect` | boolean | Default on when `multiple` |
| Figma | `Selection` = Single · Multi · `Tags count` | |

### 6.3 Verification code (Day 8)
| Prop | Type | Notes |
|---|---|---|
| `length` | `4` · `6` | Figma `Digits` |
| `value` · `onChange` · `onComplete` | string · callbacks | `onComplete` fires when all cells are filled |
| `mask` | boolean | Hide digits (PIN) |
| `autoFocus` | boolean | |
| `inputMode` | `numeric` (default) | `autocomplete="one-time-code"` on web, SMS autofill on Flutter |
| Behavior | — | Auto-advance, Backspace goes back, paste fills all cells, digits always LTR + Western (D-10) |
| Figma per cell | `.Verification code/Cell` · `State` · `Filled` · `Error` | |

### 6.4 Phone field (Day 13)
| Prop | Type | Notes |
|---|---|---|
| `country` · `onCountryChange` · `defaultCountry` | ISO code | Country Select (flag + dial code) |
| `countries` | ISO list | Limit the list (e.g. GCC first) |
| `value` | E.164 string | Formatted per country while typing |
| Behavior | — | Number always LTR inside an RTL form; dial code part of the same field |

### 6.5 Search field (Day 13)
| Prop | Type | Notes |
|---|---|---|
| `onSearch` | callback | Enter / submit |
| `clearable` | boolean | Default on |
| `shortcut` | text | Web only (`⌘K`), visual hint |
| `loading` | boolean | Spinner replaces the search icon |
| `variant` | `field` · `bar` | `bar` = M3 Search bar on T/M |

### 6.6 Number field (IC-02)
| Prop | Type | Notes |
|---|---|---|
| `min` · `max` · `step` | number | |
| `stepper` | boolean | − / + Icon buttons at the ends |
| `precision` | number | Decimals |
| `prefix` · `suffix` | text | From Text field (`SAR`, `hrs`) |
| Behavior | — | Western digits (D-10), arrow keys on web, numeric keypad on T/M |

### 6.7 Masked text (IC-03) — Text field option
| Prop | Type | Notes |
|---|---|---|
| `mask` | pattern | e.g. `000.000.000.000` (IP), `00:00:00` (duration) |
| `unmask` | boolean | Return the raw value |
| Behavior | — | Fixed separators shown as placeholder, always LTR, paste is parsed |

### 6.8 Date picker · Time picker · Date range (Day 14–15)
| Prop | Type | Notes |
|---|---|---|
| `value` · `onChange` | date / time | |
| `minDate` · `maxDate` · `disabledDates` | date · function | |
| `format` | text | Display format; Western digits (D-10) |
| `views` | `day` · `month` · `year` | Month/year only pickers |
| `firstDayOfWeek` | number | Saturday / Sunday for the region |
| `ampm` · `minutesStep` · `seconds` | boolean · number · boolean | Time picker |
| `startLabel` · `endLabel` | text | Date range |
| Field part | — | Text field + calendar / clock `action`; typing allowed on web |

### 6.9 Duration field (IC-06)
| Prop | Type | Notes |
|---|---|---|
| `units` | `h:m` · `h:m:s` | |
| `value` | seconds (number) | |
| `max` | number | |
| Recommendation | — | Build as Text field + `mask` (IC-03), not a new component |

### 6.10 Checkbox · Radio · Switch (Day 6)
| Component | Props |
|---|---|
| Checkbox | `checked` · `indeterminate` · `onChange` · `label` · `description` · `disabled` · `error` · `size` · `value` · `name` |
| Checkbox group | `label` (legend) · `helperText` · `error` · `required` · `orientation` (`vertical` · `horizontal`) · `children` |
| Radio group | `label` (legend) · `value` · `onChange` · `options` / `children` · `orientation` · `helperText` · `error` · `required` · `disabled` |
| Radio | `value` · `label` · `description` · `disabled` |
| Switch | `checked` · `onChange` · `label` · `description` · `labelPlacement` (`start` · `end`) · `disabled` · `size` · `icon` (thumb icon on T/M) |
| Figma | `Checked` = Off · On · Indeterminate · `State` = Default · Hover · Focus · Pressed · Disabled · `Error` · `Label` · `Description` |

### 6.11 Segmented button (Day 8)
| Prop | Type | Notes |
|---|---|---|
| `options` | `{ value, label?, icon? }[]` | Icon-only needs `aria-label` |
| `value` · `onChange` | value or list | |
| `multiple` | boolean | Weekend days / day picker |
| `size` · `fullWidth` · `disabled` | | |
| Limit | 2–5 segments | More → Select or Chip filter |

### 6.12 Card selectable — radio cards (Day 5, IC-07)
| Prop | Type | Notes |
|---|---|---|
| `selectionMode` | `single` · `multiple` | Radio or Checkbox semantics |
| `selected` · `onSelect` | boolean · callback | |
| `media` | image · icon | Thumbnail (device model, finger) |
| `title` · `description` | text | |
| `indicator` | `radio` · `checkbox` · `check-badge` · `none` | Selected border always shown |
| `disabled` | boolean | |
| Group | `CardGroup` with `label`, `value`, `onChange`, `error`, `helperText` | So a card set behaves like a Radio group |

### 6.13 File upload (Day 16)
| Prop | Type | Notes |
|---|---|---|
| `variant` | `dropzone` · `field` · `avatar` | `avatar` = round, placeholder image, camera Icon button |
| `accept` · `maxSize` · `maxFiles` · `multiple` | | Shown as supporting text ("PDF, JPG · up to 5 MB") |
| `files` · `onChange` · `onRemove` | list · callbacks | File list rows with progress, error and delete |
| `status` per file | `uploading` · `done` · `error` | Progress (linear), retry |
| `sources` (T/M) | `files` · `camera` · `gallery` | Bottom sheet chooser |
| Behavior | — | Drag-and-drop on web only; whole dropzone is one button |

### 6.14 Message composer (IC-05)
| Prop | Type | Notes |
|---|---|---|
| `value` · `onChange` · `onSend` | | Enter sends on web, Shift+Enter new line |
| `maxRows` | number | Grows then scrolls |
| `onAttach` · `attachments` | callback · list | Attachment chips above the input |
| `emoji` | boolean | Emoji Icon button (prefix) |
| `sending` · `disabled` | boolean | |

## 7. Decisions needed (IC-01 … IC-12)

| ID | Question | Options | Recommendation |
|---|---|---|---|
| IC-01 | Required vs optional marking | (a) asterisk on required + one line "* Required" at form top; no Optional tag · (b) asterisk + `optional` prop for forms where most fields are required · (c) mark only optional | **(b)** — asterisk is the rule (report §3.1); add an `optional` boolean to the shared field parts for the edge case, never both on one form. Write it in the Forms pattern (Day 21) |
| IC-02 | Number field | (a) Text field `type=number` only · (b) Text field + `stepper` option · (c) own component | **(b)** — one option on Text field; no new Figma set, a `Stepper` boolean |
| IC-03 | Input mask | (a) `mask` option on Text field · (b) leave to apps | **(a)** — needed by IP, duration, national ID, IBAN; one implementation (web: `react-imask` or similar, Flutter: `mask_text_input_formatter`) |
| IC-04 | IP address | (a) one masked field · (b) four boxes like the screens | **(a)** — four boxes break paste, screen readers and RTL; the mask shows the dots |
| IC-05 | Chat / message composer | (a) new Phase 2 component · (b) backlog · (c) pattern from Text field + Icon buttons | **(a)** if Live chat ships with 1.0, otherwise **(b)** — product decision |
| IC-06 | Duration `00:00:00` | (a) Text field + mask · (b) part of Time picker · (c) own component | **(a)** |
| IC-07 | Radio cards | Card selectable covers single and multi + a group wrapper | ✓ confirm, add `selectionMode` + `CardGroup` to the Card spec |
| IC-08 | Select / Autocomplete / pickers on mobile | (a) bottom sheet · (b) anchored menu like web | **(a)** on Mobile, menu on Tablet and Web |
| IC-09 | Location picker | (a) wait for Map (backlog) · (b) Text field + action now, map later | **(b)** — the field works with address search (Autocomplete); the map Dialog comes with Map |
| IC-10 | Success / valid state | (a) green border state · (b) no success state; use a requirements checklist for passwords | **(b)** — fewer variants; green borders on every field add noise. The password rules list belongs to the Sign-in pattern (Day 23) |
| IC-11 | Select with 2–4 options | Rule in Select A3 "When not to use": 2–4 short options → Radio group or Segmented button | ✓ add the rule |
| IC-12 | Copy errors in product screens ("Rest", "Remotely Work") | Product team fixes; DS only owns `content.md` | ✓ send to product |

## 8. Suggested next steps

1. Close IC-01 … IC-12 with the design lead.
2. Update `ROADMAP.md`: Number field and mask as Text field 1.3 options (IC-02, IC-03); Message composer row or backlog (IC-05); note the schedule — Day 6–8 inputs (Checkbox, Radio, Switch, Select, Verification code, Segmented button) have no spec yet.
3. Text field 1.3 (all three files): `optional`, `stepper`, `mask` if accepted.
4. Write specs in this order — each reuses the parts before it: **Checkbox · Radio · Switch → Select → Verification code → Segmented button → Card selectable → Search field · Autocomplete · Phone field → Date · Time pickers → File upload**.
