import { loadPageChunk } from '../apis/notion/loadPageChunkAPI';
import { Block } from '../apis/notion/response/pageChunk';

export default async function getPageData(
  pageId: string,
  limit = 200,
): Promise<{
  blocks: Block[];
}> {
  try {
    const data = await loadPageChunk({ pageId, limit });
    const blocks = Object.values(data.recordMap.block);

    const firstBlock = blocks[0];
    if (firstBlock) {
      if ('content' in firstBlock.value) {
        // remove table blocks
        blocks.splice(0, 3);
      }
    }

    return { blocks };
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err);
    return { blocks: [] };
  }
}
