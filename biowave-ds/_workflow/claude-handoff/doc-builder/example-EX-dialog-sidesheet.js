// shared EX for Dialog / Side sheet docs (Web/Tablet). Needs PLAT={en,ar,dlgSet,ssSet,scrim,ar ids}
const iv0=k=>figma.variables.importVariableByKeyAsync(k);
const TXT=await iv0('4ea63d9ab5254c4df4eba4d26f771377a07929c4'), PAGEBG=await iv0('92b71ada5e0cffef4eec84e17092c1f3d81da69f'), BSUB=await iv0('07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112');
const BODY=await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69');
const typoX=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const DLG=PLAT.dlgSet?await figma.getNodeByIdAsync(PLAT.dlgSet):null, SS=PLAT.ssSet?await figma.getNodeByIdAsync(PLAT.ssSet):null, SCRIM=await figma.getNodeByIdAsync(PLAT.scrim);
for(const [id,nm] of [[PLAT.dlgSet,'Dialog'],[PLAT.ssSet,'Side sheet']]) if(id){ const s=await figma.getNodeByIdAsync(id); if(s.parent.type==='SECTION'&&s.parent.name===nm) s.parent.name=nm+' — Component'; }
const pick=(set,o)=>set.children.find(c=>Object.entries(o).every(([k,v])=>c.name.split(', ').includes(k+'='+v)))||set.defaultVariant;
const setPr=(i,map)=>{ const p={}; for(const [pre,val] of Object.entries(map||{})){ const k=Object.keys(i.componentProperties).find(x=>x.split('#')[0]===pre); if(k) p[k]=val; } if(Object.keys(p).length) i.setProperties(p); };
const inst=(set,o,props)=>{ const i=pick(set,o).createInstance(); setPr(i,props); return i; };
async function stage(child,w,h,opts){ const f=figma.createFrame(); f.name='stage'; f.resize(w,h); f.clipsContent=true; f.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',PAGEBG)];
 // page skeleton lines
 for(let k=0;k<4;k++){ const r=figma.createRectangle(); r.resize(Math.round(w*0.5),10); r.x=24; r.y=24+k*28; r.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',BSUB)]; r.name='page-content'; f.appendChild(r); }
 if(!opts||!opts.noScrim){ const s=SCRIM.createInstance(); f.appendChild(s); s.resize(w,h); s.x=0; s.y=0; }
 if(child){ f.appendChild(child); if(opts&&opts.side){ const inset=8; child.resize(child.width,h-2*inset); child.y=inset; child.x=opts.rtl?inset:w-child.width-inset; } else { child.x=Math.round((w-child.width)/2); child.y=Math.round((h-child.height)/2); } }
 return f; }
async function EX(s){
 if(s.dlg){ const i=inst(DLG,s.dlg,s.props); if(s.stage) return await stage(i,s.w||960,s.h||560,s); return i; }
 if(s.ss){ const i=inst(SS,s.ss,s.props); if(s.h) i.resize(i.width,s.h); if(s.stage) return await stage(i,s.w||1100,s.hh||640,{side:true,rtl:s.ss.Language==='AR',noScrim:s.ss.Mode==='Standard'}); return i; }
 if(s.empty) return await stage(null,s.w||960,s.h||560,{noScrim:true});
 if(s.text){ const t=figma.createText(); await t.setTextStyleIdAsync(BODY.id); t.characters=s.text; t.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',TXT)]; return t; }
 return figma.createFrame(); }
