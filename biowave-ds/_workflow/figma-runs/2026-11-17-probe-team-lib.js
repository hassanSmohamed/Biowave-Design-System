return {
  teamLibraryKeys: Object.keys(figma.teamLibrary || {}),
  figmaKeys: Object.keys(figma).filter(k => k.toLowerCase().includes('library') || k.toLowerCase().includes('component'))
};
