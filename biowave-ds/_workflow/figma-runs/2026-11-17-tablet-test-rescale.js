const f = figma.createFrame();
const res = typeof f.rescale;
f.remove();
return { ok: true, rescaleType: res };