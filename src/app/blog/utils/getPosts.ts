import { getCoverImageId } from '@/app/blog/utils/cover';
import { fetchPostImages } from '@/features/post/fetchPostImages';
import { fetchBlogPosts } from '@/utils/notion/api/fetchBlogPosts';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { draftMode } from 'next/headers';
import { cache } from 'react';

export const getPosts = cache(async (options = { ignoreDraft: false }) => {
  const { ignoreDraft } = options;
  const posts = await fetchBlogPosts({
    draft: ignoreDraft ? false : draftMode().isEnabled,
  });

  const postCovers =
    posts?.map(post => ({
      url: post.cover?.file.url ?? '',
      fileName: getCoverImageId(
        convertRichTextToPlainText(post.properties.Page.title),
      ),
    })) ?? [];
  const images = await fetchPostImages(postCovers);

  return posts?.map(post => ({
    ...post,
    coverImage: images.find(image =>
      image?.public_id.includes(
        getCoverImageId(convertRichTextToPlainText(post.properties.Page.title)),
      ),
    ),
  }));
});
