import { z } from 'zod';
import { notion } from '@/libs/api/notion/client';
import { MemoPostSchema } from '@/libs/api/notion/schema/MemoPostSchema';

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
  const { draft = false, sorts } = params;

  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATA_SOURCE_ID_MEMO,
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
