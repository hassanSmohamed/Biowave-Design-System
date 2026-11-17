const sec = await figma.getNodeByIdAsync("203:30777");
return sec.children.map(c => ({ id: c.id, name: c.name }));
