import { notion } from '@/libs/api/notion/client';
import { RichTextSchema } from '@/libs/api/notion/schema/RichTextSchema';
import { z } from 'zod';

const BlocksSchema = z.object({
  object: z.literal('list'),
  next_cursor: z.string().nullable(),
  has_more: z.boolean(),
  results: z.array(
    z.discriminatedUnion('type', [
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('paragraph'),
        paragraph: z.object({
          rich_text: RichTextSchema,
          color: z.string(),
        }),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('heading_1'),
        heading_1: z.object({
          rich_text: RichTextSchema,
          color: z.string(),
        }),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('heading_2'),
        heading_2: z.object({
          rich_text: RichTextSchema,
          color: z.string(),
        }),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('heading_3'),
        heading_3: z.object({
          rich_text: RichTextSchema,
          color: z.string(),
        }),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('bulleted_list_item'),
        bulleted_list_item: z.object({
          rich_text: RichTextSchema,
          color: z.string(),
        }),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('numbered_list_item'),
        numbered_list_item: z.object({
          rich_text: RichTextSchema,
          color: z.string(),
        }),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('quote'),
        quote: z.object({
          rich_text: RichTextSchema,
          color: z.string(),
        }),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('image'),
        image: z.discriminatedUnion('type', [
          z.object({
            caption: RichTextSchema,
            type: z.literal('external'),
            external: z.object({
              url: z.string(),
            }),
          }),
          z.object({
            caption: RichTextSchema,
            type: z.literal('file'),
            file: z.object({
              url: z.string(),
              expiry_time: z.string(),
            }),
          }),
        ]),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('code'),
        code: z.object({
          caption: RichTextSchema,
          rich_text: RichTextSchema,
          language: z.string(),
        }),
      }),
      z.object({
        id: z.string(),
        has_children: z.boolean(),
        type: z.literal('divider'),
      }),
    ]),
  ),
});

type Blocks = z.infer<typeof BlocksSchema>;
export type Block = Blocks['results'][number];

export async function fetchBlocks(
  params: Parameters<typeof notion.blocks.children.list>[0],
): Promise<Block[]> {
  let cursor: string | null = null;
  let blocks: Block[] = [];

  while (true) {
    const res = await notion.blocks.children.list({
      ...params,
      start_cursor: cursor ?? undefined,
    });
    const { next_cursor, results } = BlocksSchema.parse(res);
    blocks = [...blocks, ...results];

    if (next_cursor) {
      cursor = next_cursor;
    } else {
      break;
    }
  }

  return blocks;
}
