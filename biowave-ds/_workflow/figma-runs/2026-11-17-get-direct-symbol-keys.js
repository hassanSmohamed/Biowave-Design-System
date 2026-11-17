const nodeIds = ['2:44344', '2:124572', '2:64556'];
const res = [];
for (const id of nodeIds) {
  const node = await figma.getNodeByIdAsync(id);
  if (node) {
    res.push({
      id: node.id,
      name: node.name,
      parentName: node.parent?.name,
      key: node.key,
      parentKey: node.parent?.key
    });
  } else {
    res.push({ id, error: 'not found' });
  }
}
return res;
