const card = await figma.getNodeByIdAsync('203:35549');
const link = card.findAll(x => x.type === 'TEXT').find(t => t.name === 'View Component' || t.characters.includes('View Component'));
if (link) {
  link.hyperlink = { type: 'NODE', value: '201:28302' };
}
return { ok: true, linkValue: link.hyperlink.value };
