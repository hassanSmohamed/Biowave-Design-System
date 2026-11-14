for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const want=['color/background/transparent/default','color/background/transparent/hovered','color/background/transparent/pressed','color/background/selected/default','color/background/brand/default','color/text/subtle','color/text/subtlest','color/text/default','color/text/role/brand','color/border/focus','color/border/default','border/width/focus',CFG.h,'spacing/xs','spacing/sm','spacing/md','spacing/xl','spacing/3xl','radius/md','radius/full'];
const K={}; for(const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()){ if(c.libraryName!=='Biowave DS — Foundations') continue; for(const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) if(want.includes(v.name)&&!K[v.name]) K[v.name]=v.key; }
const miss=want.filter(w=>!K[w]); if(miss.length) return {missing:miss};
const V={}; for(const [n,k] of Object.entries(K)) V[n]=await figma.variables.importVariableByKeyAsync(k);
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
const typo=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const grid=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205');
const LAB=await figma.importStyleByKeyAsync('e3c53522eceb6758fc2a3be8644311f584118505');
const gly=async k=>{ const s=await figma.importComponentSetByKeyAsync(k); return s.children.find(c=>c.name==='Style=Rounded, Fill=Unfilled')||s.defaultVariant; };
const CR=await gly('cdd1a195c723930ded7770d8c6f1bc432c385482'), CL=await gly('489e86470d75d0b400cb2670999c728ccfc8e27c');
const IB=await figma.getNodeByIdAsync(CFG.ib); const SEL={EN:CFG.selEn?await figma.getNodeByIdAsync(CFG.selEn):null,AR:CFG.selAr?await figma.getNodeByIdAsync(CFG.selAr):null};
const pick=(set,o)=>set.children.find(c=>Object.entries(o).every(([k,v])=>c.name.split(', ').includes(k+'='+v)));
const setPr=(i,map)=>{ const p={}; for(const [pre,val] of Object.entries(map||{})){ const k=Object.keys(i.componentProperties).find(x=>x.split('#')[0]===pre); if(k) p[k]=val; } if(Object.keys(p).length) i.setProperties(p); };
const findPage=n=>figma.root.children.find(p=>p.name.trim()===n);
const bind=(n,ks,v)=>{ for(const k of ks) n.setBoundVariable(k,v); };
const rads=['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'];
const txt=async(s,fill,name)=>{ const t=figma.createText(); t.name=name; await t.setTextStyleIdAsync(LAB.id); t.characters=s; t.fills=[paint(V[fill])]; return t; };
const ensure=async(nm,after)=>{ let p=findPage(nm); if(!p){ const idx=figma.root.children.findIndex(x=>x.name.trim()===after)+1; p=figma.createPage(); p.name='     '+nm; figma.root.insertChild(idx,p); } await figma.setCurrentPageAsync(p); p.setExplicitVariableModeForCollection(typo,CFG.en); if(CFG.gridMode) p.setExplicitVariableModeForCollection(grid,CFG.gridMode); return p; };
const out={};
// ---------- Pagination ----------
const pp=await ensure('↳ Pagination','↳ Tabs');
if(!pp.findOne(n=>n.type==='COMPONENT_SET'&&n.name==='Pagination')){
 const area=figma.createSection(); area.name='Pagination — Component'; pp.appendChild(area);
 const items=[]; for(const st of ['Default','Hovered','Pressed','Focused','Selected','Ellipsis']){ const c=figma.createComponent(); c.name='State='+st; area.appendChild(c);
  c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='CENTER'; c.primaryAxisAlignItems='CENTER'; c.counterAxisSizingMode='FIXED'; c.resize(40,32); c.primaryAxisSizingMode='AUTO'; c.setBoundVariable('height',V[CFG.h]); c.setBoundVariable('minWidth',V[CFG.h]);
  bind(c,['paddingLeft','paddingRight'],V['spacing/sm']); bind(c,rads,V['radius/md']);
  c.fills=[paint(V['color/background/'+({Hovered:'transparent/hovered',Pressed:'transparent/pressed',Selected:'selected/default'}[st]||'transparent/default')])];
  if(st==='Focused'){ c.strokes=[paint(V['color/border/focus'])]; c.strokeAlign='INSIDE'; c.setBoundVariable('strokeWeight',V['border/width/focus']); }
  c.appendChild(await txt(st==='Ellipsis'?'…':'1',{Default:'color/text/subtle',Focused:'color/text/subtle',Hovered:'color/text/default',Pressed:'color/text/default',Selected:'color/text/role/brand',Ellipsis:'color/text/subtlest'}[st],'label')); items.push(c); }
 const PI=figma.combineAsVariants(items,area); PI.name='.Page item'; PI.layoutMode='HORIZONTAL'; PI.itemSpacing=16; PI.counterAxisAlignItems='CENTER'; PI.primaryAxisSizingMode='AUTO'; PI.counterAxisSizingMode='AUTO'; bind(PI,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); PI.fills=[];
 const lP=PI.addComponentProperty('Label','TEXT','1'); for(const c of PI.children) if(c.name!=='State=Ellipsis') c.findOne(x=>x.name==='label').componentPropertyReferences={characters:lP};
 PI.description='Private. A page number of Pagination. State Default · Hovered · Pressed · Focused · Selected (current page) · Ellipsis ("…", not interactive).';
 const ib=(glyph,name)=>{ const i=pick(IB,{Toggle:'false',Selected:'false',Size:CFG.ibSize}).createInstance(); i.name=name; const o=i.findOne(n=>n.type==='INSTANCE'&&n.name==='Outlined icon'); if(o) o.swapComponent(glyph); const tip=i.findOne(n=>n.name==='Tooltip'); if(tip) tip.visible=false; return i; };
 const numbered=(lang)=>{ const f=figma.createFrame(); f.name='numbered'; f.fills=[]; f.layoutMode='HORIZONTAL'; f.counterAxisAlignItems='CENTER'; f.primaryAxisSizingMode='AUTO'; f.counterAxisSizingMode='AUTO'; f.setBoundVariable('itemSpacing',V['spacing/xs']);
  const ar=lang==='AR'; const nodes=[ib(ar?CR:CL,'previous')]; for(const lab of ['1','2','3','4','5','…','12']){ const st=lab==='…'?'Ellipsis':(lab==='3'?'Selected':'Default'); const it=pick(PI,{State:st}).createInstance(); it.name=lab==='…'?'ellipsis':'page '+lab; if(lab!=='…') it.setProperties({[lP]:lab}); nodes.push(it); } nodes.push(ib(ar?CL:CR,'next'));
  (ar?nodes.reverse():nodes).forEach(n=>f.appendChild(n)); return f; };
 const sets=[];
 for(const lang of ['EN','AR']) for(const form of CFG.forms){ const c=figma.createComponent(); c.name=`Form=${form}, Language=${lang}`; area.appendChild(c); c.fills=[]; const ar=lang==='AR';
  if(ar) c.setExplicitVariableModeForCollection(typo,CFG.ar);
  c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='CENTER'; c.counterAxisSizingMode='AUTO';
  if(form==='Numbered'){ c.primaryAxisSizingMode='AUTO'; c.setBoundVariable('itemSpacing',V['spacing/xs']); const n=numbered(lang); const kids=[...n.children]; kids.forEach(k=>c.appendChild(k)); n.remove(); }
  else if(form==='Compact'){ c.primaryAxisSizingMode='AUTO'; c.setBoundVariable('itemSpacing',V['spacing/md']); const nodes=[ib(ar?CR:CL,'previous'),await txt(ar?'صفحة 3 من 12':'Page 3 of 12','color/text/subtle','status'),ib(ar?CL:CR,'next')]; (ar?nodes.reverse():nodes).forEach(n=>c.appendChild(n)); }
  else { c.primaryAxisSizingMode='FIXED'; c.resize(960,40); c.primaryAxisAlignItems='SPACE_BETWEEN';
   const left=figma.createFrame(); left.name='rows-and-range'; left.fills=[]; left.layoutMode='HORIZONTAL'; left.counterAxisAlignItems='CENTER'; left.primaryAxisSizingMode='AUTO'; left.counterAxisSizingMode='AUTO'; left.setBoundVariable('itemSpacing',V['spacing/3xl']);
   const rows=figma.createFrame(); rows.name='rows-per-page'; rows.fills=[]; rows.layoutMode='HORIZONTAL'; rows.counterAxisAlignItems='CENTER'; rows.primaryAxisSizingMode='AUTO'; rows.counterAxisSizingMode='AUTO'; rows.setBoundVariable('itemSpacing',V['spacing/md']);
   const rl=await txt(ar?'عدد الصفوف':'Rows per page','color/text/subtle','rows-label'); const sel=pick(SEL[lang],{Size:'sm',State:'default',Filled:'true',Error:'false',Leading:'none'}).createInstance(); sel.name='rows-select'; setPr(sel,{Value:'20','Show label':false,'Supporting text':false}); sel.resize(96,sel.height);
   (ar?[sel,rl]:[rl,sel]).forEach(n=>rows.appendChild(n));
   const rg=await txt(ar?'1–20 من 240':'1–20 of 240','color/text/subtle','range'); (ar?[rg,rows]:[rows,rg]).forEach(n=>left.appendChild(n));
   const n=numbered(lang); (ar?[n,left]:[left,n]).forEach(x=>c.appendChild(x)); }
  sets.push(c); }
 const PG=figma.combineAsVariants(sets,area); PG.name='Pagination'; PG.layoutMode='VERTICAL'; PG.itemSpacing=32; PG.counterAxisAlignItems='MIN'; PG.primaryAxisSizingMode='AUTO'; PG.counterAxisSizingMode='AUTO'; bind(PG,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); PG.fills=[];
 PG.description='Moves through the pages of a long list or table: previous, page numbers and next; the table form adds rows per page and the range shown. Spec: '+CFG.sec+'/components/pagination/pagination.md';
 PI.x=80; PI.y=80; PG.x=80; PG.y=PI.y+PI.height+80; area.resizeWithoutConstraints(Math.max(PI.width,PG.width)+160, PG.y+PG.height+80);
 out.pagination={page:pp.id,set:PG.id,item:PI.id,section:area.id}; } else out.pagination='exists';
// ---------- Page control ----------
const cp=await ensure('↳ Page control','↳ Pagination');
if(!cp.findOne(n=>n.type==='COMPONENT_SET'&&n.name==='Page control')){
 const area=figma.createSection(); area.name='Page control — Component'; cp.appendChild(area);
 const dots=[]; for(const cur of ['true','false']){ const c=figma.createComponent(); c.name='Current='+cur; area.appendChild(c); c.resize(cur==='true'?24:8,8); c.setBoundVariable('height',V['spacing/md']); c.setBoundVariable('width',V[cur==='true'?'spacing/3xl':'spacing/md']); bind(c,rads,V['radius/full']); c.fills=[paint(V[cur==='true'?'color/background/brand/default':'color/border/default'])]; dots.push(c); }
 const DT=figma.combineAsVariants(dots,area); DT.name='.Dot'; DT.layoutMode='HORIZONTAL'; DT.itemSpacing=16; DT.counterAxisAlignItems='CENTER'; DT.primaryAxisSizingMode='AUTO'; DT.counterAxisSizingMode='AUTO'; bind(DT,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); DT.fills=[];
 DT.description='Private. One page dot; Current = elongated brand dot.';
 const sets=[]; for(const lang of ['EN','AR']) for(const n of ['3','5','7']){ const c=figma.createComponent(); c.name=`Pages=${n}, Language=${lang}`; area.appendChild(c); c.fills=[]; c.layoutMode='HORIZONTAL'; c.counterAxisAlignItems='CENTER'; c.primaryAxisSizingMode='AUTO'; c.counterAxisSizingMode='AUTO'; c.setBoundVariable('itemSpacing',V['spacing/md']);
  const nodes=[]; for(let i=0;i<+n;i++){ const d=pick(DT,{Current:i===1?'true':'false'}).createInstance(); d.name='dot '+(i+1); nodes.push(d); } (lang==='AR'?nodes.reverse():nodes).forEach(x=>c.appendChild(x)); sets.push(c); }
 const PC=figma.combineAsVariants(sets,area); PC.name='Page control'; PC.layoutMode='VERTICAL'; PC.itemSpacing=24; PC.counterAxisAlignItems='MIN'; PC.primaryAxisSizingMode='AUTO'; PC.counterAxisSizingMode='AUTO'; bind(PC,['paddingTop','paddingBottom','paddingLeft','paddingRight'],V['spacing/xl']); PC.fills=[];
 PC.insertChild(0,PC.children.find(c=>c.name==='Pages=5, Language=EN'));
 PC.description='Dots that show which page of a short carousel or onboarding is on screen; tapping a dot goes to that page. Spec: '+CFG.sec+'/components/page-control/page-control.md';
 DT.x=80; DT.y=80; PC.x=DT.x+DT.width+80; PC.y=80; area.resizeWithoutConstraints(PC.x+PC.width+80, Math.max(DT.height,PC.height)+160);
 out.pageControl={page:cp.id,set:PC.id,dot:DT.id,section:area.id}; } else out.pageControl='exists';
return out;
