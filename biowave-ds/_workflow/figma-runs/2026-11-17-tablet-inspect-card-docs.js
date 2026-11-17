const sec = await figma.getNodeByIdAsync("243:677788");
return {
  ok: true,
  sectionId: sec.id,
  sectionName: sec.name,
  children: sec.children.map(c => ({ id: c.id, name: c.name }))
};