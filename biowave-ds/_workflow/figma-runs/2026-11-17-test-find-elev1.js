
const results = [];
for (const pName of ["↳ Menu", "↳ Popover", "↳ Tooltip", "↳ List item"]) {
  const p = figma.root.children.find(x => x.name.trim() === pName);
  if (p) {
    await p.loadAsync();
    for (const c of p.findAll(n => n.type === "COMPONENT" || n.type === "COMPONENT_SET")) {
      const target = c.type === "COMPONENT_SET" ? c.children[0] : c;
      if (target && target.effectStyleId) {
        const st = await figma.getStyleByIdAsync(target.effectStyleId);
        results.push({ page: pName, name: target.name, styleId: target.effectStyleId, styleName: st ? st.name : null, styleKey: st ? st.key : null });
        break;
      }
    }
  }
}
return results;
