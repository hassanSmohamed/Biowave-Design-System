const devFrame = await figma.getNodeByIdAsync('181:22645');
const sb = devFrame.findOne(n => n.name === 'Snackbar');
return {
  devFrameName: devFrame.name,
  devFrameProps: devFrame.componentProperties,
  parentName: devFrame.parent.name,
  parentLayout: devFrame.parent.layoutMode,
  sbProps: sb ? sb.componentProperties : null
};
