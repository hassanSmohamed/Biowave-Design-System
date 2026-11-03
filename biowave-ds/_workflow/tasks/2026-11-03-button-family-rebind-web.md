# Task: Button family rebind, Web

> **Executor:** Codex. **Author:** Claude (Planner), approved by Hassan on 2026-11-03.
> This brief **is** the Planner decision for this task (AGENTS.md §6). Change only what it lists. Every value is final.
> Read first: `AGENTS.md`, `_audits/figma-button-family-web-2026-11-02.md`, and Part B of `button.md`, `icon-button.md` and `split-button.md`.

## 0. Goal

Bring Icon button and Split button in **Biowave DS: Web Components** (`7nDhsPNntzIWlrjmuSmZ9l`) onto component tokens only. Add the general Menu collections. Close the two Button stroke gaps.

**Stay in Web.** Tablet and Mobile follow in a separate task after this one is reviewed.

## 1. Decisions

| # | Decision |
|---|---|
| 1 | **Icon button** matches the three code sizes: `Size` becomes `Small · Medium · XLarge`, the same names as Button and Split button. Remove `Width` and `Shape`. |
| 2 | **Split button** uses the same properties and styles as the existing Figma Button set. The only addition is `Show Menu Buttons`. |
| 3 | **Menu** gets general collections, `Menu / Container` and `Menu / Item`, because Menu will be a core component. |
| 4 | Button colours come from `Button / *`. New collections hold only what is unique to a component. |
| 5 | **Button group** is out of scope. Build nothing. |
| 6 | **`Button / Tonal`** stays code-only on Button. Do not add tonal variants to the Button set. |

## 2. Repo changes (do these first)

1. Create the two token files from section 6, exactly as written.
2. Update Part D of `3-web-components/components/icon-button/icon-button.md`:
   - `Mode` becomes `**Rebind** the existing sets on page ↳ Icon Button`.
   - D2 to D5 describe the sets as they will be after section 3.
3. Update Part D of `3-web-components/components/split-button/split-button.md`:
   - `Mode` becomes `**Rebind** the existing sets on page ↳ Split Button`.
   - D2 to D5 describe the sets as they will be after section 4. Remove the old legacy mapping and the instruction to compose from Button and Icon Button instances.
4. In both files, set the header row `Tokens` to the new `.tokens.json` file.
5. In Part B of `split-button.md`, add `spacing-xs` as the padding of `menu`, and state that `menu` tokens come from the general Menu collections.
6. Add a `Changes` entry to Part F of both files, and a `CHANGELOG.md` entry.
7. Regenerate and check:

```bash
npm run component-tokens
npm run contract -- web icon-button
npm run contract -- web split-button
npm run docs:check
```

Do not change code, semantic tokens, primitives, Tablet or Mobile files.

## 3. Icon button in Figma

Page `↳ Icon Button`. Keep the three sets and their nesting: `Icon Button` `116:30310`, `Icon Button / Appearance` `116:28709`, `Icon Button / Glyph` `116:28678`.

### 3.1 Structure

| Property | Before | After |
|---|---|---|
| `Size` on `Icon Button` and `Glyph` | `XS · S · M · L · XL` | `Small · Medium · XLarge` |
| `Width` | `Narrow · Default · Wide` | Removed. Keep the `Default` variants |
| `Shape` | `Round · Rounded square` | Removed. Keep the `Rounded square` variants |

`Size` mapping: `XS → Small`, `S → Medium`, `M → XLarge`. `L` and `XL` are deleted, and their instances move to `XLarge`.

Code mapping for D4 and Code Connect: `Small → sm`, `Medium → md`, `XLarge → lg`.

Result: `Icon Button` has 9 variants and `Glyph` has 6. Width equals height, as in Part B2. All other properties stay as they are.

### 3.2 Bindings

| Part | Collection | Mode or variable |
|---|---|---|
| Size, icon size, radius, border width | `Icon button / Size` | Modes: `Small → sm`, `Medium → md`, `XLarge → lg` |
| `Style=Filled` | `Button / Filled` | Same colour mode |
| `Style=Tonal` | `Button / Tonal` | `brand · secondary · error` |
| `Style=Outlined` | `Button / Outlined` | Same colour mode |
| `Style=Standard` | `Button / Text` | Same colour mode |
| `Selected=True` | `Icon button / Selected` | Same colour mode |
| Focus ring | `Button / Focus` | `default` or `inverse` |
| Tooltip layers | `Icon button / Tooltip` | `default` |
| `Show Menu Buttons` layers | `Menu / *` | `default` |

- `Color=Default` uses mode `neutral`.
- `Style=Tonal` with a colour outside `brand · secondary · error` has no tonal token. Bind it to `Button / Outlined` in the same colour, following the code fallback, and list these variants in the report.

## 4. Split button in Figma

Page `↳ Split Button`. Keep `Split Button/EN` `116:23634` and `Split Button/AR` `116:25888`, so their keys stay the same.

### 4.1 Properties

Read the properties from `.Button _en` `116:5183` and match them exactly.

| Property | Type | Values | Source |
|---|---|---|---|
| `Label` | TEXT | | Rename `Text` |
| `Leading Icon` | BOOLEAN | | Keep |
| `Show Menu Buttons` | BOOLEAN | | Keep, unchanged |
| `Type` | VARIANT | `Primary · Secondary · Tertiary` | Same as Button |
| `Color` | VARIANT | `Primary · Secondary · Success · Error · Warning · Info · Neutral · White` | Same as Button |
| `State` | VARIANT | `Idle · Hovered · Focused · Pressed · Disabled` | Same as Button |
| `Size` | VARIANT | `XLarge · Medium · Small` | Same as Button |

Do not add `Trailing Icon`. The menu trigger occupies that position.

Result: 360 variants in each language set, the same count as Button. Clone existing variants to fill the matrix.

### 4.2 Mapping of old values

| Old | New |
|---|---|
| `Type=Brand` | `Type=Primary`, `Color=Primary` |
| `Type=Secondary · Success · Error · Warning · Info · Neutral` | `Type=Primary`, same `Color` |
| `Type=Default` | `Type=Primary`, `Color=Neutral` |
| `State=Default` | `State=Idle` |
| `State=Hover` | `State=Hovered` |
| `State=Ghost` | `Type=Secondary`, `State=Idle` |
| `Size=XL · M · SM` | `Size=XLarge · Medium · Small` |

### 4.3 Bindings

Copy the binding pattern from the matching Button variant, then read it back. For both `Action` and `Dropdown`:

| `Type` | Collection |
|---|---|
| `Primary` | `Button / Filled` |
| `Secondary` | `Button / Outlined` |
| `Tertiary` | `Button / Text` |

| `Color` | Mode |
|---|---|
| `Primary` | `brand` |
| `White` | `inverse` |
| Others | Same name in lower case |

| Part | Collection | Variable |
|---|---|---|
| Heights, padding, gap, icon | `Button / Size` | Modes: `Small → sm`, `Medium → md`, `XLarge → lg` |
| Outer corners | `Split button / Part` | `outer-radius` |
| Inner corners | `Split button / Part` | `inner-radius` |
| Border on the inner sides | `Split button / Part` | `inner-border-width` |
| Gap between parts | `Split button / Part` | `gap` |
| `Divider` fill, width | `Split button / Part` | `divider/color`, `divider/width` |
| Focus ring | `Button / Focus` | `default` or `inverse` |
| Menu | `Menu / *` | `default` |

- Replace the pinned `Button size` mode with `Button / Size` modes.
- Use one divider colour for every variant.
- Bind every icon fill. Replace raw white fills.
- Give every text layer the same text style as the matching Button variant, or `body/md` for menu rows.

## 5. Menu and Button

### 5.1 Menu

Bind the layer `Add Devices Menu Buttons` and the main component of `Row Icon`:

| Part | Variable |
|---|---|
| Menu fill, radius, padding, offset | `Menu / Container` · `background`, `radius`, `padding`, `offset` |
| Row height, padding, gap, icon | `Menu / Item` · `height`, `padding-inline`, `gap`, `icon-size` |
| Row hover and press | `Menu / Item` · `state-layer/hovered`, `state-layer/pressed` |
| Row text | `Menu / Item` · `label/default`, `label/disabled` |
| Row icon | `Menu / Item` · `icon/default` |
| Row focus ring | `Menu / Item` · `focus-ring` |

Keep effect style `Elevation/3` on the menu. Do not build a Menu component.

### 5.2 Button

On `.Button _en` and `.Button _ar`, bind:

- root `strokeWeight` to `Button / Size › border-width`
- the `Focus ring` stroke weight to the Foundations-derived focus width token. If no component variable exists for it, stop and report rather than binding a semantic variable

## 6. Token files

### `3-web-components/components/icon-button/icon-button.tokens.json`

```json
{
  "$schema": "component-tokens/v1",
  "$description": "Icon button component tokens (D-13). Selected colours, sizes and the temporary tooltip. Unselected colours and focus reuse Button / * collections. Every value aliases a semantic token.",
  "icon-button": {
    "size": {
      "$extensions": {
        "figma": {
          "collection": "Icon button / Size",
          "modes": true
        }
      },
      "sm": {
        "size": {
          "$value": "{size.control.height.sm}"
        },
        "icon": {
          "$value": "{size.icon.sm}"
        },
        "radius": {
          "$value": "{radius.md}"
        },
        "border-width": {
          "$value": "{border.width.default}"
        }
      },
      "md": {
        "size": {
          "$value": "{size.control.height.md}"
        },
        "icon": {
          "$value": "{size.icon.md}"
        },
        "radius": {
          "$value": "{radius.md}"
        },
        "border-width": {
          "$value": "{border.width.default}"
        }
      },
      "lg": {
        "size": {
          "$value": "{size.control.height.lg}"
        },
        "icon": {
          "$value": "{size.icon.lg}"
        },
        "radius": {
          "$value": "{radius.md}"
        },
        "border-width": {
          "$value": "{border.width.default}"
        }
      }
    },
    "selected": {
      "$extensions": {
        "figma": {
          "collection": "Icon button / Selected",
          "modes": true
        }
      },
      "brand": {
        "container": {
          "selected": {
            "$value": "{color.background.brand.subtle}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.role.brand}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.brand}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      },
      "secondary": {
        "container": {
          "selected": {
            "$value": "{color.background.secondary.subtle}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.role.secondary}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.secondary}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      },
      "error": {
        "container": {
          "selected": {
            "$value": "{color.background.error.subtle}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.role.error}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.error}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      },
      "neutral": {
        "container": {
          "selected": {
            "$value": "{color.background.neutral.default}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.default}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.strong}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      },
      "inverse": {
        "container": {
          "selected": {
            "$value": "{color.background.inverse.default}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.role.brand}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.inverse}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      }
    },
    "tooltip": {
      "$extensions": {
        "figma": {
          "collection": "Icon button / Tooltip",
          "modes": true
        }
      },
      "default": {
        "background": {
          "$value": "{color.surface.inverse}"
        },
        "text": {
          "$value": "{color.text.inverse}"
        },
        "radius": {
          "$value": "{radius.sm}"
        },
        "padding-block": {
          "$value": "{spacing.xs}"
        },
        "padding-inline": {
          "$value": "{spacing.md}"
        },
        "offset": {
          "$value": "{spacing.xs}"
        }
      }
    }
  }
}
```

### `3-web-components/components/split-button/split-button.tokens.json`

Menu tokens live here until the Menu component exists. The collection names stay the same when they move.

```json
{
  "$schema": "component-tokens/v1",
  "$description": "Split button component tokens (D-13) plus the general Menu collections. Menu tokens stay here until the Menu component owns them; the collection names do not change when they move. Every value aliases a semantic token.",
  "split-button": {
    "part": {
      "$extensions": {
        "figma": {
          "collection": "Split button / Part",
          "modes": true
        }
      },
      "default": {
        "gap": {
          "$value": "{spacing.none}"
        },
        "inner-radius": {
          "$value": "{radius.none}"
        },
        "outer-radius": {
          "$value": "{radius.md}"
        },
        "inner-border-width": {
          "$value": "{border.width.none}"
        },
        "divider": {
          "width": {
            "$value": "{border.width.default}"
          },
          "color": {
            "$value": "{color.border.default}"
          }
        }
      }
    }
  },
  "menu": {
    "container": {
      "$extensions": {
        "figma": {
          "collection": "Menu / Container",
          "modes": true
        }
      },
      "default": {
        "background": {
          "$value": "{color.surface.raised}"
        },
        "radius": {
          "$value": "{radius.lg}"
        },
        "padding": {
          "$value": "{spacing.xs}"
        },
        "offset": {
          "$value": "{spacing.xs}"
        }
      }
    },
    "item": {
      "$extensions": {
        "figma": {
          "collection": "Menu / Item",
          "modes": true
        }
      },
      "default": {
        "height": {
          "$value": "{size.control.height.md}"
        },
        "padding-inline": {
          "$value": "{spacing.lg}"
        },
        "gap": {
          "$value": "{spacing.sm}"
        },
        "icon-size": {
          "$value": "{size.icon.md}"
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "label": {
          "default": {
            "$value": "{color.text.default}"
          },
          "disabled": {
            "$value": "{color.text.disabled}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.subtle}"
          }
        },
        "focus-ring": {
          "$value": "{color.border.focus}"
        }
      }
    }
  }
}
```

## 7. Safety rules

1. **List instances before deleting anything.** Search the whole file for instances of the variants you will remove, and remap them with sections 3.1 and 4.2. Never leave a broken instance. Report the count.
2. **Keep component keys** on the existing sets. Do not delete and recreate a set.
3. Do not pin any variant to a Light or Dark mode.
4. **No semantic, primitive or old collection bindings** in these sets. Text styles, effect styles and icons from the published library are allowed.
5. **Stop and report** if a value has no token, or a step would change anything outside this brief. Do not invent a token.

## 8. Done when

- [ ] `npm run component-tokens`, `npm run docs:check` and `npm run sync` pass
- [ ] The collections from section 6 exist in the Web file with correct aliases: run the sync verify step for component tokens
- [ ] A read-back script reports **0** bindings to `Color`, `Numbers`, `Button size`, `_Primitives`, `material/colors`, `1. Themes`, `2. Radius` and other library variables across the three Icon Button sets and both Split Button sets
- [ ] Every text layer in those sets has a text style, and no solid fill or stroke is unbound
- [ ] `Icon Button` has 9 variants, and each Split Button set has 360
- [ ] Split Button property names and values equal Button, plus `Show Menu Buttons`
- [ ] EN and AR sets match, and screenshots of Light and Dark look correct
- [ ] Library is published, then `npm run sync:library` is run and contracts are regenerated
- [ ] D11 Execution log is filled in on both components
- [ ] `CHANGELOG.md` is updated

Do not mark the Figma status `Approved`. That happens in review.

## 9. Report back

- Files changed and check results
- Instances remapped, by old value
- Tonal variants that fell back to Outlined
- Button collections with modes in Figma that are missing from `button.tokens.json`
- Anything left unbound, and why
