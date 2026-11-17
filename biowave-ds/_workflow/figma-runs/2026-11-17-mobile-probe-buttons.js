const p = await figma.getNodeByIdAsync('1:6');
await p.loadAsync();
return {
  ok: true,
  pageName: p.name,
  sets: p.findAll(n => n.type === 'COMPONENT_SET').map(s => ({ id: s.id, name: s.name }))
};