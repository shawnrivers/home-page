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

export type Page = z.infer<typeof PageSchema>;
