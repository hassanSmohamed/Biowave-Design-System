const src = figma.root.getSharedPluginData("biowave", "w8core");
return {
  ok: true,
  part5: src.slice(5000, 6500)
};