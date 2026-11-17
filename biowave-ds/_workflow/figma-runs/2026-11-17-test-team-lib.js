
const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
return cols.map(c => ({ key: c.key, name: c.name, libraryName: c.libraryName }));
