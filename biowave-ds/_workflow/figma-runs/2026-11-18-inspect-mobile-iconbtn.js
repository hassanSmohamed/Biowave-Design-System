const iconBtnSet = await figma.getNodeByIdAsync('76:60003');
const variants = iconBtnSet.children.map(c => ({
  id: c.id,
  name: c.name
}));
return {
  sample: variants.find(v => v.name.includes('Size=sm'))
};
