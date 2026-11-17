
const p = figma.root.children.find(x => x.name.trim() === "↳ Popover");
await p.loadAsync();
const pop = p.findOne(n => n.name === ".Popover _en");
const f = figma.createFrame();
await f.setEffectStyleIdAsync(pop.effectStyleId);
const res = { ok: true, assignedStyleId: f.effectStyleId };
f.remove();
return res;
