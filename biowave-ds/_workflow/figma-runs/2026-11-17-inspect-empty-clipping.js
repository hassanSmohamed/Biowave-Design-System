const p00 = await figma.getNodeByIdAsync('699:7526');
const p03 = await figma.getNodeByIdAsync('699:8377');
const p08 = await figma.getNodeByIdAsync('699:9325');

const checkFrames = (page) => {
  const clipped = [];
  for (const n of page.findAll(x => x.type === 'FRAME')) {
    if (n.clipsContent) {
      clipped.push({ id: n.id, name: n.name, w: n.width, h: n.height });
    }
  }
  return clipped;
};

return {
  p00Clipped: checkFrames(p00),
  p03Clipped: checkFrames(p03),
  p08Clipped: checkFrames(p08)
};
