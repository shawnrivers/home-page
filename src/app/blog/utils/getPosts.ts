import { getCoverImageId } from '@/app/blog/utils/cover';
import { getBlogImages } from '@/app/blog/utils/getBlogImages';
import { fetchPosts } from '@/utils/notion/api/fetchPosts';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { draftMode } from 'next/headers';
import { cache } from 'react';

export const getPosts = cache(async (options = { ignoreDraft: false }) => {
  const { ignoreDraft } = options;
  const posts = await fetchPosts({
    draft: ignoreDraft ? false : draftMode().isEnabled,
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
