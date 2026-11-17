const sec = await figma.getNodeByIdAsync("243:675034");
return {
  ok: true,
  sectionId: sec.id,
  sectionName: sec.name,
  children: sec.children.map(c => ({ id: c.id, name: c.name }))
};