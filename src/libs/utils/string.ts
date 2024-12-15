import type React from 'react';
import { isValidElement } from 'react';

export function convertNodeToString(node: React.ReactNode): string {
  if (node == null) {
    return '';
  }

  if (Array.isArray(node)) {
    return node.map(convertNodeToString).join('');
  }

  if (
    typeof node === 'object' &&
    'props' in node &&
    typeof node.props === 'object' &&
    node.props !== null &&
    'children' in node.props &&
    isValidElement(node.props.children)
  ) {
    return convertNodeToString(node.props.children);
  }

  return node.toString();
}
