const alertSet = await figma.getNodeByIdAsync('181:16391');
const variants = alertSet.children.map(c => ({
  id: c.id,
  name: c.name,
  width: c.width,
  height: c.height,
  layoutMode: c.layoutMode,
  layoutSizingHorizontal: c.layoutSizingHorizontal,
  padding: { l: c.paddingLeft, r: c.paddingRight, t: c.paddingTop, b: c.paddingBottom, spacing: c.itemSpacing }
}));

return { variants };
