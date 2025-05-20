import { PageSchema } from '@/libs/api/notion/schema/PageSchema';
import { RichTextSchema } from '@/libs/api/notion/schema/RichTextSchema';
import { z } from 'zod/v4';

export const MemoPostSchema = z
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
      UpdatedAt: z.object({
        type: z.literal('date'),
        date: z
          .object({
            start: z.string(),
            end: z.string().nullable(),
          })
          .nullable(),
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

export type MemoPost = z.infer<typeof MemoPostSchema>;
