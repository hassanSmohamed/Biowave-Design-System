const src = figma.root.getSharedPluginData("biowave", "w8core");
return {
  ok: true,
  start: src.slice(0, 1000)
};