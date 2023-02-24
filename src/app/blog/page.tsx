import { BlogCard } from '@/app/blog/components/BlogCard';
import { getCoverImageId } from '@/app/blog/utils/cover';
import { getBlogImages } from '@/app/blog/utils/getBlogImages';
import { sharedMetadata } from '@/utils/meta';
import { fetchPosts } from '@/utils/notion/api/fetchPosts';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { Metadata } from 'next';
import { previewData } from 'next/headers';

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
      url: '/og-image.jpg',
      type: 'image/jpeg',
      width: 1280,
      height: 640,
      alt: "Usho's blog",
    },
  },
};

export default async function BlogList() {
  const { posts, images } = await getData();

  return (
    <>
      <h1 className="sr-only">Blog</h1>
      <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {posts?.map((blog, index) => {
          const title = convertRichTextToPlainText(blog.properties.Page.title);
          const image = images.find(image =>
            image?.public_id.includes(getCoverImageId(title)),
          );

          return (
            <li key={blog.id}>
              <BlogCard
                title={title}
                href={`/blog/${convertRichTextToPlainText(
                  blog.properties.Slug.rich_text,
                )}`}
                date={blog.properties.Date.date.start}
                tags={blog.properties.Tags.multi_select}
                image={
                  image !== undefined
                    ? {
                        publicId: image.public_id,
                        originalWidth: image.width,
                        originalHeight: image.height,
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

async function getData() {
  const posts = await fetchPosts({
    preview: !!previewData(),
  });

  const postCovers =
    posts?.map(post => ({
      url: post.cover?.file.url ?? '',
      fileName: getCoverImageId(
        convertRichTextToPlainText(post.properties.Page.title),
      ),
    })) ?? [];
  const images = await getBlogImages(postCovers);

  return { posts, images };
}
