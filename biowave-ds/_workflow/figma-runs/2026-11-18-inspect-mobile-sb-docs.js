const docsSec = await figma.getNodeByIdAsync('181:23218');
const pages = docsSec.children.map(c => ({
  id: c.id,
  name: c.name
}));
return { pages };
