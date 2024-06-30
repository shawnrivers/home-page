import { BlogCard } from '@/app/blog/components/BlogCard';
import { getCoverImageId } from '@/app/blog/utils/cover';
import { getPosts } from '@/app/blog/utils/getPosts';
import { sharedMetadata } from '@/utils/meta';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Blog | Usho',
  description: "Usho's blog",
  openGraph: {
    title: 'Blog | Usho',
    description: "Usho's blog",
    type: 'website',
    url: 'https://usho.dev/blog',
    images: {
      url: 'https://usho.dev/og-image.jpg',
      type: 'image/jpeg',
      width: 1280,
      height: 640,
      alt: "Usho's blog",
    },
  },
};

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="sr-only">Blog</h1>
      <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {posts?.map((post, index) => {
          const title = convertRichTextToPlainText(post.properties.Page.title);

          return (
            <li key={post.id}>
              <BlogCard
                title={title}
                href={`/blog/${convertRichTextToPlainText(
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
