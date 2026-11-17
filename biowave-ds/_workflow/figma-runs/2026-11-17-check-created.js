
return figma.root.children.filter(p => p.name.includes("Accordion")).map(p => ({ id: p.id, name: p.name, childCount: p.children.length }));
