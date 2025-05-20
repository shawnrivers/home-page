import { z } from 'zod/v4';

export const RichTextSchema = z.array(
  z.object({
    type: z.literal('text'),
    text: z.object({
      content: z.string(),
      link: z.object({ url: z.string() }).nullable(),
    }),
    annotations: z.object({
      bold: z.boolean(),
      italic: z.boolean(),
      strikethrough: z.boolean(),
      underline: z.boolean(),
      code: z.boolean(),
      color: z.string(),
    }),
    plain_text: z.string(),
    href: z.string().nullable(),
  }),
);

export type RichText = z.infer<typeof RichTextSchema>;
