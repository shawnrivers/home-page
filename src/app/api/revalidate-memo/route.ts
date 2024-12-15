import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_API_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  return Response.json(request);
}
