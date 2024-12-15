import { notion } from '@/libs/api/notion/client';
import { MemoPostSchema } from '@/libs/api/notion/schema/MemoPostSchema';
import { z } from 'zod';

const MemoPostsSchema = z.object({
  object: z.literal('list'),
  results: z.array(MemoPostSchema).optional(),
});

type Post = z.infer<typeof MemoPostSchema>;
type Posts = z.infer<typeof MemoPostsSchema>['results'];

export async function fetchMemoPosts(
  params: Partial<{
    draft: boolean;
    sorts: {
      property: keyof Post['properties'];
      direction: 'ascending' | 'descending';
    }[];
  }> = {},
): Promise<Posts> {
  if (!process.env.NOTION_DATABASE_ID_BLOG)
    throw new Error('NOTION_DATABASE_ID_BLOG is not defined.');

  const { draft = false, sorts } = params;

  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_BLOG,
    filter: !draft
      ? {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        }
      : undefined,
    sorts,
  });

  return MemoPostsSchema.parse(res).results;
}
