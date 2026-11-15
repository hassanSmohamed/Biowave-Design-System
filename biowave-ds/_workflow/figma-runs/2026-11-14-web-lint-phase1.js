// Lint Phase 1 component sets in Web Components (Alert, Snackbar, Empty state, Skeleton)
const PAGE_IDS = ['691:218883', '694:219747', '694:220192', '694:219741'];
const bad = [];
const summary = {};
for (const pid of PAGE_IDS) {
  const p = await figma.getNodeByIdAsync(pid);
  await p.loadAsync();
  const s = p.children.find(n => n.name.endsWith('— Component'));
  const cs = s && s.children.find(n => n.type === 'COMPONENT_SET');
  summary[p.name] = {
    pageId: p.id,
    sectionId: s ? s.id : null,
    setId: cs ? cs.id : null,
    variants: cs ? cs.children.length : 0,
    variantNames: cs ? cs.children.map(c => c.name) : [],
    props: cs ? Object.keys(cs.componentPropertyDefinitions) : []
  };
  for (const n of s.findAll(() => true)) {
    let q = n.parent, ii = false;
    while (q && q !== s) { if (q.type === 'INSTANCE') { ii = true; break; } q = q.parent; }
    if (ii || n.type === 'COMPONENT_SET' || n.type === 'INSTANCE') continue;
    for (const k of ['fills', 'strokes']) {
      if (Array.isArray(n[k])) {
        n[k].forEach(pt => {
          if (pt.type === 'SOLID' && pt.visible !== false && !(pt.boundVariables && pt.boundVariables.color)) {
            bad.push(p.name + ':' + n.name + ' ' + k);
          }
        });
      }
    }
    if (n.type === 'TEXT' && !n.textStyleId) bad.push(p.name + ':' + n.name + ' no style');
    if (n.layoutMode && n.layoutMode !== 'NONE') {
      for (const k of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing']) {
        if (n[k] > 0 && !(n.boundVariables && n.boundVariables[k])) {
          bad.push(p.name + ':' + n.name + ' raw ' + k);
        }
      }
    }
  }
}
return { unbound: [...new Set(bad)], summary };
