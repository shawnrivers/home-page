import { notion } from '@/libs/api/notion/client';
import { z } from 'zod';

export const PageSchema = z.object({
  object: z.literal('page'),
  id: z.string(),
  created_time: z.string(),
  last_edited_time: z.string(),
  archived: z.boolean(),
  icon: z
    .object({
      type: z.literal('emoji'),
      emoji: z.string(),
    })
    .nullable(),
  cover: z
    .object({
      type: z.literal('file'),
      file: z.object({
        url: z.string(),
        expiry_time: z.string(),
      }),
    })
    .nullable(),
});

type Page = z.infer<typeof PageSchema>;

export async function fetchPage(id: string): Promise<Page> {
  const res = await notion.pages.retrieve({ page_id: id });
  return PageSchema.parse(res);
}
