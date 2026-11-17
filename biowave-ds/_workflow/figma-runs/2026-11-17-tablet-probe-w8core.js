const src = figma.root.getSharedPluginData("biowave", "w8core");
return {
  ok: true,
  length: src ? src.length : 0,
  head: src ? src.slice(0, 500) : null,
  hasW6: src ? src.includes("W6") : false,
  matches: src ? src.match(/getVariable[a-zA-Z0-9_]*/g) : null,
  styles: src ? src.match(/importStyle[a-zA-Z0-9_]*/g) : null
};