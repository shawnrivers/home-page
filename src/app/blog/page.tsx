import { BlogCard } from '@/app/blog/components/BlogCard';
import { fetchPosts } from '@/utils/notion/api/fetchPosts';

export const revalidate = false;

export default async function BlogList() {
  const posts = await fetchPosts();

  return (
    <>
      <h1 className="sr-only">Blog</h1>
      <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {posts?.map((blog, index) => (
          <li key={blog.id}>
            <BlogCard
              title={blog.properties.Page.title[0].plain_text}
              href={`/blog/${blog.properties.Slug.rich_text[0].plain_text}`}
              date={blog.properties.Date.date.start}
              tags={blog.properties.Tags.multi_select}
              image={blog.cover?.file.url}
              imagePriority={index < 5}
              className="w-full"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
