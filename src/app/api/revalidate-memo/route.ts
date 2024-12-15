import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_API_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  const content = await request.json();

  if (!content.Slug || typeof content.Slug !== 'string') {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Missing Slug',
    });
  }

  const path = `/memo/${content.Slug}`;

  revalidatePath(path);

  return Response.json({
    revalidated: true,
    now: Date.now(),
    message: `Revalidate ${path}`,
  });
}
