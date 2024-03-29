import { notion } from '@/utils/notion/client';
import { RichTextSchema } from '@/utils/notion/schema';
import { z } from 'zod';

const PostsSchema = z.object({
  object: z.literal('list'),
  results: z
    .array(
      z.object({
        object: z.literal('page'),
        id: z.string(),
        created_time: z.string(),
        last_edited_time: z.string(),
        archived: z.boolean(),
        cover: z
          .object({
            type: z.literal('file'),
            file: z.object({
              url: z.string(),
              expiry_time: z.string(),
            }),
          })
          .nullable(),
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
          Featured: z.object({
            type: z.literal('checkbox'),
            checkbox: z.boolean(),
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
      }),
    )
    .optional(),
});

type Posts = z.infer<typeof PostsSchema>['results'];
export type Post = Exclude<Posts, undefined>[number];

export async function fetchPosts(
  params: Partial<{ preview: boolean }> = {},
): Promise<Posts> {
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined.');

  const { preview = false } = params;

  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: !preview
      ? {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        }
      : undefined,
  });

  return PostsSchema.parse(res).results;
}
