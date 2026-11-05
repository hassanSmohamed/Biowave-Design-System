# Tokens

Design tokens are named design decisions. Biowave tokens follow the **W3C Design Tokens (DTCG) format** and live in `2-foundations/tokens/`. Everything else (CSS, TS, Dart, MUI theme, Material 3 theme, preview) is generated.

## Architecture

```
tokens/
├── primitives/      raw values, no meaning          primitive.color.primary.600, primitive.dimension.16
├── semantic/        meaning, theme-aware            color.background.brand.default, spacing.md, elevation.3
│   ├── color.light.json / color.dark.json           ← theme modes
│   └── elevation.light.json / elevation.dark.json
└── platform/        per-platform values             platform.font.size.body.md, platform.grid.columns
    ├── web.json  tablet.json  mobile.json           ← platform modes
```

| Layer | Who uses it | Rule |
|---|---|---|
| Primitive | Token maintainers only | Never referenced by components |
| Semantic | Components and apps | Always reference a primitive (alias `{primitive.…}`) |
| Platform | Generated typography/grid per platform | One file per platform, identical keys |
| Component | One component | Lives in `<name>.tokens.json` and aliases semantic tokens only (D-13). Figma and the component specs use it; code reads the semantic tokens directly |

Modes: **theme** (light, dark) × **platform** (web, tablet, mobile) × **language** (en, ar — affects font family, line height, letter-spacing only).

## Naming formulas

The JSON path is the source of every name. Figma and code derive their names from it, so a token is only ever named once. Biowave does not use an `object/base/modifier` formula, because foundation tokens belong to no object.

Rules for every platform:
- **Theme and language are modes.** `light`, `dark`, `en` and `ar` are never part of a name.
- **States use the system names:** `hovered`, `pressed`, `focused`, `disabled`.
- **Framework names stay as they are.** `palette.primary.main`, `action.hover` and `ColorScheme.primary` are MUI and Material names mapped to our tokens, not our naming.

### Source (JSON)
| Layer | Formula | Example |
|---|---|---|
| Primitive | `primitive.{category}.{ramp}.{step}` | `primitive.color.primary.600` |
| Semantic colour | `color.{group}.{role}.{state}` | `color.background.brand.hovered` |
| Semantic foundation | `{category}.{group}.{property}.{scale}`, unused parts skipped | `spacing.md`, `spacing.control.padding-inline.md` |
| Platform | `platform.{category}.{…}` | `platform.font.size.body.md` |
| Component | `{component}.{group}.{mode}.{part}.{state}` | `button.filled.brand.container.hovered` |

Segments are lowercase and dot-separated, with kebab-case inside a segment.

### Figma
Designer guide for the Figma file: [`Biowave-Figma-Token-Naming.png`](../../../figma-assets/Biowave-Figma-Token-Naming.png).

| Layer | Formula | Example |
|---|---|---|
| Primitive | Collection `_Primitive` › `{Group}/{ramp}/{step}` | `Colors/primary/600` |
| Semantic | Numbered collection, dots become `/` | `1. Themes` › `color/background/brand/hovered` |
| Platform | `platform` dropped, values held in modes | `5. Typography` › `font/size/body/md` |
| Text style | `{role}/{size}` | `body/md` |
| Component | Collection `{Component} / {Group}` · mode · variable `{part}/{state}` | `Button / Filled` · `brand` · `container/hovered` |

### Component token rules
**Every mode is a value of a component prop.** If a prop swaps a set of values, it is a mode. If there is no prop, the only mode is `default`. Button keeps `success`, `warning` and `info` modes in Figma until code adds those colours.

The collection name is always `{Component} / {Group}`, and the Group is one of these:

| Group | Use when | Modes | Variables | Example |
|---|---|---|---|---|
| `Size` | Dimensions change with the size prop | Size values | Dimensions only | `Button / Size › height` |
| Variant name | Colours change with the variant or a boolean such as `selected` | Colour values | `{part}/{state}` | `Button / Filled › container/hovered` |
| `Color` | Colours change with the colour prop and there are no variants | Colour values | `{part}/{state}` | `Link / Color › label/hovered` |
| `State` | Values change with state and there is no colour prop | State values | `{part}` | `Text field / State › border` |
| `Focus` | Focus ring values change with the colour prop | Colour values | `color` · `width` | `Button / Focus › color` |
| Part name | One part of a composite component | `default` | Part dimensions and colours | `Menu / Item › height` |

Check in this order: Part, Focus, Size, Variant, Color, State. The first match wins.

Allowed names:

| Kind | Values |
|---|---|
| Parts | `container` · `label` · `icon` · `border` · `state-layer` · `focus-ring`, plus parts of the component itself such as `placeholder` or `divider` |
| Dimensions | `size` · `height` · `width` · `padding` · `padding-inline` · `padding-block` · `gap` · `offset` · `inset` · `icon-size` · `radius` · `border-width` |
| States | `default` · `hovered` · `pressed` · `focused` · `visited` · `disabled` · `selected` |

- **Colour variable:** `{part}/{state}`, or `{part}` when it has no states.
- **Dimension variable:** `{dimension}`, or `{part}-{dimension}` when it belongs to one part, such as `focus-ring-radius`.
- **A family shares collections.** Icon button and Split button reuse `Button / *`.
- **A component owns only its own tokens.** Tooltip values live in `Tooltip / *`, not in the component that shows it.
- **A name is never both a token and a group.** `npm run component-tokens` fails on it.
- **Every variable has a description** in the group's `$descriptions`: what it is and where to bind it. `tokens.json` is the source; never edit a description in Figma.

`npm run component-tokens` fails on any name outside these rules.

### Web (CSS, TypeScript, MUI)
| Use | Formula | Example |
|---|---|---|
| CSS variable | `--bw-{token-in-kebab}` | `--bw-color-background-brand-hovered` |
| Platform CSS variable | `platform` dropped | `--bw-grid-columns` |
| TypeScript | `cssVars.{token.path}` | `cssVars.color.background.brand.hovered` |
| Text class | `.bw-text-{role}-{size}` | `.bw-text-body-md` |
| MUI typography | `{role}{Size}` | `<Typography variant="headingLg">` |
| MUI palette | MUI's own names, mapped to our tokens | `palette.primary.main` = `color.background.brand.default` |

### Flutter (Tablet, Mobile)
| Use | Formula | Example |
|---|---|---|
| Colours | `context.bw.colors.{pathInCamelCase}`, `color` dropped | `context.bw.colors.backgroundBrandHovered` |
| Static foundations | `Bw{Category}.{name}` | `BwSpacing.md`, `BwBorder.widthFocus` |
| Number-first scales | `2xl` becomes `xl2` | `BwRadius.xl2` |
| Text styles | `context.bw.text.{role}{Size}` | `context.bw.text.bodyMd` |
| Elevation | `context.bw.elevation.elevation{n}` | `context.bw.elevation.elevation3` |
| Material 3 | Material's own names, mapped to our tokens | `ColorScheme.primary` = `backgroundBrandDefault` |

## Token file format
```json
{
  "color": {
    "background": {
      "brand": {
        "default": { "$value": "{primitive.color.primary.600}", "$description": "Primary action fill." }
      }
    }
  }
}
```
Types used: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `shadow`, `number`.

## Workflow to change a token
1. Edit JSON in `tokens/`. Add or rename only through the Planner.
2. `npm run tokens` — regenerates outputs and runs checks (contrast, theme parity, platform parity).
3. Update the guideline page and `CHANGELOG.md`; record renames in `AUDIT.md`.
4. Mirror in Figma (variables) — keep the same names.

## Outputs
| Output | Path | Consumer |
|---|---|---|
| CSS variables | `web/src/generated/tokens.css` | Web apps (`--bw-*`) |
| TypeScript | `web/src/generated/tokens.ts` | MUI theme, components (`cssVars`, `themes`, `platforms`) |
| Dart | `flutter/lib/src/generated/bw_tokens.g.dart` | Flutter (`BwColors`, `BwTextStyles`, `BwSpacing` …) |
| Flat JSON | `dist/tokens.json` | Docs, agents, Figma sync |
| Preview | `preview/index.html` | Humans |

## Figma variable scopes (to apply — finding B-15)
| Collection / group | Scopes |
|---|---|
| `color/surface/*`, `color/background/*`, `color/overlay/*` | Frame fill, Shape fill |
| `color/text/*`, `color/link/*` | Text fill |
| `color/icon/*` | Shape fill, Stroke (icons) |
| `color/border/*` | Stroke |
| `spacing/*` | Gap, Width & height (padding) |
| `radius/*` | Corner radius |
| `border/width/*` | Stroke width |
| `size/*` | Width & height |
| font size / line height | Font size / Line height |
| primitives | none (hidden from publishing) |
