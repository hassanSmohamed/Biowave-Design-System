// Unclip documentation cells and tile slots across all 4 Web Wave 9 documentation sections
const DOC_SECTIONS = ['697:8734', '699:7445', '699:9786', '700:11340'];
const modified = [];

for (const secId of DOC_SECTIONS) {
  const sec = await figma.getNodeByIdAsync(secId);
  if (!sec) continue;

  for (const page of sec.children) {
    // Find all frames that might clip examples (Doc / 00 cells, Tile slots, etc.)
    for (const frame of page.findAll(n => n.type === 'FRAME')) {
      // If it's a cell in a component sheet or a tile slot containing instances
      if (frame.name === 'Frame' || frame.name.startsWith('cell') || frame.name === 'Documentation content' || frame.name === 'slot' || frame.name === 'actions') {
        if (frame.clipsContent) {
          frame.clipsContent = false;
          modified.push({ sec: sec.name, page: page.name, frame: frame.name, id: frame.id });
        }
      }
    }
  }
}

return {
  ok: true,
  unclippedCount: modified.length
};
