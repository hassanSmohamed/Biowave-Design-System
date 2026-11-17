
const p = figma.root.children.find(x => x.name.includes("Snackbar"));
await p.loadAsync();
const sets = p.findAll(n => n.type === "COMPONENT_SET");
const effects = [];
for (const s of sets) {
  for (const c of s.children) {
    if (c.effectStyleId) {
      const st = await figma.getStyleByIdAsync(c.effectStyleId);
      effects.push({ comp: c.name, styleId: c.effectStyleId, styleName: st ? st.name : null, styleKey: st ? st.key : null });
      break;
    }
  }
}
return effects;
