import { MemoPostSchema } from '@/libs/api/notion/schema/MemoPostSchema';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const secret = headersList.get('X-Secret');

  if (secret !== process.env.REVALIDATE_API_SECRET) {
    return Response.json(
      {
        revalidated: false,
        message: 'Invalid token',
      },
      { status: 401 },
    );
  }

  const content = MemoPostSchema.safeParse(await request.json());

  if (!content.success) {
    return Response.json(
      {
        revalidated: false,
        message: `Invalid content: ${JSON.stringify(content.error.errors, null, 2)}`,
      },
      { status: 400 },
    );
  }

  const slug = content.data.properties.Slug.rich_text[0]?.plain_text;

  if (!slug) {
    return Response.json(
      {
        revalidated: false,
        message: 'Invalid Slug',
      },
      { status: 400 },
    );
  }

  const path = `/memo/${slug}`;

  revalidatePath(path);

  return Response.json(
    {
      revalidated: true,
      message: `Revalidate ${path}`,
    },
    { status: 200 },
  );
}
