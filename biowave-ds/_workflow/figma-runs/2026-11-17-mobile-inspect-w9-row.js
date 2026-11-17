const w9 = await figma.getNodeByIdAsync('181:27013');
return {
  name: w9.name,
  layoutMode: w9.layoutMode,
  itemSpacing: w9.itemSpacing,
  children: w9.children.map(c => ({ id: c.id, name: c.name, type: c.type }))
};
