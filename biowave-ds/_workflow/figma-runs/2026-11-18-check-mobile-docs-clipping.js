const DOC_SECTIONS = ['181:21193', '181:23218', '181:25525', '181:27012'];
const report = [];

for (const secId of DOC_SECTIONS) {
  const sec = await figma.getNodeByIdAsync(secId);
  if (!sec) { report.push({ id: secId, error: 'not found' }); continue; }
  let clipped = 0;
  for (const n of sec.findAll(node => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE')) {
    if (n.clipsContent) clipped++;
  }
  report.push({ id: secId, name: sec.name, clipped });
}

return report;
