const f = await figma.getNodeByIdAsync('195:2900');
return {
  name: f.name,
  type: f.type,
  width: f.width,
  height: f.height,
  children: f.children.map(x => ({ id: x.id, name: x.name, type: x.type }))
};
