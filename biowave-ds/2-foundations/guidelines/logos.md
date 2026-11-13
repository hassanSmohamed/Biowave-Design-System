# Logos

Status: **Figma component built** — `Logo` in **Biowave DS — Foundations** › `↳ Logo` (Layout `Horizontal` · `Vertical` · `Icon` × Color `Default` · `Brand` · `Black` · `White`). SVG / PNG asset files still to be added to `2-foundations/assets/logos/`.

## Figma component
| Layout | Use |
|---|---|
| Horizontal | Web App header logo block, login (127 × 36) |
| Vertical | Splash, onboarding (85 × 63) |
| Icon | Collapsed side navigation, app icon, favicon (36 × 36) |

| Color | Use |
|---|---|
| Default | Gradient symbol, navy wordmark — light surfaces |
| Brand | All navy — light surfaces, single colour |
| Black | Print and monochrome |
| White | Dark surfaces and `color-background-brand-default` |

Arabic wordmark and partner lock-ups are not in the set yet.

## Variants needed
| Variant | Use |
|---|---|
| Full logo (symbol + wordmark), Latin | Login, web header (en) |
| Full logo, Arabic wordmark | Login, web header (ar) |
| Symbol only | App icon, favicon, collapsed sidebar, splash |
| Monochrome (white / navy) | On brand or photo backgrounds |
| Partner lock-up (Biowave × client, e.g. Arana Security) | White-label tenants |

## Rules
- Clear space = height of the symbol's inner mark on all sides. Minimum size: 24px symbol, 96px full logo.
- Use navy logo on light surfaces, white logo on dark surfaces and `color-background-brand-default`.
- Never recolor outside approved colors, stretch, add effects, or **mirror in RTL** (logos keep their orientation; only placement moves to the start edge).
- Device-manufacturer logos (IDEMIA, Suprema, HID, STid…) belong to their owners: use official assets, unmodified, only to identify hardware.
- Provide SVG for web and Flutter, PNG @1x/2x/3x for platform app icons.
