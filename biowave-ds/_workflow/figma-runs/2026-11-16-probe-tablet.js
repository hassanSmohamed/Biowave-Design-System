
const pages = figma.root.children.map(p => ({ id: p.id, name: p.name }));
const compSets = [];
for (const p of figma.root.children) {
  if (p.name.includes("Button") || p.name.includes("List") || p.name.includes("Cover")) {
    await p.loadAsync();
    for (const c of p.findAll(n => n.type === "COMPONENT_SET" || (n.type === "FRAME" && n.name.includes("List")))) {
      compSets.push({ page: p.name, id: c.id, name: c.name, type: c.type });
    }
  }
}
return { pages, compSets };
