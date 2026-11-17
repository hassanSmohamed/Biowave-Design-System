
const p = figma.createPage();
p.name = "_temp_test";
const skelPage = figma.root.children.find(x => x.name.includes("Skeleton"));
// let us see if we can get the collection through an imported variable
const v = await figma.variables.importVariableByKeyAsync("2013a1c60d84d2bac2524fd0c32229e20cc341a1");
const col = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
const res = {
  vCol: col ? { id: col.id, name: col.name } : null
};
p.remove();
return res;
