# Figma audit: Button family, Web Components file

Read-only check on 2026-11-02 of file `7nDhsPNntzIWlrjmuSmZ9l`. Nothing changed in Figma.

## Result

| Component | Sets | Variants | Component variables | Semantic or legacy bindings | Verdict |
|---|---|---|---|---|---|
| Button | `.Button _en` · `.Button _ar` | 360 each | 4,080 each | 0 | Rebound. Close the small gaps below |
| Icon button | `Icon Button` · `Appearance` · `Glyph` | 90 · 160 · 10 | 0 | 14,156 | Not rebound |
| Split button | `Split Button/EN` · `/AR` | 144 each | 0 | 9,783 · 9,630 | Not rebound |
| Button group | None | 0 | 0 | 0 | No set in this file |

## Findings

1. **Icon button and Split button have no component tokens.** Their contracts say to bind to Foundations variables, which conflicts with the rule that component files use component tokens only.
2. **Icon button and Split button still use old collections:** `Color`, `Numbers`, `Button size`, plus a few `_Primitives` and `material/colors` bindings on Split button. Remove these bindings during the rebind.
3. **Split button also has unbound values:** 120 `Divider` fills per set, and 97 and 96 text layers with no text style in EN and AR.
4. **Split button pins `Button size` modes** on its variants. This is the old collection, so the pin must move to the new size collection.
5. **Button is missing two bindings:** root `strokeWeight` and the `Focus ring` stroke weight. Vector and text sizes in the raw count are not bindable targets.
6. **`Button / Tonal` is unused.** The set has `Type` Primary, Secondary and Tertiary, with no tonal variant.
7. **Contracts say "Create new"** for Icon button, Split button and Button group. The current decision is to keep existing sets and rebind them, so the contracts need updating before the Figma Agent runs.
8. **Property and state names differ** between sets: Button uses `Hovered` and `XLarge`, Split button uses `Hover`, `Ghost` and `XL`. Names stay unchanged under the current decision.

## Plan

1. Decide the open questions below.
2. Add component tokens for Icon button and Split button, each built from semantic tokens only.
3. Run `npm run component-tokens`, sync the collections to the Web file, and update both contracts from "Create new" to "Rebind".
4. Figma Agent rebinds Split button and Icon button, then adds Button's two stroke bindings.
5. Verify zero semantic and legacy bindings, publish, and mark Figma status.
6. Repeat on Tablet and Mobile.

## Decisions

- **Colour tokens:** reuse the `Button / *` collections. Add small collections only for sizes and parts that are unique to Icon button and Split button.
- **Button group:** not needed for now, so no set is built.
- **Button / Tonal:** code only on Button. No tonal variants are added to the Button set.

## Open questions

Token work is on hold until these are answered. The existing sets differ from the spec in ways a rebind alone cannot solve.

- **Icon button sizes:** Figma has XS 32, S 40, M 56, L 96 and XL 136, plus `Width` and `Shape`. The spec has sm 32, md 40 and lg 48. Semantic control heights stop at 56, and component tokens cannot use primitives.
- **Split button `Type=Default` and `State=Ghost`:** neither exists in the spec, and no token maps to them yet.
- **Temporary menu in both sets:** `Add Devices Menu Buttons` uses old variables and has no component tokens.
