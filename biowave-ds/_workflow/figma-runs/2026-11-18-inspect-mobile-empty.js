const emptySet = await figma.getNodeByIdAsync('181:16557');
const variants = [];
for (const v of emptySet.children) {
  const actions = v.findOne(n => n.name === 'actions');
  const actionChildren = actions ? actions.children.map(c => ({
    name: c.name,
    type: c.type,
    width: c.width,
    layoutSizingHorizontal: c.layoutSizingHorizontal
  })) : [];

  variants.push({
    name: v.name,
    width: v.width,
    height: v.height,
    actionsLayoutMode: actions ? actions.layoutMode : null,
    actionsWidth: actions ? actions.width : null,
    actionChildren
  });
}
return variants;
