const compSet = await figma.getNodeByIdAsync("240:664022");
if (!compSet) return { ok: false, error: "compSet not found" };

const unbound = [];
function checkNode(node) {
  // check fills
  if ('fills' in node && Array.isArray(node.fills)) {
    for (const f of node.fills) {
      if (f.type === 'SOLID' && f.visible !== false) {
        if (!f.boundVariables || !f.boundVariables.color) {
          unbound.push({ id: node.id, name: node.name, type: 'fill', nodeType: node.type });
        }
      }
    }
  }
  // check strokes
  if ('strokes' in node && Array.isArray(node.strokes)) {
    for (const s of node.strokes) {
      if (s.type === 'SOLID' && s.visible !== false) {
        if (!s.boundVariables || !s.boundVariables.color) {
          unbound.push({ id: node.id, name: node.name, type: 'stroke', nodeType: node.type });
        }
      }
    }
  }
  // check corner radius
  if ('cornerRadius' in node && typeof node.cornerRadius === 'number' && node.cornerRadius > 0) {
    if (!node.boundVariables || (!node.boundVariables.cornerRadius && !node.boundVariables.topLeftRadius)) {
      unbound.push({ id: node.id, name: node.name, type: 'cornerRadius', val: node.cornerRadius });
    }
  }
  // check padding & gap
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
    for (const prop of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'itemSpacing']) {
      if (node[prop] > 0 && (!node.boundVariables || !node.boundVariables[prop])) {
        unbound.push({ id: node.id, name: node.name, type: prop, val: node[prop] });
      }
    }
  }
  // check children
  if ('children' in node) {
    for (const c of node.children) {
      checkNode(c);
    }
  }
}

checkNode(compSet);
return {
  ok: true,
  compSetId: compSet.id,
  name: compSet.name,
  variants: compSet.children.length,
  totalUnbound: unbound.length,
  unbound
};