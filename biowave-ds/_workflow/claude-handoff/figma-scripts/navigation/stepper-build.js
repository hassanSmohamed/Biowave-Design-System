for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const want=['color/background/transparent/default','color/background/brand/default','color/background/error/default','color/text/subtle','color/text/subtlest','color/text/default','color/text/on/brand','color/text/role/error','color/icon/on/brand','color/icon/on/error','color/border/bold','color/border/subtle','color/border/brand','border/width/strong','size/icon/xl','size/icon/sm','spacing/xxs','spacing/xs','spacing/md','spacing/lg','spacing/xl','spacing/3xl','radius/full'];
const K={}; for(const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()){ if(c.libraryName!=='Biowave DS — Foundations') continue; for(const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) if(want.includes(v.name)&&!K[v.name]) K[v.name]=v.key; }
const miss=want.filter(w=>!K[w]); if(miss.length) return {missing:miss};
const V={}; for(const [n,k] of Object.entries(K)) V[n]=await figma.variables.importVariableByKeyAsync(k);
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
const typo=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const grid=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205');
const ST={lmd:await figma.importStyleByKeyAsync('e3c53522eceb6758fc2a3be8644311f584118505'),llg:await figma.importStyleByKeyAsync('9fe6ff3cff9d3abce486aab5175350b06e06b891'),tmd:await figma.importStyleByKeyAsync('80e371f8315ffdb2da029152a20e42afcd924824'),tlg:await figma.importStyleByKeyAsync('2da324fe6d92dee8e8bfb65214f3572272421b71'),bsm:await figma.importStyleByKeyAsync('49f1d79a1ea0f0083dde003404f6295314f8804b')};
const gly=async k=>{ const s=await figma.importComponentSetByKeyAsync(k); return s.children.find(c=>c.name==='Style=Rounded, Fill=Unfilled')||s.defaultVariant; };
const CHECK=await gly('7cffc6ec4f597c487859d4091ce6d499ea120150'), ERR=await gly('a3e59dd796f70814461803f15a547cea25021f89');
const pick=(set,o)=>set.children.find(c=>Object.entries(o).every(([k,v])=>c.name.split(', ').includes(k+'='+v)));
const bind=(n,ks,v)=>{ for(const k of ks) n.setBoundVariable(k,v); }; const rads=['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'];
const txt=async(style,s,fill,name)=>{ const t=figma.createText(); t.name=name; await t.setTextStyleIdAsync(style.id); t.characters=s; t.fills=[paint(V[fill])]; return t; };
const vf=(name,dir)=>{ const f=figma.createFrame(); f.name=name; f.fills=[]; f.layoutMode=dir; f.primaryAxisSizingMode='AUTO'; f.counterAxisSizingMode='AUTO'; return f; };
let page=figma.root.children.find(x=>x.name.trim()==='↳ Stepper'); if(!page){ const idx=figma.root.children.findIndex(x=>x.name.trim()===CFG.after)+1; page=figma.createPage(); page.name='     ↳ Stepper'; figma.root.insertChild(idx,page); }
await figma.setCurrentPageAsync(page); page.setExplicitVariableModeForCollection(typo,CFG.en); if(CFG.gridMode) page.setExplicitVariableModeForCollection(grid,CFG.gridMode);
if(page.findOne(n=>n.type==='COMPONENT_SET'&&n.name==='Stepper')) return 'exists';
const area=figma.createSection(); area.name='Stepper — Component'; page.appendChild(area);
const steps=[];
for(const ori of CFG.orients) for(const st of ['Upcoming','Current','Completed','Error']) for(const dir of ['LTR','RTL']){
 const c=figma.createComponent(); c.name=(CFG.mobile?'':`Orientation=${ori}, `)+`State=${st}, Direction=${dir}`; area.appendChild(c); c.fills=[];
 c.layoutMode='HORIZONTAL'; c.primaryAxisSizingMode='AUTO'; c.counterAxisSizingMode='AUTO'; c.counterAxisAlignItems='MIN';
 // indicator
 const ind=figma.createFrame(); ind.name='indicator'; ind.layoutMode='HORIZONTAL'; ind.primaryAxisAlignItems='CENTER'; ind.counterAxisAlignItems='CENTER'; ind.resize(32,32); ind.primaryAxisSizingMode='FIXED'; ind.counterAxisSizingMode='FIXED'; ind.setBoundVariable('width',V['size/icon/xl']); ind.setBoundVariable('height',V['size/icon/xl']); bind(ind,rads,V['radius/full']);
 ind.fills=[paint(V[{Upcoming:'color/background/transparent/default',Current:'color/background/brand/default',Completed:'color/background/brand/default',Error:'color/background/error/default'}[st]])];
 if(st==='Upcoming'){ ind.strokes=[paint(V['color/border/bold'])]; ind.strokeAlign='INSIDE'; ind.setBoundVariable('strokeWeight',V['border/width/strong']); }
 if(st==='Completed'||st==='Error'){ const ic=(st==='Completed'?CHECK:ERR).createInstance(); ic.name='icon'; ic.setBoundVariable('width',V['size/icon/sm']); ic.setBoundVariable('height',V['size/icon/sm']); for(const v of ic.findAll(n=>'fills' in n&&Array.isArray(n.fills)&&n.fills.length&&n.type!=='INSTANCE'&&n.type!=='FRAME')) v.fills=[paint(V[st==='Completed'?'color/icon/on/brand':'color/icon/on/error'])]; ind.appendChild(ic); }
 else ind.appendChild(await txt(ST.lmd,'2',st==='Current'?'color/text/on/brand':'color/text/subtle','number'));
 // text
 const tx=vf('text','VERTICAL'); tx.setBoundVariable('itemSpacing',V['spacing/xxs']); tx.setBoundVariable('paddingTop',V['spacing/xs']);
 const lab=await txt(st==='Current'?ST.tmd:ST.llg,'Network',{Upcoming:'color/text/subtle',Current:'color/text/default',Completed:'color/text/default',Error:'color/text/role/error'}[st],'label'); tx.appendChild(lab);
 const des=await txt(ST.bsm,st==='Error'?'Network not found':'Connect the terminal',st==='Error'?'color/text/role/error':'color/text/subtlest','description'); tx.appendChild(des);
 if(dir==='RTL'){ lab.textAlignHorizontal='RIGHT'; des.textAlignHorizontal='RIGHT'; tx.counterAxisAlignItems='MAX'; }
 const line=figma.createRectangle(); line.name='line'; line.fills=[paint(V[st==='Completed'?'color/border/brand':'color/border/subtle'])];
 if(ori==='Horizontal'){ c.setBoundVariable('itemSpacing',V['spacing/md']);
  const con=figma.createFrame(); con.name='connector'; con.fills=[]; con.layoutMode='HORIZONTAL'; con.counterAxisAlignItems='CENTER'; con.primaryAxisSizingMode='FIXED'; con.counterAxisSizingMode='FIXED'; con.resize(48,32); con.setBoundVariable('height',V['size/icon/xl']); con.setBoundVariable('minWidth',V['spacing/3xl']); bind(con,['paddingLeft','paddingRight'],V['spacing/md']);
  con.appendChild(line); line.layoutSizingHorizontal='FILL'; line.resize(line.width,2); line.setBoundVariable('height',V['border/width/strong']);
  (dir==='LTR'?[ind,tx,con]:[con,tx,ind]).forEach(n=>c.appendChild(n)); con.layoutGrow=1; }
 else { c.setBoundVariable('itemSpacing',V['spacing/lg']);
  const rail=vf('rail','VERTICAL'); rail.counterAxisAlignItems='CENTER'; rail.setBoundVariable('itemSpacing',V['spacing/xs']); rail.appendChild(ind);
  const con=figma.createFrame(); con.name='connector'; con.fills=[]; con.layoutMode='VERTICAL'; con.counterAxisAlignItems='CENTER'; con.primaryAxisSizingMode='FIXED'; con.counterAxisSizingMode='AUTO'; con.resize(2,24); con.setBoundVariable('minHeight',V['spacing/3xl']); bind(con,['paddingBottom'],V['spacing/xs']);
  con.appendChild(line); line.layoutSizingVertical='FILL'; line.resize(2,line.height); line.setBoundVariable('width',V['border/width/strong']);
  rail.appendChild(con); con.layoutGrow=1; tx.setBoundVariable('paddingBottom',V['spacing/3xl']);
  (dir==='LTR'?[rail,tx]:[tx,rail]).forEach(n=>c.appendChild(n)); rail.layoutAlign='STRETCH'; tx.layoutGrow=1; }
 steps.push(c); }
const SP=figma.combineAsVariants(steps,area); SP.name='.Step'; SP.layoutMode='HORIZONTAL'; SP.layoutWrap='WRAP'; SP.itemSpacing=24; SP.counterAxisSpacing=24; SP.resize(1200,100); SP.primaryAxisSizingMode='FIXED'; SP.counterAxisSizingMode='AUTO'; bind(SP,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); SP.fills=[];
const lP=SP.addComponentProperty('Label','TEXT','Network'), dP=SP.addComponentProperty('Description','TEXT','Connect the terminal'), nP=SP.addComponentProperty('Number','TEXT','2'), sdP=SP.addComponentProperty('Show description','BOOLEAN',false), cP=SP.addComponentProperty('Connector','BOOLEAN',true);
for(const c of SP.children){ c.findOne(x=>x.name==='label').componentPropertyReferences={characters:lP}; c.findOne(x=>x.name==='description').componentPropertyReferences={characters:dP,visible:sdP}; const nm=c.findOne(x=>x.name==='number'); if(nm) nm.componentPropertyReferences={characters:nP}; c.findOne(x=>x.name==='connector').componentPropertyReferences={visible:cP}; }
SP.description='Private. One step of the Stepper: indicator (number · check · "!"), label, optional description and connector. State Upcoming · Current · Completed · Error; Direction RTL puts the indicator on the right.';
const L={EN:['Device details','Network','Users','Review'],AR:['تفاصيل الجهاز','الشبكة','المستخدمون','المراجعة']}, DS={EN:'Connect the terminal to your network',AR:'وصّل الجهاز بشبكتك'};
const states=['Completed','Current','Upcoming','Upcoming'];
const mk=(ori,lang,width)=>{ const nodes=L[lang].map((lab,i)=>{ const s=pick(SP,Object.assign(CFG.mobile?{}:{Orientation:ori},{State:states[i],Direction:lang==='AR'?'RTL':'LTR'})).createInstance(); s.name='step '+(i+1); const pr={[lP]:lab,[nP]:String(i+1),[cP]:i<3}; if(i===1){ pr[sdP]=true; pr[dP]=DS[lang]; } s.setProperties(pr); return s; }); return nodes; };
const sets=[];
for(const lang of ['EN','AR']) for(const form of CFG.forms){ const c=figma.createComponent(); c.name=(CFG.mobile?'Form=':'Orientation=')+form+', Language='+lang; area.appendChild(c); c.fills=[]; if(lang==='AR') c.setExplicitVariableModeForCollection(typo,CFG.ar);
 if(form==='Horizontal'){ c.layoutMode='HORIZONTAL'; c.primaryAxisSizingMode='FIXED'; c.counterAxisSizingMode='AUTO'; c.resize(960,40); c.counterAxisAlignItems='MIN'; const ns=mk('Horizontal',lang); (lang==='AR'?ns.slice().reverse():ns).forEach((s,k)=>{ c.appendChild(s); const idx=lang==='AR'?3-k:k; if(idx<3) s.layoutGrow=1; }); }
 else if(form==='Vertical'){ c.layoutMode='VERTICAL'; c.primaryAxisSizingMode='AUTO'; c.counterAxisSizingMode='FIXED'; c.resize(CFG.mobile?328:400,100); c.counterAxisAlignItems=lang==='AR'?'MAX':'MIN'; mk('Vertical',lang).forEach(s=>{ c.appendChild(s); s.layoutSizingHorizontal='FILL'; }); }
 else { c.layoutMode='VERTICAL'; c.primaryAxisSizingMode='AUTO'; c.counterAxisSizingMode='FIXED'; c.resize(360,80); bind(c,['paddingLeft','paddingRight','paddingTop','paddingBottom'],V['spacing/xl']); c.setBoundVariable('itemSpacing',V['spacing/xs']); c.counterAxisAlignItems=lang==='AR'?'MAX':'MIN';
  const a=await txt(ST.lmd,lang==='AR'?'الخطوة 2 من 4':'Step 2 of 4','color/text/subtle','step-count'); const b=await txt(ST.tlg,L[lang][1],'color/text/default','title'); c.appendChild(a); c.appendChild(b);
  const PRG=await figma.getNodeByIdAsync(lang==='AR'?CFG.progAr:CFG.progEn); const pr=pick(PRG,{Type:'linear',Size:'md',Mode:'determinate'}).createInstance(); pr.name='progress'; c.appendChild(pr); pr.layoutSizingHorizontal='FILL'; }
 sets.push(c); }
const SS=figma.combineAsVariants(sets,area); SS.name='Stepper'; SS.layoutMode='VERTICAL'; SS.itemSpacing=40; SS.counterAxisAlignItems='MIN'; SS.primaryAxisSizingMode='AUTO'; SS.counterAxisSizingMode='AUTO'; bind(SS,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); SS.fills=[];
SS.description='Shows progress through a multi-step flow (a request, onboarding, device setup): which steps are done, which one is current and what comes next. Spec: '+CFG.sec+'/components/stepper/stepper.md';
SP.x=80; SP.y=80; SS.x=80; SS.y=SP.y+SP.height+80; area.resizeWithoutConstraints(Math.max(SP.width,SS.width)+160, SS.y+SS.height+80);
return {page:page.id,set:SS.id,step:SP.id,section:area.id};
