const p = await figma.getNodeByIdAsync('14:2');
await p.loadAsync();
const sec = p.findOne(n => n.name && n.name.includes('Wave 9'));
const topFrame = sec ? sec.parent : p;
return {
  topName: topFrame.name,
  topId: topFrame.id,
  children: topFrame.children.map(c => ({ id: c.id, name: c.name, type: c.type }))
};
