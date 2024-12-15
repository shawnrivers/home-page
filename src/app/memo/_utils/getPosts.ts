import { getCoverImageId } from '@/app/memo/_utils/cover';
import { fetchPostImages } from '@/features/post/utils/fetchPostImages';
import { fetchMemoPosts } from '@/libs/api/notion/api/fetchMemoPosts';
import { convertRichTextToPlainText } from '@/libs/api/notion/utils';
import { draftMode } from 'next/headers';
import { cache } from 'react';

export const getPosts = cache(async (options = { ignoreDraft: false }) => {
  const { ignoreDraft } = options;
  const posts = await fetchMemoPosts({
    draft: ignoreDraft ? false : draftMode().isEnabled,
    sorts: [{ property: 'Date', direction: 'descending' }],
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
