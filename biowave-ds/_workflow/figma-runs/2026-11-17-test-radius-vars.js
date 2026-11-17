
const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync("756e2c0d894163d38d14ad1a63161cc62cedbd1a");
return vars.map(v => ({ name: v.name, key: v.key }));
