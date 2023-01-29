import { Client } from '@notionhq/client';
import { z } from 'zod';

const notion = new Client({ auth: process.env.NOTION_KEY });

const BlogListSchema = z.object({
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
            rich_text: z.array(
              z.object({
                type: z.literal('text'),
                plain_text: z.string(),
              }),
            ),
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

export async function fetchBlogs(
  params?: Omit<Parameters<typeof notion.databases.query>[0], 'database_id'>,
) {
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined.');

  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    ...params,
  });

  return BlogListSchema.parse(res).results;
}
