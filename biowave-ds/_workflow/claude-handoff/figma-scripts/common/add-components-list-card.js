// Add a card to a row on the "Components List" page by cloning the last card in the row.
// Rows used for the navigation family: Web 648:9907 · Tablet 192:1433 · Mobile 151:8569. Components List page: Web 75:85 · Tablet 16:2 · Mobile (find by name).
const ROW='648:9907', NAME='Tabs', SET_ID='655:476', PAGE_ID='655:33', MAX_SCALE=1.4;
for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['Inter','Bold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const row=await figma.getNodeByIdAsync(ROW); let pg=row; while(pg.type!=='PAGE') pg=pg.parent; await figma.setCurrentPageAsync(pg);
if(row.children.find(n=>n.name===NAME+' Card')) return 'exists';
const last=row.children[row.children.length-1]; const c=last.clone(); row.appendChild(c); c.name=NAME+' Card';
for(const s of c.findAll(n=>n.type==='TEXT')) for(const g of s.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(g.fontName);
const tk=Object.keys(c.componentProperties).find(k=>k.startsWith('Title')); c.setProperties({[tk]:NAME});
const sl=c.findOne(n=>n.type==='SLOT'); [...sl.children].forEach(n=>n.remove()); const set=await figma.getNodeByIdAsync(SET_ID); const n=set.defaultVariant.createInstance(); sl.appendChild(n);
const aw=sl.width-(sl.paddingLeft||0)-(sl.paddingRight||0), ah=sl.height-(sl.paddingTop||0)-(sl.paddingBottom||0); n.rescale(Math.min(aw/n.width,ah/n.height,MAX_SCALE)*0.9);
const link=c.findAll(n=>n.type==='TEXT').find(t=>/View Component/.test(t.characters)); if(link) link.hyperlink={type:'NODE',value:PAGE_ID};
return row.children.map(c=>c.name);
