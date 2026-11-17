const p = Object.getPrototypeOf(figma);
const names = Object.getOwnPropertyNames(p).filter(k => k.includes('Component') || k.includes('Library') || k.includes('Style'));
return names;
