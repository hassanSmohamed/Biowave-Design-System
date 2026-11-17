const src = figma.root.getSharedPluginData("biowave", "w8core");
return {
  ok: true,
  length: src.length,
  part6: src.slice(6500, 8000)
};