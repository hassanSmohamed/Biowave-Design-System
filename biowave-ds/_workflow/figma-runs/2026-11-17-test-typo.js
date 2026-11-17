
const typo = await figma.variables.getVariableCollectionByIdAsync("VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780");
const grid = await figma.variables.getVariableCollectionByIdAsync("VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205");
return {
  typo: typo ? { id: typo.id, name: typo.name, modes: typo.modes } : null,
  grid: grid ? { id: grid.id, name: grid.name, modes: grid.modes } : null
};
