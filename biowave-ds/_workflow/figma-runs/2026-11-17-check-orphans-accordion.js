const p = await figma.getNodeByIdAsync('706:22199');
await p.loadAsync();
await figma.setCurrentPageAsync(p);

// The page should hold only the two sections: Accordion — Component and Accordion — Documentation
const sections = p.children.filter(c => c.type === 'SECTION');
const nonSections = p.children.filter(c => c.type !== 'SECTION');

const checkList = [];
for (const node of nonSections) {
  let instancesCount = 0;
  if (node.type === 'COMPONENT') {
    const insts = await node.getInstancesAsync();
    instancesCount = insts.length;
  } else if (node.type === 'COMPONENT_SET') {
    for (const v of node.children) {
      const insts = await v.getInstancesAsync();
      instancesCount += insts.length;
    }
  } else if (node.findAll) {
    const comps = node.findAll(n => n.type === 'COMPONENT');
    for (const c of comps) {
      const insts = await c.getInstancesAsync();
      instancesCount += insts.length;
    }
  }
  checkList.push({
    id: node.id,
    name: node.name,
    type: node.type,
    instancesCount
  });
}

return {
  pageName: p.name,
  sections: sections.map(s => ({ id: s.id, name: s.name })),
  orphanCount: nonSections.length,
  checkList
};
