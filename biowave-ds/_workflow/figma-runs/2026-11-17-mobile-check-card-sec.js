const sec = await figma.getNodeByIdAsync("202:28303");
return {
  ok: true,
  secName: sec.name,
  children: sec.children.map(c => ({ id: c.id, name: c.name, type: c.type }))
};