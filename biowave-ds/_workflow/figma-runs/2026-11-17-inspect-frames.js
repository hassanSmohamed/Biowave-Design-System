
const set = await figma.getNodeByIdAsync("230:662521");
const frames = set.findAll(n => n.name === "Frame");
return frames.map(f => ({ id: f.id, type: f.type, fills: f.fills, parent: f.parent.name }));
