import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { z } from 'zod/v4';
import { MemoPostSchema } from '@/libs/api/notion/schema/MemoPostSchema';

const ContentSchema = z.object({ data: MemoPostSchema });

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

  const content = ContentSchema.safeParse(await request.json());

  if (!content.success) {
    return Response.json(
      {
        revalidated: false,
        message: `Invalid content: ${content.error.message}`,
      },
      { status: 400 },
    );
  }

  const slug = content.data.data.properties.Slug.rich_text[0]?.plain_text;

  if (!slug) {
    return Response.json(
      {
        revalidated: false,
        message: 'Invalid Slug',
      },
      { status: 400 },
    );
  }

  const postPath = `/memo/${slug}`;

  revalidatePath('/memo');
  revalidatePath(postPath);

  return Response.json(
    {
      revalidated: true,
      message: `Revalidated /memo and ${postPath}`,
    },
    { status: 200 },
  );
}
