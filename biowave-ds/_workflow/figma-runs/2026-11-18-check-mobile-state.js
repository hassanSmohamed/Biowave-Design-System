const alertSet = await figma.getNodeByIdAsync('181:16391');
const emptySet = await figma.getNodeByIdAsync('181:16557');
const snackbarSet = await figma.getNodeByIdAsync('181:16450');

return {
  alertWidth: alertSet ? alertSet.children[0].width : null,
  emptyActionsLayout: emptySet ? emptySet.children[0].findOne(n => n.name === 'actions').layoutMode : null,
  snackbarVariants: snackbarSet ? snackbarSet.children.map(c => c.name) : null
};
