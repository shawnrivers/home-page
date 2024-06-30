import { getCoverImageId } from '@/app/blog/utils/cover';
import { fetchPostContent } from '@/features/post/utils/fetchPostContent';
import { fetchPostImages } from '@/features/post/utils/fetchPostImages';
import { fetchBlogPosts } from '@/utils/notion/api/fetchBlogPosts';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { draftMode } from 'next/headers';
import { cache } from 'react';

export const getPostBySlug = cache(async (slug: string) => {
  const { isEnabled: isDraftEnabled } = draftMode();
  const posts = await fetchBlogPosts({ draft: isDraftEnabled });
  const post = posts?.find(
    blog => blog.properties.Slug.rich_text[0].plain_text === slug,
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
