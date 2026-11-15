const withTimeout = (p, ms = 1500) => Promise.race([p, new Promise(r => setTimeout(() => r('TIMEOUT'), ms))]);
const targets = ['info', 'warning', 'lightbulb', 'report', 'info_outline', 'warning_amber'];
const found = [];

for (const page of figma.root.children) {
  if (!page.name.includes('↳')) continue;
  // Load lightweight pages one by one with short timeout
  const st = await withTimeout(page.loadAsync(), 2000);
  if (st === 'TIMEOUT') continue;
  for (const n of page.findAll(x => x.type === 'INSTANCE')) {
    const nm = (n.name || '').toLowerCase();
    if (targets.some(t => nm === t || nm.endsWith('/' + t))) {
      const mc = await withTimeout(n.getMainComponentAsync(), 1500);
      if (mc && mc !== 'TIMEOUT') {
        found.push({
          page: page.name.trim(),
          nodeName: n.name,
          mcName: mc.name,
          mcKey: mc.key,
          setName: mc.parent ? mc.parent.name : null,
          setKey: mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.key : null
        });
      }
    }
  }
  if (found.length >= 12) break;
}
return found;
