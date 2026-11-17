
const n = await figma.getNodeByIdAsync("16:77");
const items = n.children.map(c => ({ id: c.id, name: c.name, type: c.type }));
return { count: items.length, sample: items.slice(-5) };
