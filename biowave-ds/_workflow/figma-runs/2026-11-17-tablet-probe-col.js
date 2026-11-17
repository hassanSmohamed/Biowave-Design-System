const src = figma.root.getSharedPluginData("biowave", "w8core");
const idx = src.indexOf("getVariableCollectionByIdAsync");
return {
  ok: true,
  snippet: src.slice(Math.max(0, idx - 100), idx + 200)
};