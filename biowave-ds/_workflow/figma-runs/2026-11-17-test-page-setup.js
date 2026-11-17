
const log = [];
try {
  log.push("1. find or create page");
  let page = figma.root.children.find(p => p.name.trim() === "↳ Accordion");
  if (!page) {
    page = figma.createPage();
    page.name = "     ↳ Accordion";
    const idx = figma.root.children.findIndex(p => p.name.includes("Skeleton") || p.name.includes("Empty state"));
    if (idx !== -1) figma.root.insertChild(idx + 1, page);
  }
  log.push("2. page created: " + page.id);
  log.push("3. loadAsync");
  await page.loadAsync();
  log.push("4. setCurrentPageAsync");
  await figma.setCurrentPageAsync(page);
  log.push("5. done");
  return { ok: true, log };
} catch (e) {
  return { ok: false, at: log[log.length - 1], error: e.message || String(e), log };
}
