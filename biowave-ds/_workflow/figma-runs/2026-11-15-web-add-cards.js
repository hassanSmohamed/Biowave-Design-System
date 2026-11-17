// Add Accordion Card and Card Card to Components List in Web Components
for (const f of [['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold']]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const page = await figma.getNodeByIdAsync('75:85');
await page.loadAsync();
await figma.setCurrentPageAsync(page);

const listSec = await figma.getNodeByIdAsync('648:9907');
const sampleCard = await figma.getNodeByIdAsync('700:13903'); // Alert Card

// Accordion Card
let accCard = listSec.children.find(c => c.name === 'Accordion Card');
if (!accCard) {
  accCard = sampleCard.clone();
  accCard.name = 'Accordion Card';
  listSec.appendChild(accCard);
}
for (const n of accCard.findAll(x => x.type === 'TEXT')) {
  if (n.name === 'Title' || n.characters.includes('Alert')) n.characters = 'Accordion';
  if (n.name === 'Description' || n.characters.includes('inline status')) n.characters = 'Collapsible content panel with header trigger';
}

// Card Card
let cardCard = listSec.children.find(c => c.name === 'Card Card');
if (!cardCard) {
  cardCard = sampleCard.clone();
  cardCard.name = 'Card Card';
  listSec.appendChild(cardCard);
}
for (const n of cardCard.findAll(x => x.type === 'TEXT')) {
  if (n.name === 'Title' || n.characters.includes('Alert')) n.characters = 'Card';
  if (n.name === 'Description' || n.characters.includes('inline status')) n.characters = 'Foundational surface container for grouped content';
}

return {
  ok: true,
  accCardId: accCard.id,
  cardCardId: cardCard.id,
  totalCards: listSec.children.length
};
