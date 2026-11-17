
const popPage = figma.root.children.find(x => x.name.trim() === "↳ Popover");
await popPage.loadAsync();
const pop = popPage.findOne(n => n.name === ".Popover _en");
return {
  ok: true,
  elevStyleId: pop ? pop.effectStyleId : null
};
