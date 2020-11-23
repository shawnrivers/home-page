import { loadPageChunk } from './getPageData';
import { values } from './rpc';

const nonPreviewTypes = new Set(['editor', 'page', 'collection_view']);
const previewTypes = new Set(['text', 'image']);

export async function getPostPreview(
  pageId: string,
): Promise<
  {
    type: 'text' | 'image';
    content: any[];
    id: string;
  }[]
> {
  let blocks;
  let dividerIndex = 0;

  const data = await loadPageChunk({ pageId, limit: 10 });
  blocks = values(data.recordMap.block);

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].value.type === 'divider') {
      dividerIndex = i;
      break;
    }
  }

  blocks = blocks
    .splice(0, dividerIndex)
    .filter((block: any) => {
      const { value } = block;

      return previewTypes.has(value.type) && value.properties;
    })
    .map((block: any) => {
      const { value } = block;

      if (value.type === 'image') {
        return {
          type: 'image',
          content: value.properties.source ?? [],
          id: value.id,
        };
      }

      return {
        type: 'text',
        content: value.properties.title ?? [],
        id: value.id,
      };
    });

  return blocks;
}
