const accPage = await figma.getNodeByIdAsync("229:662366");
const cardPage = await figma.getNodeByIdAsync("235:662566");
return {
  accordionChildren: accPage.children.map(c => ({ id: c.id, name: c.name })),
  cardChildren: cardPage.children.map(c => ({ id: c.id, name: c.name }))
};