// Inspect Web Snackbar variants to see exact structure
const webSb = await figma.getNodeByIdAsync('694:220191');
const report = [];

for (const v of webSb.children) {
  const items = [];
  for (const c of v.children) {
    const main = c.type === 'INSTANCE' ? await c.getMainComponentAsync() : null;
    items.push({
      name: c.name,
      type: c.type,
      layoutSizingHorizontal: c.layoutSizingHorizontal,
      layoutSizingVertical: c.layoutSizingVertical,
      componentProperties: c.componentProperties,
      mainName: main ? main.name : null,
      parentSet: main && main.parent ? main.parent.name : null
    });
  }
  report.push({
    name: v.name,
    padding: {
      l: v.paddingLeft, r: v.paddingRight, t: v.paddingTop, b: v.paddingBottom, itemSpacing: v.itemSpacing
    },
    items
  });
}

return report;
