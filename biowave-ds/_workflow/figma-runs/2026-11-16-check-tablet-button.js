
const p = figma.root.children.find(x => x.name.trim() === "↳ Button");
if (p) {
  await p.loadAsync();
  const sets = p.findAll(n => n.type === "COMPONENT_SET").map(s => ({ id: s.id, name: s.name }));
  return { ok: true, buttonSets: sets };
}
return { ok: false, error: "Button page not found" };
