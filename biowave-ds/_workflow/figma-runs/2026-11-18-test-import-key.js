try {
  const comp = await figma.importComponentByKeyAsync('3121996eaabfa69051ae557ce13a33a30b320cbf');
  return { ok: true, name: comp.name, key: comp.key };
} catch (e) {
  return { ok: false, error: e.message };
}
