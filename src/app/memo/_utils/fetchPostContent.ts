import { fetchPostImages } from '@/app/memo/_utils/fetchPostImages';
import { fetchBlocks } from '@/libs/api/notion/api/fetchBlocks';
import { cache } from 'react';

export const fetchPostContent = cache(async (id: string) => {
  const blocks = await fetchBlocks({
    block_id: id,
  });

  const sourceImages = blocks
    .filter(block => block.type === 'image')
    .map(block => {
      return {
        fileName: block.id,
        url:
          block.image.type === 'external'
            ? block.image.external.url
            : block.image.file.url,
      };
    });
  const images = await fetchPostImages(sourceImages);

  return { blocks, images };
});
