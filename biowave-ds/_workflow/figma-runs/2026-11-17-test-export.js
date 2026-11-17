const node = await figma.getNodeByIdAsync('694:220298'); // Empty state set
const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } });
let binary = '';
const chunkSize = 8192;
for (let i = 0; i < bytes.length; i += chunkSize) {
  binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
}
return {
  name: node.name,
  length: bytes.length,
  b64: btoa(binary)
};
