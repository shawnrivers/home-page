import { fetchBlocks } from '@/utils/notion/api/fetchBlocks';
import { fetchPosts } from '@/utils/notion/api/fetchPosts';
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

  return { ...post, blocks };
});
