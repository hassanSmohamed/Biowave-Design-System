const set = await figma.getNodeByIdAsync("201:28301");
const unbound = [];
const checkNode = (n, isRoot = false) => {
  if (!isRoot && n.type !== 'COMPONENT_SET') {
    if (n.fills && Array.isArray(n.fills)) {
      for (const f of n.fills) {
        if (f.visible !== false && f.type === "SOLID" && (!f.boundVariables || !f.boundVariables.color)) {
          unbound.push({ node: n.name, type: "fill", color: f.color });
        }
      }
    }
    if (n.strokes && Array.isArray(n.strokes)) {
      for (const s of n.strokes) {
        if (s.visible !== false && s.type === "SOLID" && (!s.boundVariables || !s.boundVariables.color)) {
          unbound.push({ node: n.name, type: "stroke", color: s.color });
        }
      }
    }
    if (n.type === "TEXT" && !n.textStyleId) {
      unbound.push({ node: n.name, type: "textStyle", text: n.characters });
    }
    if (n.type === 'FRAME' || n.type === 'COMPONENT') {
      for (const prop of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'itemSpacing']) {
        if (n[prop] > 0 && (!n.boundVariables || !n.boundVariables[prop])) {
          unbound.push({ node: n.name, type: prop, val: n[prop] });
        }
      }
      if (typeof n.cornerRadius === 'number' && n.cornerRadius > 0) {
        if (!n.boundVariables || (!n.boundVariables.cornerRadius && !n.boundVariables.topLeftRadius)) {
          unbound.push({ node: n.name, type: 'cornerRadius', val: n.cornerRadius });
        }
      }
    }
  }
  if (n.children) {
    for (const c of n.children) checkNode(c, false);
  }
};
checkNode(set, true);
return { totalUnbound: unbound.length, unbound };