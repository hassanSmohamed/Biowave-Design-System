// Only check pages that likely have icons, e.g. Alert, Banner, Top app bar, etc.
const pageNames = ['Alert', 'Banner', 'Dialog', 'Navigation', 'Top app bar', 'Badge'];
const matches = [];
for (const p of figma.root.children) {
  if (pageNames.some(name => p.name.includes(name))) {
    await p.loadAsync();
    const insts = p.findAll(n => n.type === 'INSTANCE');
    for (const inst of insts) {
      try {
        const mc = await inst.getMainComponentAsync();
        if (mc && mc.parent && mc.parent.name && mc.parent.name.startsWith('Material Symbols/')) {
          const sym = mc.parent.name.split('/')[1]?.trim();
          if (['info', 'warning', 'lightbulb'].includes(sym)) {
            matches.push({ sym, key: mc.key, variant: mc.name, parent: mc.parent.name });
          }
        }
      } catch (_) {}
    }
  }
}
const dedup = [];
for (const m of matches) {
  if (!dedup.some(d => d.sym === m.sym && d.key === m.key)) dedup.push(m);
}
return dedup;
