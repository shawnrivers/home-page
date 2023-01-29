import { BlogCard } from '@/app/blog/components/BlogCard';
import { fetchBlogs } from '@/utils/notion';

export default async function Blog() {
  const blogs = await fetchBlogs();

  return (
    <>
      <h1 className="sr-only">Blog</h1>
      <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {blogs?.map((blog, index) => (
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

export const revalidate = 1800;
