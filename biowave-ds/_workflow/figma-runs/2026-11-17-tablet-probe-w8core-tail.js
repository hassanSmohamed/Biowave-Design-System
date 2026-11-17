const src = figma.root.getSharedPluginData("biowave", "w8core");
return {
  ok: true,
  tail: src.slice(12000)
};