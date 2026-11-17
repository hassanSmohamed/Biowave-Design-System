const icons = [];
for (const p of figma.root.children) {
  if (p.name.includes('Banner') || p.name.includes('Alert') || p.name.includes('Tooltip') || p.name.includes('Popover') || p.name.includes('Dialog') || p.name.includes('Icons') || p.name.includes('Badge')) {
    await p.loadAsync();
    for (const inst of p.findAll(n => n.type === 'INSTANCE' && (n.name === 'icon' || n.name === 'leading-icon' || n.name === 'trailing-icon' || n.name === 'Icon'))) {
      try {
        const mc = await inst.getMainComponentAsync();
        if (mc && mc.parent && mc.parent.name && mc.parent.name.includes('Material Symbols/')) {
          icons.push({
            sym: mc.parent.name.replace('Material Symbols/', ''),
            key: mc.key,
            setKey: mc.parent.key,
            style: mc.name
          });
        }
      } catch (_) {}
    }
  }
}
const unique = [];
for (const i of icons) {
  if (!unique.some(u => u.sym === i.sym && u.key === i.key)) unique.push(i);
}
return unique;
