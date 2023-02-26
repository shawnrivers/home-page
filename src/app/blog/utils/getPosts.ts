import { getCoverImageId } from '@/app/blog/utils/cover';
import { getBlogImages } from '@/app/blog/utils/getBlogImages';
import { fetchPosts } from '@/utils/notion/api/fetchPosts';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { previewData } from 'next/headers';
import { cache } from 'react';

export const getPosts = cache(async (options = { ignorePreview: false }) => {
  const { ignorePreview } = options;
  const posts = await fetchPosts({
    preview: ignorePreview ? false : !!previewData(),
  });

  const postCovers =
    posts?.map(post => ({
      url: post.cover?.file.url ?? '',
      fileName: getCoverImageId(
        convertRichTextToPlainText(post.properties.Page.title),
      ),
    })) ?? [];
  const images = await getBlogImages(postCovers);

  return { posts, images };
});
