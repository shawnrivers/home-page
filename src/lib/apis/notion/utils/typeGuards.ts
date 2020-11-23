import {
  Block,
  CalloutBlock,
  CodeBlock,
  CollectionViewBlock,
  EmbedBlock,
  HeaderType,
  ImageBlock,
  ListType,
  TextBlock,
  TextType,
  VideoBlock,
} from '../response/pageChunk';

export function isCollectionViewBlock(
  block: Block,
): block is CollectionViewBlock {
  return block.value.type === 'collection_view';
}

const textTypes: Set<string> = new Set<TextType>([
  'text',
  'bulleted_list',
  'numbered_list',
  'header',
  'sub_header',
  'sub_sub_header',
]);

export function isTextBlock(block: Block): block is TextBlock {
  return textTypes.has(block.value.type);
}

const listTypes: Set<string> = new Set<ListType>([
  'bulleted_list',
  'numbered_list',
]);

export function isListBlock(block: Block): block is TextBlock {
  return listTypes.has(block.value.type);
}

const headerTypes: Set<string> = new Set<HeaderType>([
  'header',
  'sub_header',
  'sub_sub_header',
]);

export function isHeaderBlock(block: Block): block is TextBlock {
  return headerTypes.has(block.value.type);
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
