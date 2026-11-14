const P={en:'3869:6',ar:'5258:0'};
for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const want=['color/surface/subtle','color/surface/default','color/border/subtle','color/border/default','color/background/selected/default','color/background/transparent/hovered','color/text/subtle','color/text/default','color/text/role/brand','color/icon/default','color/icon/subtle','color/icon/role/brand','size/control/height/md','size/control/height/lg','size/icon/sm','size/icon/lg','spacing/xl','spacing/md','spacing/lg','spacing/3xl','radius/md','radius/full','border/width/default','layout/width/sidebar-start','layout/width/sidebar-start-collapsed'];
const K={}; for(const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()){ if(c.libraryName!=='Biowave DS — Foundations') continue; for(const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) if(want.includes(v.name)&&!K[v.name]) K[v.name]=v.key; }
const miss=want.filter(w=>!K[w]); if(miss.length) return {missing:miss};
const V={}; for(const [n,k] of Object.entries(K)) V[n]=await figma.variables.importVariableByKeyAsync(k);
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
const typo=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const TS={body:await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69'),lab:await figma.importStyleByKeyAsync('9fe6ff3cff9d3abce486aab5175350b06e06b891')};
const gly=async k=>{ const s=await figma.importComponentSetByKeyAsync(k); return s.children.find(c=>c.name==='Style=Rounded, Fill=Unfilled')||s.defaultVariant; };
const G={close:await gly('d81309514393eae1f072850cf47c5c09e6846252'),open:await gly('a303f4234a35d380465b3bd5078d008bf53fbc44'),unfold:await gly('8d0a85beab820524c5d10b68367295cd67f32897'),all:await gly('571f69c5dc33b5bc01ba3d7a6ec12d0c229098b3'),devices:await gly('f108cff223682f2709a60aa10438cd8c0a05e1b3'),fp:await gly('afd02fc8eba6b6a5a835317c3b40d8bf5ad8cef9'),board:await gly('38a477660748a195dcc26e240b24533ddcd81406'),tablet:await gly('016acd3064aa635e080ff6b07f89f05ead276815'),lock:await gly('6d6db24b56e1aedc14c06debb38ebc4c4efa6b9f'),hub:await gly('aee61d0a79b80b45bd4c6e3d7dbe82c77f508060')};
const findPage=n=>figma.root.children.find(p=>p.name.trim()===n);
if(!findPage('↳ Primary navigation')){ const idx=figma.root.children.findIndex(p=>p.name.trim()==='↳ Side sheet')+1; ['↳ Primary navigation','↳ Top app bar'].forEach((nm,i)=>{ const p=figma.createPage(); p.name='     '+nm; figma.root.insertChild(idx+i,p); }); }
const page=findPage('↳ Primary navigation'); await figma.setCurrentPageAsync(page); page.setExplicitVariableModeForCollection(typo,P.en); findPage('↳ Top app bar').setExplicitVariableModeForCollection(typo,P.en);
if(page.findOne(n=>n.type==='COMPONENT_SET'&&n.name==='Side navigation')) return 'exists';
const bind=(n,ks,v)=>{ for(const k of ks) n.setBoundVariable(k,v); };
const rads=['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'];
const icon=(g,sizeVar,colorVar,name)=>{ const i=g.createInstance(); i.name=name||'icon'; i.setBoundVariable('width',sizeVar); i.setBoundVariable('height',sizeVar); for(const v of i.findAll(n=>'fills' in n&&Array.isArray(n.fills)&&n.fills.length&&n.type!=='INSTANCE'&&n.type!=='FRAME')) v.fills=[paint(colorVar)]; return i; };
const txt=async(style,fill,s,name)=>{ const t=figma.createText(); t.name=name; await t.setTextStyleIdAsync(style.id); t.characters=s; t.fills=[paint(fill)]; return t; };
const area=figma.createSection(); area.name='Primary navigation — Component'; page.appendChild(area);
const items=[];
for(const form of ['Expanded','Collapsed']) for(const st of ['Default','Hovered','Selected']){ const c=figma.createComponent(); c.name=`Form=${form}, State=${st}`; area.appendChild(c);
 c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='CENTER'; c.primaryAxisSizingMode='FIXED'; c.counterAxisSizingMode='FIXED'; c.resize(form==='Expanded'?216:48,40); c.setBoundVariable('height',V['size/control/height/md']); bind(c,['paddingLeft','paddingRight'],V['spacing/xl']); c.setBoundVariable('itemSpacing',V['spacing/md']); bind(c,rads,V['radius/md']);
 if(form==='Collapsed'){ c.setBoundVariable('width',V['size/control/height/lg']); c.primaryAxisAlignItems='CENTER'; c.setBoundVariable('paddingLeft',null); c.setBoundVariable('paddingRight',null); c.paddingLeft=c.paddingRight=0; }
 c.fills=st==='Default'?[]:[paint(st==='Selected'?V['color/background/selected/default']:V['color/background/transparent/hovered'])];
 c.appendChild(icon(G.all,V['size/icon/sm'],st==='Selected'?V['color/icon/role/brand']:V['color/icon/default']));
 if(form==='Expanded'){ const l=await txt(st==='Selected'?TS.lab:TS.body,st==='Selected'?V['color/text/role/brand']:(st==='Hovered'?V['color/text/default']:V['color/text/subtle']),'All devices','label'); c.appendChild(l); l.layoutSizingHorizontal='FILL'; l.textTruncation='ENDING'; const n=await txt(TS.body,V['color/text/subtle'],'12','count'); c.appendChild(n); }
 items.push(c); }
const NI=figma.combineAsVariants(items,area); NI.name='.Nav item'; NI.layoutMode='HORIZONTAL'; NI.itemSpacing=16; bind(NI,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); NI.fills=[];
const lP=NI.addComponentProperty('Label','TEXT','All devices'), cP=NI.addComponentProperty('Count','TEXT','12'), scP=NI.addComponentProperty('Show count','BOOLEAN',false), iP=NI.addComponentProperty('Icon','INSTANCE_SWAP',G.all.id);
for(const c of NI.children){ const g=n=>c.findOne(x=>x.name===n); g('icon').componentPropertyReferences={mainComponent:iP}; if(g('label')){ g('label').componentPropertyReferences={characters:lP}; g('count').componentPropertyReferences={characters:cP,visible:scP}; } }
NI.description='Private. One page in the Side navigation / drawer. Form Expanded · Collapsed, State Default · Hovered · Selected.';
const ms=[]; for(const form of ['Expanded','Collapsed']){ const c=figma.createComponent(); c.name='Form='+form; area.appendChild(c); c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='CENTER'; c.primaryAxisSizingMode='FIXED'; c.counterAxisSizingMode='FIXED'; c.resize(form==='Expanded'?232:80,48); c.setBoundVariable('height',V['size/control/height/lg']); bind(c,['paddingTop','paddingBottom'],V['spacing/lg']); bind(c,['paddingLeft','paddingRight'],V[form==='Expanded'?'spacing/xl':'spacing/lg']); c.setBoundVariable('itemSpacing',V['spacing/md']); bind(c,rads,V['radius/md']); c.fills=[paint(V['color/surface/default'])]; c.strokes=[paint(V['color/border/default'])]; c.strokeAlign='INSIDE'; c.setBoundVariable('strokeWeight',V['border/width/default']);
 c.appendChild(icon(G.devices,V['size/icon/lg'],V['color/icon/default'],'module-icon'));
 if(form==='Expanded'){ const l=await txt(TS.lab,V['color/text/default'],'Devices','module'); c.appendChild(l); l.layoutSizingHorizontal='FILL'; } else { c.primaryAxisAlignItems='CENTER'; }
 c.appendChild(icon(G.unfold,V['size/icon/sm'],V['color/icon/subtle'],'unfold')); ms.push(c); }
const MS=figma.combineAsVariants(ms,area); MS.name='.Module switcher'; MS.layoutMode='HORIZONTAL'; MS.itemSpacing=16; bind(MS,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); MS.fills=[];
const mP=MS.addComponentProperty('Module','TEXT','Devices'), miP=MS.addComponentProperty('Module icon','INSTANCE_SWAP',G.devices.id); for(const c of MS.children){ const m=c.findOne(x=>x.name==='module'); if(m) m.componentPropertyReferences={characters:mP}; c.findOne(x=>x.name==='module-icon').componentPropertyReferences={mainComponent:miP}; }
MS.description='Private. Level 1 of the side navigation: the current module; opens the module Menu.';
const hs=[]; for(const st of ['Close','Open']){ const c=figma.createComponent(); c.name='Action='+st; area.appendChild(c); c.layoutMode='HORIZONTAL'; c.primaryAxisAlignItems='CENTER'; c.counterAxisAlignItems='CENTER'; c.primaryAxisSizingMode='FIXED'; c.counterAxisSizingMode='FIXED'; c.resize(24,24); c.setBoundVariable('width',V['size/icon/lg']); c.setBoundVariable('height',V['size/icon/lg']); bind(c,rads,V['radius/full']); c.fills=[paint(V['color/surface/default'])]; c.strokes=[paint(V['color/border/default'])]; c.strokeAlign='INSIDE'; c.setBoundVariable('strokeWeight',V['border/width/default']); c.appendChild(icon(st==='Close'?G.close:G.open,V['size/icon/sm'],V['color/icon/default'])); hs.push(c); }
const CH=figma.combineAsVariants(hs,area); CH.name='.Collapse handle'; CH.layoutMode='HORIZONTAL'; CH.itemSpacing=16; bind(CH,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); CH.fills=[]; CH.description='Private. Collapses / opens the side navigation; sits on its inline-end border. Mirrors in RTL.';
const T={EN:{mod:'Devices',pages:[['All devices','all'],['Biometric terminal','fp'],['Board controller','board'],['Tablet','tablet'],['Lock','lock'],['Hub','hub']]},AR:{mod:'الأجهزة',pages:[['كل الأجهزة','all'],['جهاز البصمة','fp'],['وحدة التحكم','board'],['الجهاز اللوحي','tablet'],['القفل','lock'],['الموزّع','hub']]}};
const sv=[];
for(const state of ['Expanded','Collapsed']) for(const lang of ['EN','AR']){ const rtl=lang==='AR', col=state==='Collapsed';
 const c=figma.createComponent(); c.name=`State=${state}, Language=${lang}`; area.appendChild(c); c.layoutMode='VERTICAL'; c.primaryAxisSizingMode='FIXED'; c.counterAxisSizingMode='FIXED'; c.resize(col?96:248,896); c.setBoundVariable('width',V[col?'layout/width/sidebar-start-collapsed':'layout/width/sidebar-start']); c.fills=[paint(V['color/surface/subtle'])]; c.clipsContent=false;
 c.strokes=[paint(V['color/border/subtle'])]; c.strokeAlign='INSIDE'; c.strokeTopWeight=0; c.strokeBottomWeight=0; c.strokeLeftWeight=0; c.strokeRightWeight=0; c.setBoundVariable(rtl?'strokeLeftWeight':'strokeRightWeight',V['border/width/default']);
 c.setExplicitVariableModeForCollection(typo,rtl?P.ar:P.en); if(col) c.counterAxisAlignItems='CENTER';
 const ma=figma.createAutoLayout('VERTICAL'); ma.name='module-area'; ma.fills=[]; bind(ma,['paddingTop','paddingBottom'],V['spacing/3xl']); bind(ma,['paddingLeft','paddingRight'],V['spacing/md']); c.appendChild(ma); ma.layoutSizingHorizontal='FILL';
 const m=MS.children.find(x=>x.name==='Form='+state).createInstance(); m.name='module-switcher'; ma.appendChild(m); m.layoutSizingHorizontal='FILL'; if(!col){ m.setProperties({[mP]:T[lang].mod}); if(rtl){ m.findOne(x=>x.name==='module').textAlignHorizontal='RIGHT'; } }
 const list=figma.createAutoLayout('VERTICAL'); list.name='list'; list.fills=[]; bind(list,['paddingLeft','paddingRight'],V['spacing/xl']); list.setBoundVariable('itemSpacing',V['spacing/md']); c.appendChild(list); list.layoutSizingHorizontal='FILL'; if(col) list.counterAxisAlignItems='CENTER';
 for(const [k,[lb,g]] of T[lang].pages.entries()){ const it=NI.children.find(x=>x.name===`Form=${state}, State=${k===0?'Selected':'Default'}`).createInstance(); it.name='item'; list.appendChild(it); if(!col){ it.layoutSizingHorizontal='FILL'; it.setProperties({[lP]:lb,[iP]:G[g].id}); if(rtl) it.findOne(x=>x.name==='label').textAlignHorizontal='RIGHT'; } else it.setProperties({[iP]:G[g].id}); }
 const h=CH.children.find(x=>x.name==='Action='+(col?'Open':'Close')).createInstance(); h.name='collapse-handle'; c.appendChild(h); h.layoutPositioning='ABSOLUTE'; h.x=rtl?-12:c.width-12; h.y=24;
 sv.push(c); }
const SN=figma.combineAsVariants(sv,area); SN.name='Side navigation';
SN.description='Primary navigation on Web: module switcher (level 1) and the module pages (level 2). Open 248 / collapsed 96. Spec: 3-web-components/components/primary-navigation/primary-navigation.md';
let x=40; for(const c of SN.children){ c.x=x; c.y=40; x+=c.width+80; } SN.resizeWithoutConstraints(x,976); SN.x=40; SN.y=40; SN.clipsContent=false;
NI.x=40; NI.y=1080; MS.x=NI.x+NI.width+80; MS.y=1080; CH.x=MS.x+MS.width+80; CH.y=1080;
area.resizeWithoutConstraints(Math.max(x+80,CH.x+CH.width+80),1080+Math.max(NI.height,MS.height)+120);
return {page:page.id,sideNav:SN.id,navItem:NI.id,module:MS.id,handle:CH.id};
//////////// 1061
for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('646:286'));
const NI=await figma.getNodeByIdAsync('646:331'), MS=await figma.getNodeByIdAsync('646:355');
const key=(set,n)=>Object.keys(set.componentPropertyDefinitions).find(k=>k.split('#')[0]===n);
const refs=[];
for(const c of NI.children){ const g=n=>c.findOne(x=>x.name===n); refs.push(c.name+':'+JSON.stringify(g('icon').componentPropertyReferences)); g('icon').componentPropertyReferences={mainComponent:key(NI,'Icon')}; if(g('label')){ g('label').componentPropertyReferences={characters:key(NI,'Label')}; g('count').componentPropertyReferences={characters:key(NI,'Count'),visible:key(NI,'Show count')}; } }
for(const c of MS.children){ const m=c.findOne(x=>x.name==='module'); if(m) m.componentPropertyReferences={characters:key(MS,'Module')}; c.findOne(x=>x.name==='module-icon').componentPropertyReferences={mainComponent:key(MS,'Module icon')}; }
const gly=async k=>{ const s=await figma.importComponentSetByKeyAsync(k); return (s.children.find(c=>c.name==='Style=Rounded, Fill=Unfilled')||s.defaultVariant).id; };
const G={all:await gly('571f69c5dc33b5bc01ba3d7a6ec12d0c229098b3'),fp:await gly('afd02fc8eba6b6a5a835317c3b40d8bf5ad8cef9'),board:await gly('38a477660748a195dcc26e240b24533ddcd81406'),tablet:await gly('016acd3064aa635e080ff6b07f89f05ead276815'),lock:await gly('6d6db24b56e1aedc14c06debb38ebc4c4efa6b9f'),hub:await gly('aee61d0a79b80b45bd4c6e3d7dbe82c77f508060')};
const pages=[['كل الأجهزة','all'],['جهاز البصمة','fp'],['وحدة التحكم','board'],['الجهاز اللوحي','tablet'],['القفل','lock'],['الموزّع','hub']];
const setP=(inst,map)=>{ const p={}; for(const [pre,val] of Object.entries(map)){ const k=Object.keys(inst.componentProperties).find(x=>x.split('#')[0]===pre); if(k) p[k]=val; } inst.setProperties(p); };
const SN=await figma.getNodeByIdAsync('646:715');
for(const v of SN.children.filter(c=>c.name.endsWith('AR'))){ const col=v.name.includes('Collapsed');
 v.findOne(n=>n.name==='list').children.forEach((it,k)=>{ const m={Icon:G[pages[k][1]]}; if(!col) m.Label=pages[k][0]; setP(it,m); });
 if(!col) setP(v.findOne(n=>n.name==='module-switcher'),{Module:'الأجهزة'}); }
await SN.screenshot({scale:0.5}); return refs.slice(6,8);
