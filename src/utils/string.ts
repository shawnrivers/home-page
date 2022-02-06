export function convertNodeToString(node: React.ReactNode): string {
  if (node instanceof Array) {
    return node.map(convertNodeToString).join('');
  }
  if (typeof node === 'object' && 'props' in node) {
    return convertNodeToString(node.props.children);
  }
  return node.toString();
}
