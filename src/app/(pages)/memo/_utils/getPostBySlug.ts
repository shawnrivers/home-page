import { draftMode } from 'next/headers';
import { cache } from 'react';
import { getCoverImageId } from '@/app/(pages)/memo/_utils/cover';
import { fetchPostContent } from '@/app/(pages)/memo/_utils/fetchPostContent';
import { fetchPostImages } from '@/app/(pages)/memo/_utils/fetchPostImages';
import { fetchMemoPosts } from '@/libs/api/notion/api/fetchMemoPosts';
import { convertRichTextToPlainText } from '@/libs/api/notion/utils';

export const getPostBySlug = cache(async (slug: string) => {
  const { isEnabled: isDraftEnabled } = await draftMode();
  const posts = await fetchMemoPosts({ draft: isDraftEnabled });
  const post = posts?.find(
    p => p.properties.Slug.rich_text[0]?.plain_text === slug,
  );
  if (post == undefined) {
    return undefined;
  }

  const [postContent, coverImage] = await Promise.all([
    fetchPostContent(post.id),
    post.cover
      ? fetchPostImages([
          {
            fileName: getCoverImageId(
              convertRichTextToPlainText(post.properties.Page.title),
            ),
            url: post.cover.file.url,
          },
        ]).then(images => images[0])
      : undefined,
  ]);

  return {
    ...post,
    coverImage,
    blocks: postContent.blocks,
    images: postContent.images,
  };
});
