const p07 = await figma.getNodeByIdAsync('181:22620');
const children = p07.children.map(c => ({
  id: c.id,
  name: c.name,
  type: c.type,
  layoutMode: c.layoutMode,
  children: c.children ? c.children.map(k => ({ id: k.id, name: k.name, type: k.type })) : []
}));
return children;
