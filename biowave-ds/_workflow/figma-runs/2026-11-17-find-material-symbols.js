await figma.loadAllPagesAsync();
const names = ['info', 'warning', 'lightbulb'];
const matches = [];
for (const page of figma.root.children) {
  const instances = page.findAll(n => n.type === 'INSTANCE');
  for (const inst of instances) {
    const mc = await inst.getMainComponentAsync();
    if (mc && mc.parent && mc.parent.name && mc.parent.name.startsWith('Material Symbols/')) {
      const symName = mc.parent.name.split('/')[1]?.trim();
      if (names.includes(symName)) {
        matches.push({
          symbol: symName,
          key: mc.key,
          compName: mc.name,
          parentName: mc.parent.name
        });
      }
    }
  }
}
const unique = [];
for (const m of matches) {
  if (!unique.some(u => u.symbol === m.symbol && u.key === m.key)) {
    unique.push(m);
  }
}
return unique;
