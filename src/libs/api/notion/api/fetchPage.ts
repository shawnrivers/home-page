import { notion } from '@/libs/api/notion/client';
import { PageSchema, type Page } from '@/libs/api/notion/schema/PageSchema';

export async function fetchPage(id: string): Promise<Page> {
  const res = await notion.pages.retrieve({ page_id: id });
  return PageSchema.parse(res);
}
