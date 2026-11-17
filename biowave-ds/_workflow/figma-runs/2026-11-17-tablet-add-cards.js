for (const f of [['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold']]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const clPage = await figma.getNodeByIdAsync('16:2');
await clPage.loadAsync();
await figma.setCurrentPageAsync(clPage);
const row = await figma.getNodeByIdAsync('192:1433');
const sampleCard = await figma.getNodeByIdAsync('233:3430'); // Skeleton Card

const accPageId = '229:662366';
const cardPageId = '235:662566';
const accSet = await figma.getNodeByIdAsync('230:662521');
const cardSet = await figma.getNodeByIdAsync('240:664022');

const items = [
  { name: 'Accordion', pageId: accPageId, set: accSet },
  { name: 'Card', pageId: cardPageId, set: cardSet }
];

const results = [];
for (const item of items) {
  let card = row.children.find(c => {
    const h = c.findAll(x => x.type === 'TEXT').find(t => t.name === 'Heading');
    return h && h.characters.trim() === item.name;
  });

  if (!card) {
    card = sampleCard.clone();
    card.name = `${item.name} Card`;
    row.appendChild(card);
  }

  // Update text
  const heading = card.findAll(x => x.type === 'TEXT').find(t => t.name === 'Heading');
  if (heading) heading.characters = item.name;

  // Update hyperlink
  const link = card.findAll(x => x.type === 'TEXT').find(t => t.name === 'View Component' || t.characters.includes('View Component'));
  if (link) link.hyperlink = { type: 'NODE', value: item.pageId };

  // Update thumbnail slot
  const sl = card.findOne(n => n.type === 'SLOT');
  if (sl) {
    [...sl.children].forEach(n => n.remove());
    const inst = item.set.defaultVariant.createInstance();
    sl.appendChild(inst);
    const aw = sl.width - (sl.paddingLeft || 0) - (sl.paddingRight || 0);
    const ah = sl.height - (sl.paddingTop || 0) - (sl.paddingBottom || 0);
    const scale = Math.min(aw / inst.width, ah / inst.height, 1.4) * 0.9;
    inst.rescale(scale);
  }

  results.push({ name: item.name, cardId: card.id, cardName: card.name });
}

return {
  ok: true,
  results,
  totalCards: row.children.length
};