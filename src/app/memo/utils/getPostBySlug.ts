import { getCoverImageId } from '@/app/memo/utils/cover';
import { fetchPostContent } from '@/features/post/utils/fetchPostContent';
import { fetchPostImages } from '@/features/post/utils/fetchPostImages';
import { fetchMemoPosts } from '@/utils/notion/api/fetchMemoPosts';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { draftMode } from 'next/headers';
import { cache } from 'react';

const a = 1;

export const getPostBySlug = cache(async (slug: string) => {
  const { isEnabled: isDraftEnabled } = draftMode();
  const posts = await fetchMemoPosts({ draft: isDraftEnabled });
  const post = posts?.find(
    p => p.properties.Slug.rich_text[0].plain_text === slug,
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
