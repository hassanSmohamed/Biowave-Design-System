
const s = await figma.getStyleByIdAsync("S:f8bd3e0517bac914b6aa83acda696907f0d4a37e,4987:5713");
return { found: Boolean(s), name: s ? s.name : null, id: s ? s.id : null };
