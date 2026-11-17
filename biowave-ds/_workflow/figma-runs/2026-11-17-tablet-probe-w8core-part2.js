const src = figma.root.getSharedPluginData("biowave", "w8core");
return {
  ok: true,
  part2: src.slice(1000, 2000)
};