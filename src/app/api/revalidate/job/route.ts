import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function POST() {
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

  revalidatePath('/job');

  return Response.json(
    {
      revalidated: true,
      message: 'Revalidated /job',
    },
    { status: 200 },
  );
}
