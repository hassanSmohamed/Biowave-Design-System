const c = await figma.getNodeByIdAsync('195:2899');
return {
  name: c.name,
  children: c.children.map(x => ({ id: x.id, name: x.name, type: x.type }))
};
