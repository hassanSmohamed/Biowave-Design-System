// needs CFG={plat:'web'|'tablet', en, ar, h:'size/control/height/sm', icon:'size/icon/md', after:'↳ Top app bar', appHeader: id|null}
for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const want=['color/background/transparent/default','color/background/transparent/hovered','color/background/transparent/pressed','color/background/neutral/default','color/text/subtlest','color/text/default','color/icon/subtlest','color/icon/default','color/border/focus','border/width/focus',CFG.h,CFG.icon,'spacing/md','spacing/xs','spacing/xl','radius/md'];
const K={}; for(const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()){ if(c.libraryName!=='Biowave DS — Foundations') continue; for(const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) if(want.includes(v.name)&&!K[v.name]) K[v.name]=v.key; }
const miss=want.filter(w=>!K[w]); if(miss.length) return {missing:miss};
const V={}; for(const [n,k] of Object.entries(K)) V[n]=await figma.variables.importVariableByKeyAsync(k);
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
const typo=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const grid=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205');
const LAB=await figma.importStyleByKeyAsync('e3c53522eceb6758fc2a3be8644311f584118505');
const gly=async k=>{ const s=await figma.importComponentSetByKeyAsync(k); return s.children.find(c=>c.name==='Style=Rounded, Fill=Unfilled')||s.defaultVariant; };
const G={right:await gly('cdd1a195c723930ded7770d8c6f1bc432c385482'),left:await gly('489e86470d75d0b400cb2670999c728ccfc8e27c'),more:await gly('b20a6f8323610d658f0068b530f72b73c210f748')};
const findPage=n=>figma.root.children.find(p=>p.name.trim()===n);
let page=findPage('↳ Breadcrumbs');
if(!page){ const idx=figma.root.children.findIndex(p=>p.name.trim()===CFG.after)+1; page=figma.createPage(); page.name='     ↳ Breadcrumbs'; figma.root.insertChild(idx,page); }
await figma.setCurrentPageAsync(page); page.setExplicitVariableModeForCollection(typo,CFG.en);
if(CFG.gridMode) page.setExplicitVariableModeForCollection(grid,CFG.gridMode);
if(page.findOne(n=>n.type==='COMPONENT_SET'&&n.name==='Breadcrumbs')) return 'exists';
const bind=(n,ks,v)=>{ for(const k of ks) n.setBoundVariable(k,v); };
const rads=['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'];
const icon=(g,colorVar,name)=>{ const i=g.createInstance(); i.name=name||'icon'; i.setBoundVariable('width',V[CFG.icon]); i.setBoundVariable('height',V[CFG.icon]); for(const v of i.findAll(n=>'fills' in n&&Array.isArray(n.fills)&&n.fills.length&&n.type!=='INSTANCE'&&n.type!=='FRAME')) v.fills=[paint(colorVar)]; return i; };
const area=figma.createSection(); area.name='Breadcrumbs — Component'; page.appendChild(area);
// .Breadcrumb item
const its=[];
for(const st of ['Default','Hovered','Pressed','Focused','Current','Overflow']){ const c=figma.createComponent(); c.name='State='+st; area.appendChild(c);
 c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='CENTER'; c.primaryAxisAlignItems='CENTER'; c.counterAxisSizingMode='FIXED'; c.resize(80,32); c.primaryAxisSizingMode='AUTO'; c.setBoundVariable('height',V[CFG.h]);
 bind(c,['paddingLeft','paddingRight'],V['spacing/md']); bind(c,rads,V['radius/md']); c.setBoundVariable('itemSpacing',V['spacing/xs']);
 const fill={Default:'transparent/default',Hovered:'transparent/hovered',Pressed:'transparent/pressed',Focused:'transparent/default',Current:'neutral/default',Overflow:'transparent/default'}[st];
 c.fills=[paint(V['color/background/'+fill])];
 if(st==='Focused'){ c.strokes=[paint(V['color/border/focus'])]; c.strokeAlign='OUTSIDE'; c.setBoundVariable('strokeWeight',V['border/width/focus']); }
 const strong=(st==='Hovered'||st==='Pressed'||st==='Current');
 if(st==='Overflow'){ c.appendChild(icon(G.more,V['color/icon/subtlest'],'overflow-icon')); }
 const t=figma.createText(); t.name='label'; await t.setTextStyleIdAsync(LAB.id); t.characters='Devices'; t.fills=[paint(V[strong?'color/text/default':'color/text/subtlest'])]; t.textTruncation='ENDING'; c.appendChild(t);
 if(st==='Overflow') t.visible=false;
 its.push(c); }
const IT=figma.combineAsVariants(its,area); IT.name='.Breadcrumb item'; IT.layoutMode='HORIZONTAL'; IT.itemSpacing=16; bind(IT,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); IT.counterAxisAlignItems='CENTER'; IT.fills=[];
const lP=IT.addComponentProperty('Label','TEXT','Devices'); for(const c of IT.children){ c.findOne(x=>x.name==='label').componentPropertyReferences={characters:lP}; }
IT.description='Private. One step of Breadcrumbs. State Default · Hovered · Pressed · Focused · Current (last item, not a link) · Overflow ("…", opens a Menu).';
// .Breadcrumb separator
const seps=[]; for(const dir of ['LTR','RTL']){ const c=figma.createComponent(); c.name='Direction='+dir; area.appendChild(c); c.layoutMode='HORIZONTAL'; c.primaryAxisSizingMode='AUTO'; c.counterAxisSizingMode='AUTO'; c.fills=[]; c.appendChild(icon(dir==='LTR'?G.right:G.left,V['color/icon/subtlest'],'chevron')); seps.push(c); }
const SP=figma.combineAsVariants(seps,area); SP.name='.Breadcrumb separator'; SP.layoutMode='HORIZONTAL'; SP.itemSpacing=16; bind(SP,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); SP.fills=[];
SP.description='Private. chevron_right; Direction=RTL uses the mirrored chevron (points left). Decoration only.';
// Breadcrumbs set
const PATHS={EN:{'2':['Devices','All devices'],'3':['Devices','Biometric terminals','Gate A-12'],'4':['Devices','Biometric terminals','Gate A-12','Network'],'Collapsed':['Devices','…','Terminal settings','Network']},
 AR:{'2':['الأجهزة','كل الأجهزة'],'3':['الأجهزة','أجهزة البصمة','البوابة A-12'],'4':['الأجهزة','أجهزة البصمة','البوابة A-12','الشبكة'],'Collapsed':['الأجهزة','…','إعدادات الجهاز','الشبكة']}};
const itemV=s=>IT.children.find(c=>c.name==='State='+s);
const bcs=[];
for(const lang of ['EN','AR']) for(const n of ['2','3','4','Collapsed']){ const c=figma.createComponent(); c.name=`Items=${n}, Language=${lang}`; area.appendChild(c);
 c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='CENTER'; c.primaryAxisSizingMode='AUTO'; c.counterAxisSizingMode='AUTO'; c.setBoundVariable('itemSpacing',V['spacing/xs']); c.fills=[];
 if(lang==='AR') c.setExplicitVariableModeForCollection(typo,CFG.ar);
 const p=PATHS[lang][n]; const nodes=[];
 p.forEach((lab,i)=>{ const last=i===p.length-1; const it=itemV(lab==='…'?'Overflow':(last?'Current':'Default')).createInstance(); it.name=lab==='…'?'overflow':(last?'current':'item '+(i+1)); if(lab!=='…') it.setProperties({[lP]:lab}); nodes.push(it);
  if(!last){ const s=SP.children.find(x=>x.name==='Direction='+(lang==='AR'?'RTL':'LTR')).createInstance(); s.name='separator'; nodes.push(s); } });
 (lang==='AR'?nodes.reverse():nodes).forEach(x=>c.appendChild(x));
 bcs.push(c); }
const BC=figma.combineAsVariants(bcs,area); BC.name='Breadcrumbs'; BC.layoutMode='VERTICAL'; BC.layoutWrap='NO_WRAP'; BC.itemSpacing=24; BC.counterAxisAlignItems='MIN'; bind(BC,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); BC.fills=[];
BC.description='Shows where the current page sits in the product (module › section › page) and lets the user jump back up one or more levels. Spec: '+(CFG.plat==='web'?'3-web-components':'4-tablet-components')+'/components/breadcrumbs/breadcrumbs.md';
const dv=BC.children.find(c=>c.name==='Items=3, Language=EN'); BC.insertChild(0,dv);
// layout inside the section
IT.x=80; IT.y=80; SP.x=80; SP.y=IT.y+IT.height+60; BC.x=Math.max(IT.x+IT.width,SP.x+SP.width)+120; BC.y=80;
area.resizeWithoutConstraints(Math.max(1200,BC.x+BC.width+80), Math.max(IT.y+IT.height,SP.y+SP.height,BC.y+BC.height)+80);
const out={page:page.id,set:BC.id,item:IT.id,sep:SP.id,section:area.id};
// App header Title slot
if(CFG.appHeader){ const AH=await figma.getNodeByIdAsync(CFG.appHeader); out.slots=[];
 for(const v of AH.children){ const lang=v.name.includes('AR')?'AR':'EN'; const sl=v.findOne(n=>n.type==='SLOT'&&/title/i.test(n.name)); if(!sl){ out.slots.push('no slot in '+v.name); continue; }
  [...sl.children].forEach(n=>n.remove()); const b=BC.children.find(c=>c.name===`Items=3, Language=${lang}`).createInstance(); b.name='breadcrumbs'; sl.appendChild(b); out.slots.push(v.name+' ok'); } }
return out;
