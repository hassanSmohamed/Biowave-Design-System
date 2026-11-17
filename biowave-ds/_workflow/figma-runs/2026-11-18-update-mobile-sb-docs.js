// Update Snackbar docs on Mobile: Page 07 (side by side Android + iOS) and Page 00
const p07 = await figma.getNodeByIdAsync('181:22620');
if (p07) {
  const content = p07.findOne(n => n.name === 'Documentation content');
  const devFrame = content ? content.findOne(n => n.name === 'Doc/Device frame') : null;

  if (devFrame && devFrame.parent === content) {
    // Check if row already exists
    const row = figma.createFrame();
    row.name = 'Devices row';
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.layoutSizingHorizontal = 'HUG';
    row.layoutSizingVertical = 'HUG';
    row.itemSpacing = 24;
    row.fills = [];

    // Clone for iOS
    const iosDevFrame = devFrame.clone();
    iosDevFrame.name = 'Doc/Device frame (iOS)';
    const iosSb = iosDevFrame.findOne(n => n.name === 'Snackbar');
    if (iosSb && iosSb.type === 'INSTANCE') {
      iosSb.setProperties({ OS: 'iOS' });
    }

    // Insert row in content
    const idx = content.children.indexOf(devFrame);
    content.insertChild(idx, row);
    row.appendChild(devFrame);
    row.appendChild(iosDevFrame);
  }
}

// Check Page 00
const p00 = await figma.getNodeByIdAsync('181:21194');
if (p00) {
  const sbInsts = [];
  for (const n of p00.findAll(node => node.type === 'INSTANCE')) {
    const m = await n.getMainComponentAsync();
    if (m && m.parent && m.parent.name === 'Snackbar') {
      sbInsts.push(n);
    }
  }
}

return { ok: true };
