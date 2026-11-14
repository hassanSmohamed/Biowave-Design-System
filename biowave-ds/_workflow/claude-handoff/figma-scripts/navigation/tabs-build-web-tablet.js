for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const want=['color/background/transparent/default','color/background/transparent/hovered','color/background/transparent/pressed','color/background/selected/default','color/text/subtle','color/text/default','color/text/role/brand','color/text/disabled','color/icon/subtle','color/icon/default','color/icon/role/brand','color/icon/disabled','color/border/focus','color/border/brand','color/border/subtle','border/width/focus','border/width/strong','border/width/default',CFG.h1,CFG.h2,CFG.icon,'spacing/md','spacing/lg','spacing/xl','spacing/3xl','radius/md','radius/full'];
const K={}; for(const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()){ if(c.libraryName!=='Biowave DS — Foundations') continue; for(const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) if(want.includes(v.name)&&!K[v.name]) K[v.name]=v.key; }
const miss=want.filter(w=>!K[w]); if(miss.length) return {missing:miss};
const V={}; for(const [n,k] of Object.entries(K)) V[n]=await figma.variables.importVariableByKeyAsync(k);
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
const typo=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const grid=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205');
const LAB=await figma.importStyleByKeyAsync('9fe6ff3cff9d3abce486aab5175350b06e06b891');
const gly=async k=>{ const s=await figma.importComponentSetByKeyAsync(k); return s.children.find(c=>c.name==='Style=Rounded, Fill=Unfilled')||s.defaultVariant; };
const DASH=await gly('d9bb6585526d9fee184e35e84512364ad99d4229');
const BADGE=await figma.getNodeByIdAsync(CFG.badge);
const pick=(set,o)=>set.children.find(c=>Object.entries(o).every(([k,v])=>c.name.split(', ').includes(k+'='+v)));
const findPage=n=>figma.root.children.find(p=>p.name.trim()===n);
let page=findPage('↳ Tabs');
if(!page){ const idx=figma.root.children.findIndex(p=>p.name.trim()===CFG.after)+1; page=figma.createPage(); page.name='     ↳ Tabs'; figma.root.insertChild(idx,page); }
await figma.setCurrentPageAsync(page); page.setExplicitVariableModeForCollection(typo,CFG.en); if(CFG.gridMode) page.setExplicitVariableModeForCollection(grid,CFG.gridMode);
if(page.findOne(n=>n.type==='COMPONENT_SET'&&n.name==='Tabs')) return 'exists';
const bind=(n,ks,v)=>{ for(const k of ks) n.setBoundVariable(k,v); };
const rads=['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'];
const area=figma.createSection(); area.name='Tabs — Component'; page.appendChild(area);
const tabs=[];
for(const vr of ['Primary','Secondary']) for(const st of ['Default','Hovered','Pressed','Focused','Selected','Disabled']) for(const dir of ['LTR','RTL']){
 const c=figma.createComponent(); c.name=`Variant=${vr}, State=${st}, Direction=${dir}`; area.appendChild(c);
 c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='CENTER'; c.primaryAxisAlignItems='CENTER'; c.counterAxisSizingMode='FIXED'; c.resize(100,40); c.primaryAxisSizingMode='AUTO';
 c.setBoundVariable('height',V[vr==='Primary'?CFG.h1:CFG.h2]); bind(c,['paddingLeft','paddingRight'],V[vr==='Primary'?'spacing/3xl':'spacing/lg']); c.setBoundVariable('itemSpacing',V['spacing/md']);
 if(vr==='Secondary') bind(c,rads,V['radius/full']); else if(st==='Focused') bind(c,rads,V['radius/md']);
 const fill={Default:'transparent/default',Hovered:'transparent/hovered',Pressed:'transparent/pressed',Focused:'transparent/default',Selected:(vr==='Secondary'?'selected/default':'transparent/default'),Disabled:'transparent/default'}[st];
 c.fills=[paint(V['color/background/'+fill])];
 if(st==='Focused'){ c.strokes=[paint(V['color/border/focus'])]; c.strokeAlign='INSIDE'; c.setBoundVariable('strokeWeight',V['border/width/focus']); }
 if(st==='Selected'&&vr==='Primary'){ c.strokes=[paint(V['color/border/brand'])]; c.strokeAlign='INSIDE'; c.strokeTopWeight=0; c.strokeLeftWeight=0; c.strokeRightWeight=0; c.setBoundVariable('strokeBottomWeight',V['border/width/strong']); }
 const tc={Default:'subtle',Hovered:'default',Pressed:'default',Focused:'subtle',Selected:'role/brand',Disabled:'disabled'}[st];
 const ic=DASH.createInstance(); ic.name='icon'; ic.setBoundVariable('width',V[CFG.icon]); ic.setBoundVariable('height',V[CFG.icon]); for(const v of ic.findAll(n=>'fills' in n&&Array.isArray(n.fills)&&n.fills.length&&n.type!=='INSTANCE'&&n.type!=='FRAME')) v.fills=[paint(V['color/icon/'+tc])];
 const t=figma.createText(); t.name='label'; await t.setTextStyleIdAsync(LAB.id); t.characters='Overview'; t.fills=[paint(V['color/text/'+tc])];
 const b=pick(BADGE,{Variant:'Count',Color:'Brand',Ring:'Off',Language:dir==='RTL'?'AR':'EN'}).createInstance(); b.name='badge';
 (dir==='LTR'?[ic,t,b]:[b,t,ic]).forEach(x=>c.appendChild(x));
 tabs.push(c); }
const TAB=figma.combineAsVariants(tabs,area); TAB.name='.Tab'; TAB.layoutMode='HORIZONTAL'; TAB.layoutWrap='WRAP'; TAB.counterAxisSpacing=16; TAB.itemSpacing=16; TAB.resize(1100,100); TAB.primaryAxisSizingMode='FIXED'; TAB.counterAxisSizingMode='AUTO'; bind(TAB,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); TAB.fills=[];
const lP=TAB.addComponentProperty('Label','TEXT','Overview'), siP=TAB.addComponentProperty('Show icon','BOOLEAN',false), iP=TAB.addComponentProperty('Icon','INSTANCE_SWAP',DASH.id), sbP=TAB.addComponentProperty('Show badge','BOOLEAN',false);
for(const c of TAB.children){ c.findOne(x=>x.name==='label').componentPropertyReferences={characters:lP}; c.findOne(x=>x.name==='icon').componentPropertyReferences={visible:siP,mainComponent:iP}; c.findOne(x=>x.name==='badge').componentPropertyReferences={visible:sbP}; }
TAB.description='Private. One tab. Variant Primary (underline) · Secondary (chip) × State × Direction (RTL puts the icon on the right, the badge on the left).';
const L={EN:['Overview','Users','Access logs','Schedules','Settings'],AR:['نظرة عامة','المستخدمون','سجلات الدخول','الجداول','الإعدادات']};
const sets=[];
for(const lang of ['EN','AR']) for(const vr of ['Primary','Secondary']){ const c=figma.createComponent(); c.name=`Variant=${vr}, Language=${lang}`; area.appendChild(c);
 c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='MAX'; c.primaryAxisSizingMode='AUTO'; c.counterAxisSizingMode='AUTO'; c.setBoundVariable('itemSpacing',V[vr==='Primary'?'spacing/xl':'spacing/md']); c.fills=[];
 if(vr==='Primary'){ c.strokes=[paint(V['color/border/subtle'])]; c.strokeAlign='INSIDE'; c.strokeTopWeight=0; c.strokeLeftWeight=0; c.strokeRightWeight=0; c.setBoundVariable('strokeBottomWeight',V['border/width/default']); }
 if(lang==='AR') c.setExplicitVariableModeForCollection(typo,CFG.ar);
 const nodes=L[lang].map((lab,i)=>{ const it=pick(TAB,{Variant:vr,State:i===0?'Selected':'Default',Direction:lang==='AR'?'RTL':'LTR'}).createInstance(); it.name='tab '+(i+1); it.setProperties({[lP]:lab}); return it; });
 (lang==='AR'?nodes.slice().reverse():nodes).forEach(x=>c.appendChild(x)); sets.push(c); }
const TS=figma.combineAsVariants(sets,area); TS.name='Tabs'; TS.layoutMode='VERTICAL'; TS.itemSpacing=32; TS.counterAxisAlignItems='MIN'; TS.primaryAxisSizingMode='AUTO'; TS.counterAxisSizingMode='AUTO'; bind(TS,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); TS.fills=[];
const t4=TS.addComponentProperty('Tab 4','BOOLEAN',true), t5=TS.addComponentProperty('Tab 5','BOOLEAN',false);
for(const c of TS.children){ c.findOne(x=>x.name==='tab 4').componentPropertyReferences={visible:t4}; c.findOne(x=>x.name==='tab 5').componentPropertyReferences={visible:t5}; }
TS.description='Switches between views of the same content on one screen (Overview, Devices, Logs…) without leaving the page. Spec: '+CFG.sec+'/components/tabs/tabs.md';
TAB.x=80; TAB.y=80; TS.x=80; TS.y=TAB.y+TAB.height+80;
area.resizeWithoutConstraints(Math.max(TAB.width,TS.width)+160, TS.y+TS.height+80);
return {page:page.id,set:TS.id,tab:TAB.id,section:area.id};
