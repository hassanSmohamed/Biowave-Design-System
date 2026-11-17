const src = figma.root.getSharedPluginData('biowave', 'w8core');
const idx = src.indexOf('setExplicitVariableModeForCollection');
return {
  len: src.length,
  snippet: idx !== -1 ? src.slice(idx - 100, idx + 100) : 'not found'
};
