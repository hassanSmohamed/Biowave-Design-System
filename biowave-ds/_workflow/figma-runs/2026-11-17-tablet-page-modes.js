
const p = figma.root.children.find(x => x.name.includes("Skeleton"));
if (p) {
  return {
    name: p.name,
    explicitVariableModes: p.explicitVariableModes
  };
}
return { error: "Skeleton page not found" };
