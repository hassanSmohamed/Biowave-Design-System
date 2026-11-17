
const page = figma.root.children.find(p => p.name.trim() === "↳ Accordion");
await figma.setCurrentPageAsync(page);

const btnEn = await figma.getNodeByIdAsync("77:14918");
const v = btnEn.children.find(x => x.name === "Variant=outlined, Color=neutral, State=default, Size=sm");
const inst = v.createInstance();
page.appendChild(inst);
const res = { ok: true, instId: inst.id, parent: inst.parent.name };
inst.remove();
return res;
