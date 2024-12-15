import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_API_SECRET) {
    return Response.json(
      {
        revalidated: false,
        message: 'Invalid token',
      },
      { status: 401 },
    );
  }

  const content = await request.json();

  if (!content.Slug || typeof content.Slug !== 'string') {
    return Response.json(
      {
        revalidated: false,
        message: 'Missing Slug',
      },
      { status: 400 },
    );
  }

  const path = `/memo/${content.Slug}`;

  revalidatePath(path);

  return Response.json(
    {
      revalidated: true,
      message: `Revalidate ${path}`,
    },
    { status: 200 },
  );
}
