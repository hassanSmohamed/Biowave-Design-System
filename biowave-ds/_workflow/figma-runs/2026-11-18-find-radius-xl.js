const vMd = await figma.variables.getVariableByIdAsync('VariableID:0758e506cdfd4d7a4eef6369a4851133d7eab5a4/5321:13');
// Find radius/xl variable
let vXl = null;
const col = await figma.variables.getVariableCollectionByIdAsync(vMd.variableCollectionId);
const varsInCol = [];
for (const vid of col.variableIds) {
  const v = await figma.variables.getVariableByIdAsync(vid);
  if (v && v.name.includes('radius')) {
    varsInCol.push({ id: v.id, name: v.name, key: v.key });
    if (v.name === 'radius/xl' || v.name.includes('/xl')) vXl = { id: v.id, name: v.name, key: v.key };
  }
}

return {
  vMd: { id: vMd.id, name: vMd.name, key: vMd.key },
  colName: col.name,
  varsInCol,
  vXl
};
