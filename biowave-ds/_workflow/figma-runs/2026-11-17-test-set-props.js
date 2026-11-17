
const page = figma.root.children.find(p => p.name.trim() === "↳ Accordion");
await figma.setCurrentPageAsync(page);

const btnEn = await figma.getNodeByIdAsync("77:14918");
const v = btnEn.children.find(x => x.name === "Variant=outlined, Color=neutral, State=default, Size=sm");
const inst = v.createInstance();
page.appendChild(inst);

const defs = btnEn.componentPropertyDefinitions;
const props = {};
for (const k of Object.keys(defs)) {
  if (k.startsWith("Label")) props[k] = "Cancel";
  if (k.startsWith("Leading icon")) props[k] = false;
  if (k.startsWith("Trailing icon")) props[k] = false;
}
inst.setProperties(props);
const res = { ok: true, props, assigned: inst.componentProperties };
inst.remove();
return res;
