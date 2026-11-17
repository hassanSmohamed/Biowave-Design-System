
try {
  const s = await figma.importStyleByKeyAsync("f8bd3e0517bac914b6aa83acda696907f0d4a37e");
  return { ok: true, name: s.name, id: s.id };
} catch (e) {
  return { ok: false, err: e.message };
}
