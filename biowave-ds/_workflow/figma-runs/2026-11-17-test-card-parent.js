
const page = figma.root.children.find(p => p.name.trim() === "↳ Accordion");
await figma.setCurrentPageAsync(page);

const sec = figma.createSection();
sec.name = "test_sec";
page.appendChild(sec);

const comp = figma.createComponent();
comp.name = "Variant=Outlined, Selected=false, Language=EN";
sec.appendChild(comp);

const footer = figma.createFrame();
footer.name = "footer";
comp.appendChild(footer);

const btnEn = await figma.getNodeByIdAsync("77:14918");
const v = btnEn.children.find(x => x.name === "Variant=outlined, Color=neutral, State=default, Size=sm");
const inst = v.createInstance();
footer.appendChild(inst);

const res = { ok: true, compId: comp.id, instParent: inst.parent.name };
sec.remove();
return res;
