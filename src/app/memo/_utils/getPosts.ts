import { draftMode } from 'next/headers';
import { cache } from 'react';
import { getCoverImageId } from '@/app/memo/_utils/cover';
import { fetchPostImages } from '@/app/memo/_utils/fetchPostImages';
import { fetchMemoPosts } from '@/libs/api/notion/api/fetchMemoPosts';
import { convertRichTextToPlainText } from '@/libs/api/notion/utils';

export const getPosts = cache(async (options = { ignoreDraft: false }) => {
  const { ignoreDraft } = options;
  const posts = await fetchMemoPosts({
    draft: ignoreDraft ? false : (await draftMode()).isEnabled,
    sorts: [{ property: 'Date', direction: 'descending' }],
  });
  const images = await fetchPostImages(
    posts
      ?.filter(post => post.cover)
      .filter(post => post.cover != null)
      .map(post => ({
        fileName: getCoverImageId(
          convertRichTextToPlainText(post.properties.Page.title),
        ),
        url: post.cover?.file.url ?? '',
      })) ?? [],
  );

  return posts?.map(post => ({
    ...post,
    coverImage: images.find(image =>
      image?.public_id.includes(
        getCoverImageId(convertRichTextToPlainText(post.properties.Page.title)),
      ),
    ),
  }));
});
