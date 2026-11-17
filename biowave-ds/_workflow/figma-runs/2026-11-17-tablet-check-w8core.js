
const src = figma.root.getSharedPluginData("biowave", "w8core");
return { ok: true, hasW8Core: Boolean(src), length: src ? src.length : 0 };
