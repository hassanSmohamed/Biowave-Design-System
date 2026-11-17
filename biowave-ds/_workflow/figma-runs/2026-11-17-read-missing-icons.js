const NAMES = ['info', 'warning', 'lightbulb', 'attach_file', 'check', 'dashboard', 'devices', 'open_in_new', 'person', 'photo_camera'];
const page = figma.root.children.find((p) => /Material Symbols/i.test(p.name));
if (!page) throw new Error('No "Google · Material Symbols" page in this file');
await page.loadAsync();
const want = new Set(NAMES);
const out = [`F|${figma.root.name}|icons`];
for (const s of page.findAllWithCriteria({ types: ['COMPONENT_SET'] })) {
  const n = s.name.replace(/^Material Symbols\//, '');
  if (!want.has(n)) continue;
  want.delete(n);
  const v = (fill) => s.children.find((c) => c.variantProperties?.Style === 'Rounded' && c.variantProperties?.Fill === fill);
  out.push(['I', n, s.key, v('Unfilled')?.key || '', v('Filled')?.key || ''].join('|'));
}
for (const n of want) out.push(`X|${n}|not in the icon library`);
return out.join('\n');
