
const p = figma.root.children.find(x => x.name === "Components List");
await p.loadAsync();
const sections = p.children.map(c => ({ id: c.id, name: c.name, type: c.type }));
return { page: p.name, sections };
