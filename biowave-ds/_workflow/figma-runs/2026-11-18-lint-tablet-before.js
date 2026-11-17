const SETS = ['218:650151', '218:650210', '218:650317', '218:650323'];
const issues = [];
for (const id of SETS) {
  const s = await figma.getNodeByIdAsync(id);
  if (!s) { issues.push(`Set ${id} not found`); continue; }
  for (const v of s.children) {
    for (const n of v.findAll(() => true)) {
      let q = n.parent, inInst = false;
      while (q && q !== v) {
        if (q.type === 'INSTANCE') { inInst = true; break; }
        q = q.parent;
      }
      if (n.type === 'INSTANCE' && !inInst) {
        const m = await n.getMainComponentAsync();
        const setName = m && m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name : '';
        if (/\.Button _/.test(setName) && (n.minWidth || n.layoutSizingHorizontal === 'FIXED')) {
          issues.push(`${v.name} › ${n.name}: Button fixed ${Math.round(n.width)} / minWidth ${n.minWidth}`);
        }
      }
      if (inInst || n.type === 'INSTANCE') continue;
      for (const k of ['fills', 'strokes']) {
        if (Array.isArray(n[k])) {
          n[k].forEach((p) => {
            if (p.type === 'SOLID' && p.visible !== false && !(p.boundVariables && p.boundVariables.color)) {
              issues.push(`${v.name} › ${n.name} raw ${k}`);
            }
          });
        }
      }
      if (n.type === 'TEXT' && !n.textStyleId) issues.push(`${v.name} › ${n.name} no text style`);
      if (n.layoutMode && n.layoutMode !== 'NONE') {
        for (const k of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing']) {
          if (n[k] > 0 && !(n.boundVariables && n.boundVariables[k])) {
            issues.push(`${v.name} › ${n.name} raw ${k}`);
          }
        }
      }
      if (n !== v && n.absoluteBoundingBox && v.absoluteBoundingBox) {
        const a = n.absoluteBoundingBox, b = v.absoluteBoundingBox;
        if (a.x < b.x - 0.5 || a.x + a.width > b.x + b.width + 0.5) {
          issues.push(`${v.name} › ${n.name} sticks out of the variant`);
        }
      }
      if (n.type === 'FRAME' && /button/i.test(n.name)) {
        issues.push(`${v.name} › ${n.name}: hand-drawn control — use Button / Icon Button`);
      }
    }
  }
}
return { issues, count: issues.length };
