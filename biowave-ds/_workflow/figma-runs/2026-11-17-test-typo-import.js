
const typoVars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync("39add4d8aacddd3c691a5adf59aada01231e4adf");
const v = await figma.variables.importVariableByKeyAsync(typoVars[0].key);
const col = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
return {
  importedVarId: v.id,
  colId: v.variableCollectionId,
  colName: col ? col.name : null,
  modes: col ? col.modes : null
};
