const f = await figma.getNodeByIdAsync('195:2901');
return {
  name: f.name,
  children: f.children.map(x => ({ id: x.id, name: x.name, type: x.type }))
};
