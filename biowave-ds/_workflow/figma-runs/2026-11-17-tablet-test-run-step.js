const log = [];
try {
  log.push("1. fonts");
  for (const f of [
    ['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold'],
    ['IBM Plex Sans Arabic', 'Regular'], ['IBM Plex Sans Arabic', 'Medium'], ['IBM Plex Sans Arabic', 'SemiBold'], ['IBM Plex Sans Arabic', 'Bold']
  ]) {
    await figma.loadFontAsync({ family: f[0], style: f[1] });
  }

  log.push("2. get page & set");
  const accPage = figma.root.children.find(p => p.name.trim() === '↳ Accordion');
  await accPage.loadAsync();
  await figma.setCurrentPageAsync(accPage);
  const SET = accPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Accordion');
  log.push("SET: " + (SET ? SET.id : "null"));

  log.push("3. DK components");
  const C = async (k, set) => set ? await figma.importComponentSetByKeyAsync(k) : await figma.importComponentByKeyAsync(k);
  const DK = {
    header: await C('dd9347ba546590b632ae68976fe2733f3f7d340e'),
    section: await C('f29dffabb982e9374b1b804639f45514a29146a2'),
    axis: await C('24a64b9f56bb95bffc1b5f1ce61e58205b3023fb', 1),
    tile: await C('eb3bac08d98c62634cbbc8a6a0129a5fa1783836'),
    cell: await C('4b48bcab4faac402c079e941b30f8987159bfa3f', 1),
    row: await C('fb2c9fdd139f3be6860495d1d95a911275ed8224', 1),
    table: await C('40980251551a20a72810037dc043c66e9271600b')
  };

  log.push("4. variables");
  const iv = k => figma.variables.importVariableByKeyAsync(k);
  const W6 = await figma.variables.getVariableByIdAsync('VariableID:99599514c759fa9e28a58abf278f73814f1a0d18/4987:213');
  const W2 = await figma.variables.getVariableByIdAsync('VariableID:099f79a0492cc7bb141b6647f26b8637d2dd7021/4987:218');
  const XL = await iv('5fa0c2ce8ae034e9696038d2704e520fd8383e55');
  const BG = await iv('82c8830a9ba9a3837c6d6f261cc1b43e8b6a9c08');
  const typo = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');

  log.push("5. test setP");
  async function setP(inst, map) {
    const p = {};
    for (const [pre, val] of Object.entries(map)) {
      const k = Object.keys(inst.componentProperties).find(x => x === pre || x.split('#')[0] === pre);
      if (k) p[k] = val;
    }
    if (Object.keys(p).length) inst.setProperties(p);
    return inst;
  }

  log.push("6. test frame");
  const mkAL = (dir) => {
    const f = figma.createFrame();
    f.layoutMode = dir || 'VERTICAL';
    return f;
  };
  const f = mkAL('VERTICAL');
  f.name = 'Test / 00';
  f.setBoundVariable('width', W6);
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'FIXED';
  for (const p of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing']) {
    f.setBoundVariable(p, XL);
  }
  f.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', BG)];
  f.setExplicitVariableModeForCollection(typo, '3869:8');
  accPage.appendChild(f);
  log.push("7. frame created: " + f.id);

  f.remove();
  log.push("8. frame removed");

  return { ok: true, log };
} catch (e) {
  return { ok: false, at: log[log.length - 1], error: e.message || String(e), log };
}