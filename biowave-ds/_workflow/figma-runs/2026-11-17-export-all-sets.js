const SETS = [
  { id: '691:219739', name: 'web-alert-set' },
  { id: '694:220191', name: 'web-snackbar-set' },
  { id: '694:220298', name: 'web-empty-state-set' },
  { id: '694:219746', name: 'web-skeleton-set' }
];

const results = [];
for (const item of SETS) {
  const node = await figma.getNodeByIdAsync(item.id);
  const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } });
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  results.push({
    file: item.name,
    name: node.name,
    bytes: bytes.length,
    b64: btoa(binary)
  });
}
return results;
