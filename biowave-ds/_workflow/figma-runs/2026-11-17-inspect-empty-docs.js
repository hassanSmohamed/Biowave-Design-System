const sec = await figma.getNodeByIdAsync('699:9786');
return {
  name: sec.name,
  pages: sec.children.map(c => ({ id: c.id, name: c.name, width: c.width, height: c.height }))
};
