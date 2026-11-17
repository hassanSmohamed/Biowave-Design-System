
try {
  const p = figma.createPage();
  p.name = "_test_page";
  await figma.setCurrentPageAsync(p);
  const f = figma.createFrame();
  f.name = "box";
  p.appendChild(f);
  const res = { ok: true, pageId: p.id };
  p.remove();
  return res;
} catch (e) {
  return { ok: false, error: String(e) };
}
