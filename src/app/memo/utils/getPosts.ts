import { getCoverImageId } from '@/app/memo/utils/cover';
import { fetchPostImages } from '@/features/post/utils/fetchPostImages';
import { fetchMemoPosts } from '@/utils/notion/api/fetchMemoPosts';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { draftMode } from 'next/headers';
import { cache } from 'react';

export const getPosts = cache(async (options = { ignoreDraft: false }) => {
  const { ignoreDraft } = options;
  const posts = await fetchMemoPosts({
    draft: ignoreDraft ? false : draftMode().isEnabled,
  });

  const postCovers =
    posts
      ?.filter(post => post.cover)
      .map(post => ({
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
