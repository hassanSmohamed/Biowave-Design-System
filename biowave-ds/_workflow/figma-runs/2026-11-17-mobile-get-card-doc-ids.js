const sec = await figma.getNodeByIdAsync("203:33519");
return sec.children.map(c => ({ id: c.id, name: c.name }));
