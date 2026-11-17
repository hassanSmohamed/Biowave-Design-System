const set = await figma.getNodeByIdAsync('202:28604');
return {
  setId: set.id,
  setName: set.name,
  parentId: set.parent ? set.parent.id : null,
  parentName: set.parent ? set.parent.name : null,
  pageId: figma.currentPage.id,
  pageName: figma.currentPage.name
};
