import Image from 'next/image';
import { blogsMeta, BlogMeta } from 'app/pages/blog/meta';
import { BlogCard } from 'app/components/pages/blog/BlogCard';
import { Page } from 'app/components/shared/Page';
import { getDateString } from 'app/utils/date';
import { BlogTag } from 'app/components/pages/blog/BlogTag';
import { sortByDate } from 'app/utils/sorting';
import type { NextPage } from 'next';

const blogsInfo = sortByDate(Object.values(blogsMeta), 'date');

const PostCard: React.FC<
  BlogMeta & {
    imagePriority?: boolean;
    className?: string;
  }
> = props => {
  const {
    title,
    slug,
    date,
    tags,
    published,
    image,
    imagePriority,
    className,
  } = props;

  return (
    <BlogCard
      tag={tags[0]}
      href="/blog/[slug]"
      aria-label={title}
      as={`/blog/${slug}`}
      className={className}
    >
      <div>
        {image && (
          <Image
            src={image}
            width={480}
            height={320}
            alt=""
            role="presentation"
            priority={imagePriority}
            className="placeholder object-cover"
          />
        )}
        <div className="mt-2 mb-4 mx-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {date && (
            <div className="mt-1 text-base text-zinc-500 dark:text-zinc-300">
              {getDateString(date)}
            </div>
          )}
          {tags.length > 0 && (
            <div className="space-x-2 mt-2">
              {!published && <BlogTag text="draft" />}
              {tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </BlogCard>
  );
};

const BlogIndexPage: NextPage = () => {
  return (
    <Page titlePre="Blog" className="max-w-6xl mx-auto px-6">
      <h1 className="sr-only">Blog</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 content-center items-stretch">
        {blogsInfo.map((meta, index) => (
          <PostCard
            {...meta}
            imagePriority={index < 10 ? true : false}
            key={meta.slug}
          />
        ))}
      </div>
    </Page>
  );
};

export default BlogIndexPage;
