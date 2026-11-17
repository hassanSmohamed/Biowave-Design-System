const c = await figma.getNodeByIdAsync('195:2898');
return {
  name: c.name,
  width: c.width,
  height: c.height,
  children: c.children.map(x => ({ id: x.id, name: x.name, type: x.type })),
  allTexts: c.findAll(x => x.type === 'TEXT').map(t => ({ name: t.name, text: t.characters, link: t.hyperlink }))
};
