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
    return Response.json(
      {
        revalidated: false,
        message: 'Invalid token',
      },
      { status: 401 },
    );
  }

  if (!path) {
    return Response.json(
      {
        revalidated: false,
        message: 'Missing path to revalidate',
      },
      { status: 400 },
    );
  }

  revalidatePath(path, type ?? undefined);

  return Response.json(
    {
      revalidated: true,
      message: 'Revalidated',
    },
    { status: 200 },
  );
}
