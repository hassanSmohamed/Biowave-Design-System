const clPage = await figma.getNodeByIdAsync('16:2');
await clPage.loadAsync();
const row = await figma.getNodeByIdAsync('192:1433');
return {
  ok: true,
  pageName: clPage.name,
  cards: row.children.map(c => ({ id: c.id, name: c.name }))
};