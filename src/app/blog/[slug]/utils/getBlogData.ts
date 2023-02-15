import { getCoverImageId } from '@/app/blog/utils/cover';
import { getBlogImages, SourceImage } from '@/app/blog/utils/getBlogImages';
import { fetchBlocks } from '@/utils/notion/api/fetchBlocks';
import { fetchPosts } from '@/utils/notion/api/fetchPosts';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { cache } from 'react';

export const getBlogData = cache(async (slug: string) => {
  const posts = await fetchPosts();
  const post = (posts ?? []).find(
    blog => blog.properties.Slug.rich_text[0].plain_text === slug,
  );
  if (post == undefined) {
    return undefined;
  }
  const blocks = await fetchBlocks({
    block_id: post.id,
  });

  const title = convertRichTextToPlainText(post.properties.Page.title);
  const coverSourceImage = post.cover
    ? {
        fileName: getCoverImageId(title),
        url: post.cover.file.url,
      }
    : undefined;
  const postSourceImages = blocks.map(block => {
    if (block.type !== 'image') {
      return undefined;
    }
    return {
      fileName: block.id,
      url:
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url,
    };
  });
  const sourceImages = [coverSourceImage, ...postSourceImages].filter(
    image => image !== undefined,
  ) as SourceImage[];
  const images = await getBlogImages(sourceImages);

  return { ...post, blocks, images };
});
