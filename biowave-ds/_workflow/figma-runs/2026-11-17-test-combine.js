
const page = figma.root.children.find(p => p.name.trim() === "↳ Accordion");
await figma.setCurrentPageAsync(page);
// clean page
for (const c of [...page.children]) c.remove();

const sec = figma.createSection();
sec.name = "Accordion — Component";
sec.x = 0; sec.y = 0;
page.appendChild(sec);

const c1 = figma.createComponent();
c1.name = "Expanded=false, Language=EN";
c1.resize(640, 56);
const c2 = figma.createComponent();
c2.name = "Expanded=true, Language=EN";
c2.resize(640, 120);

sec.appendChild(c1);
sec.appendChild(c2);

const set = figma.combineAsVariants([c1, c2], sec);
set.name = "Accordion";

const propKey = set.addComponentProperty("Title", "TEXT", "Section title");
const t1 = figma.createText();
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
t1.characters = "Hello";
c1.appendChild(t1);
t1.componentPropertyReferences = { characters: propKey };

return { ok: true, setId: set.id, propKey };
