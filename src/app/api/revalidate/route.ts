import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

const TypeSchema = z.union([z.literal('page'), z.literal('layout')]).nullable();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');
  const type = TypeSchema.parse(searchParams.get('type'));

  if (secret !== process.env.REVALIDATE_API_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  if (path) {
    revalidatePath(path, type ?? undefined);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  });
}
