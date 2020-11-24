import {
  Block,
  CalloutBlock,
  CodeBlock,
  CollectionViewBlock,
  EmbedBlock,
  EquationBlock,
  HeaderBlock,
  HeaderType,
  ImageBlock,
  ListBlock,
  ListType,
  QuoteBlock,
  TextBlock,
  VideoBlock,
} from '../response/pageChunk';

export function isCollectionViewBlock(
  block: Block,
): block is CollectionViewBlock {
  return block.value.type === 'collection_view';
}

export function isTextBlock(block: Block): block is TextBlock {
  return block.value.type === 'text';
}

const listTypes: Set<string> = new Set<ListType>([
  'bulleted_list',
  'numbered_list',
]);

export function isListBlock(block: Block): block is ListBlock {
  return listTypes.has(block.value.type);
}

const headerTypes: Set<string> = new Set<HeaderType>([
  'header',
  'sub_header',
  'sub_sub_header',
]);

export function isHeaderBlock(block: Block): block is HeaderBlock {
  return headerTypes.has(block.value.type);
}

export function isQuoteBlock(block: Block): block is QuoteBlock {
  return block.value.type === 'quote';
}

export function isEquationBlock(block: Block): block is EquationBlock {
  return block.value.type === 'equation';
}

export function isImageBlock(block: Block): block is ImageBlock {
  return block.value.type === 'image';
}

export function isVideoBlock(block: Block): block is VideoBlock {
  return block.value.type === 'video';
}

export function isEmbedBlock(block: Block): block is EmbedBlock {
  return block.value.type === 'embed';
}

export function isCodeBlock(block: Block): block is CodeBlock {
  return block.value.type === 'code';
}

export function isCalloutBlock(block: Block): block is CalloutBlock {
  return block.value.type === 'callout';
}
