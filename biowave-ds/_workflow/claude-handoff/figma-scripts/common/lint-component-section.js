// Lint a component page's "<Name> — Component" section: unbound solid fills/strokes, text without a style,
// raw padding / gap. Skips nodes inside instances and the COMPONENT_SET frame itself. Must return unbound: [].
// Usage (use_figma): set PAGE_IDS, run in the component file.
const PAGE_IDS = [/*'655:33'*/];
const bad=[]; for(const pid of PAGE_IDS){ const p=await figma.getNodeByIdAsync(pid); await p.loadAsync(); const s=p.children.find(n=>n.name.endsWith('— Component'));
 for(const n of s.findAll(()=>true)){ let q=n.parent,ii=false; while(q&&q!==s){ if(q.type==='INSTANCE'){ii=true;break;} q=q.parent;} if(ii||n.type==='COMPONENT_SET'||n.type==='INSTANCE') continue;
  for(const k of ['fills','strokes']) if(Array.isArray(n[k])) n[k].forEach(pt=>{ if(pt.type==='SOLID'&&pt.visible!==false&&!(pt.boundVariables&&pt.boundVariables.color)) bad.push(n.name+' '+k); });
  if(n.type==='TEXT'&&!n.textStyleId) bad.push(n.name+' no style');
  if(n.layoutMode&&n.layoutMode!=='NONE') for(const k of ['paddingTop','paddingBottom','paddingLeft','paddingRight','itemSpacing']) if(n[k]>0&&!(n.boundVariables&&n.boundVariables[k])) bad.push(n.name+' raw '+k); } }
return {unbound:[...new Set(bad)]};
