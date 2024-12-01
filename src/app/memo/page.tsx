import { PostCard } from '@/app/memo/components/PostCard';
import { getPosts } from '@/app/memo/utils/getPosts';
import { sharedMetadata } from '@/utils/meta';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
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
      <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {posts?.map((post, index) => {
          const title = convertRichTextToPlainText(post.properties.Page.title);

          return (
            <li key={post.id}>
              <PostCard
                title={title}
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
                className="w-full"
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
