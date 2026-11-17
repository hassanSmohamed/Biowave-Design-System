const c = await figma.getNodeByIdAsync('233:3430');
return {
  ok: true,
  name: c.name,
  componentProperties: c.componentProperties,
  texts: c.findAll(x => x.type === 'TEXT').map(t => ({ name: t.name, text: t.characters, link: t.hyperlink }))
};