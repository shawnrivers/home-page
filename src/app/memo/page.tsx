import { PostCard } from '@/app/memo/_components/PostCard';
import { getPosts } from '@/app/memo/_utils/getPosts';
import { sharedMetadata } from '@/libs/utils/meta';
import { convertRichTextToPlainText } from '@/libs/api/notion/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Memo | Usho',
  description: "Usho's memo",
  openGraph: {
    title: 'Memo | Usho',
    description: "Usho's memo",
    type: 'website',
    url: 'https://usho.dev/memo',
    images: {
      url: 'https://usho.dev/og-image.jpg',
      type: 'image/jpeg',
      width: 1280,
      height: 640,
      alt: "Usho's memo",
    },
  },
};

export default async function MemoList() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="sr-only">Memo</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post, index) => {
          return (
            <li key={post.id}>
              <PostCard
                title={convertRichTextToPlainText(post.properties.Page.title)}
                href={`/memo/${convertRichTextToPlainText(
                  post.properties.Slug.rich_text,
                )}`}
                date={post.properties.Date.date.start}
                tags={post.properties.Tags.multi_select}
                image={
                  post.coverImage !== undefined
                    ? {
                        publicId: post.coverImage.public_id,
                        originalWidth: post.coverImage.width,
                        originalHeight: post.coverImage.height,
                      }
                    : undefined
                }
                emoji={post.icon?.emoji}
                imagePriority={index < 5}
                className="w-full h-full"
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
