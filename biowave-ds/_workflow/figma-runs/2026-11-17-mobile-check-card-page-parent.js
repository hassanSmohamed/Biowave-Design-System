const sec = await figma.getNodeByIdAsync('202:28303');
return {
  secId: sec.id,
  secName: sec.name,
  pageId: sec.parent ? sec.parent.id : null,
  pageName: sec.parent ? sec.parent.name : null
};
