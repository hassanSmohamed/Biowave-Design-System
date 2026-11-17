const p = await figma.getNodeByIdAsync('14:2');
await p.loadAsync();
await figma.setCurrentPageAsync(p);

// Search for the grid or row frame that holds the cards
const cards = p.findAll(n => n.name && n.name.toLowerCase().endsWith('card') && n.parent && n.parent.type === 'FRAME');
return {
  pageName: p.name,
  cardsCount: cards.length,
  sampleCards: cards.slice(-3).map(c => ({ id: c.id, name: c.name, parentId: c.parent.id, parentName: c.parent.name }))
};
