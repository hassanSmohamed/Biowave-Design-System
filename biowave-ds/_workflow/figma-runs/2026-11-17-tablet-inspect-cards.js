
const n = await figma.getNodeByIdAsync("16:104");
return {
  name: n.name,
  layoutMode: n.layoutMode,
  childrenCount: n.children.length,
  lastFew: n.children.slice(-5).map(c => ({ id: c.id, name: c.name }))
};
