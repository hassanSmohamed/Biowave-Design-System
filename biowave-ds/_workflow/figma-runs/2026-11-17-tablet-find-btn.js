
const btnPage = figma.root.children.find(p => p.name.trim() === "↳ Button");
if (!btnPage) return { error: "Button page not found" };
await btnPage.loadAsync();
const sets = btnPage.findAll(n => n.type === "COMPONENT_SET").map(s => ({ id: s.id, name: s.name }));
return { ok: true, sets };
