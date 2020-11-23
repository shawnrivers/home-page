import { loadPageChunk } from '../apis/notion/loadPageChunkAPI';
import { Property } from '../apis/notion/response/pageChunk';

const previewTypes = new Set(['text', 'image']);

export type PostPreview = {
  type: 'text' | 'image';
  content: Property<string>;
  id: string;
}[];

export async function getPostPreview(pageId: string): Promise<PostPreview> {
  let dividerIndex = 0;

  const data = await loadPageChunk({ pageId, limit: 10 });
  const blocks = Object.values(data.recordMap.block);

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].value.type === 'divider') {
      dividerIndex = i;
      break;
    }
  }

  return blocks
    .splice(0, dividerIndex)
    .filter(block => {
      const { value } = block;

      return previewTypes.has(value.type) && 'properties' in value;
    })
    .map(block => {
      const { value } = block;

      if (value.type === 'image') {
        return {
          type: 'image',
          content: value.properties.source ?? [],
          id: value.id,
        };
      }

      if (value.type === 'text') {
        return {
          type: 'text',
          content: value.properties.title ?? [],
          id: value.id,
        };
      }

      throw new Error(`${value.type} type is not supported as blog preview.`);
    });
}
