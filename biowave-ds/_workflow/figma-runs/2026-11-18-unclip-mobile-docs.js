// Unclip docs sections one by one and check page 07 of Snackbar
const DOC_SECTIONS = ['181:21193', '181:23218', '181:25525', '181:27012'];
let totalUnclipped = 0;

for (const secId of DOC_SECTIONS) {
  const sec = await figma.getNodeByIdAsync(secId);
  if (!sec) continue;
  for (const n of sec.findAll(node => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE')) {
    if (n.clipsContent) {
      n.clipsContent = false;
      totalUnclipped++;
    }
  }
}

// Check Snackbar page 07 (Platform)
const p07 = await figma.getNodeByIdAsync('181:22620');
let p07Info = null;
if (p07) {
  const sbInsts = [];
  for (const n of p07.findAll(node => node.type === 'INSTANCE')) {
    const m = await n.getMainComponentAsync();
    if (m && m.parent && m.parent.name === 'Snackbar') {
      sbInsts.push({ id: n.id, name: n.name, variant: m.name, parentName: n.parent ? n.parent.name : null });
    }
  }
  p07Info = { name: p07.name, sbInsts };
}

return { totalUnclipped, p07Info };
