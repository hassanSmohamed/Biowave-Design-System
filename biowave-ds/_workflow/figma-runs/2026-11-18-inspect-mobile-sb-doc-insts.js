const pageIds = ['181:21194', '181:21446', '181:21947', '181:22620'];
const sbInstances = [];

for (const pid of pageIds) {
  const p = await figma.getNodeByIdAsync(pid);
  if (!p) continue;
  const list = [];
  for (const n of p.findAll(n => n.type === 'INSTANCE')) {
    const m = await n.getMainComponentAsync();
    if (m && m.parent && m.parent.name === 'Snackbar') {
      list.push({
        id: n.id,
        name: n.name,
        variant: m.name,
        props: n.componentProperties
      });
    }
  }
  sbInstances.push({
    page: p.name,
    instances: list
  });
}

return sbInstances;
