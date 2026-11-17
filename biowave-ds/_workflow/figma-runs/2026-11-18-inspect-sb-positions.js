const sb = await figma.getNodeByIdAsync('181:16450');
const children = sb.children.map(c => ({
  id: c.id,
  name: c.name,
  x: c.x,
  y: c.y,
  w: c.width,
  h: c.height
}));
return {
  sbLayout: sb.layoutMode,
  children
};
