import { PageSchema } from '@/utils/notion/api/fetchPage';
import { notion } from '@/utils/notion/client';
import { RichTextSchema } from '@/utils/notion/schema';
import { z } from 'zod';

const MemoPostSchema = z
  .object({
    properties: z.object({
      Published: z.object({
        type: z.literal('checkbox'),
        checkbox: z.boolean(),
      }),
      Tags: z.object({
        type: z.literal('multi_select'),
        multi_select: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            color: z.string(),
          }),
        ),
      }),
      Slug: z.object({
        type: z.literal('rich_text'),
        rich_text: RichTextSchema,
      }),
      Date: z.object({
        type: z.literal('date'),
        date: z.object({
          start: z.string(),
          end: z.string().nullable(),
        }),
      }),
      Page: z.object({
        type: z.literal('title'),
        title: z.array(
          z.object({
            type: z.literal('text'),
            plain_text: z.string(),
          }),
        ),
      }),
    }),
  })
  .merge(PageSchema);

const MemoPostsSchema = z.object({
  object: z.literal('list'),
  results: z.array(MemoPostSchema).optional(),
});

type Posts = z.infer<typeof MemoPostsSchema>['results'];

export async function fetchMemoPosts(
  params: Partial<{ draft: boolean }> = {},
): Promise<Posts> {
  if (!process.env.NOTION_DATABASE_ID_BLOG)
    throw new Error('NOTION_DATABASE_ID_BLOG is not defined.');

  const { draft = false } = params;

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
  });

  return MemoPostsSchema.parse(res).results;
}
