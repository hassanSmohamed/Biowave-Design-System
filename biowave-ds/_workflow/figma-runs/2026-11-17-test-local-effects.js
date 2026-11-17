
const localEffects = figma.getLocalEffectStyles().map(s => ({ id: s.id, name: s.name, key: s.key }));
return { localEffects };
