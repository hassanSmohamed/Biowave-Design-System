
const collections = await figma.variables.getLocalVariableCollectionsAsync();
return collections.map(c => ({ id: c.id, name: c.name, modes: c.modes }));
