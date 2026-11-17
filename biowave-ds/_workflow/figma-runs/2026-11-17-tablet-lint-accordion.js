
const set = await figma.getNodeByIdAsync("230:662521");
const unbound = [];
const checkNode = (n) => {
  // check fills
  if (n.fills && Array.isArray(n.fills)) {
    for (const f of n.fills) {
      if (f.type === "SOLID" && (!f.boundVariables || !f.boundVariables.color)) {
        unbound.push({ node: n.name, type: "fill", color: f.color });
      }
    }
  }
  // check strokes
  if (n.strokes && Array.isArray(n.strokes)) {
    for (const s of n.strokes) {
      if (s.type === "SOLID" && (!s.boundVariables || !s.boundVariables.color)) {
        unbound.push({ node: n.name, type: "stroke", color: s.color });
      }
    }
  }
  // check text
  if (n.type === "TEXT" && !n.textStyleId) {
    unbound.push({ node: n.name, type: "textStyle", text: n.characters });
  }
  if (n.children) {
    for (const c of n.children) checkNode(c);
  }
};
checkNode(set);
return { totalUnbound: unbound.length, unbound };
