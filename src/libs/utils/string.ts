import type React from 'react';
import { isValidElement } from 'react';
import slugify from 'slugify';

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

const SLUG_SEPARATOR = '-';

export function generateSlugFromText(...text: (string | undefined)[]): string {
  return slugify(
    text.filter(t => t !== '' && t !== undefined).join(SLUG_SEPARATOR),
    {
      replacement: SLUG_SEPARATOR,
      lower: true,
      strict: true,
    },
  );
}
