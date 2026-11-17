// Wave 10 — Add Accordion and Card to Components List on Mobile
for (const f of [['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold']]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const clPage = await figma.getNodeByIdAsync('14:2');
await clPage.loadAsync();
await figma.setCurrentPageAsync(clPage);

const cardsTop = await figma.getNodeByIdAsync('14:104');
const w9Row = await figma.getNodeByIdAsync('181:27013');
const sampleCard = await figma.getNodeByIdAsync('195:2898');

const accPageId = '201:28227';
const cardPageId = '202:28303';
const accSet = await figma.getNodeByIdAsync('201:28301');
const cardSet = await figma.getNodeByIdAsync('202:28604');

let w10Row = cardsTop.children.find(c => c.name.includes('Wave 10'));
if (!w10Row) {
  w10Row = w9Row.clone();
  w10Row.name = 'Wave 10 / Structure cards';
  // Remove cloned children
  [...w10Row.children].forEach(c => c.remove());
  cardsTop.appendChild(w10Row);
}

const items = [
  { name: 'Accordion', pageId: accPageId, set: accSet },
  { name: 'Card', pageId: cardPageId, set: cardSet }
];

const results = [];
for (const item of items) {
  let card = w10Row.children.find(c => {
    const h = c.findAll(x => x.type === 'TEXT').find(t => t.name === 'Heading');
    return h && h.characters.trim() === item.name;
  });

  if (!card) {
    card = sampleCard.clone();
    card.name = `${item.name} Card`;
    w10Row.appendChild(card);
  }

  // Update text
  const heading = card.findAll(x => x.type === 'TEXT').find(t => t.name === 'Heading');
  if (heading) heading.characters = item.name;

  // Update hyperlink
  const link = card.findAll(x => x.type === 'TEXT').find(t => t.name === 'View Component' || t.characters.includes('View Component'));
  if (link) link.hyperlink = { type: 'NODE', value: item.pageId };

  // Update thumbnail slot
  const dotGrid = card.findOne(n => n.name === '.bg-dot-grid');
  if (dotGrid) {
    // Remove existing instances inside dotGrid
    [...dotGrid.children].forEach(n => {
      if (n.type === 'INSTANCE' || n.name === item.name || n.name === 'Skeleton') {
        n.remove();
      }
    });
    const inst = item.set.defaultVariant.createInstance();
    inst.name = item.name;
    dotGrid.appendChild(inst);
    const aw = dotGrid.width - 32;
    const ah = dotGrid.height - 32;
    const scale = Math.min(aw / inst.width, ah / inst.height, 1.0) * 0.9;
    inst.rescale(scale);
    // Center inside dotGrid
    inst.x = Math.round((dotGrid.width - inst.width) / 2);
    inst.y = Math.round((dotGrid.height - inst.height) / 2);
  }

  results.push({ name: item.name, cardId: card.id, cardName: card.name });
}

return {
  ok: true,
  w10RowId: w10Row.id,
  results,
  totalRowCards: w10Row.children.length
};
