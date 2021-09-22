import Image from 'next/image';
import { blogsMeta, BlogMeta } from 'blogs/meta';
import { Card } from 'components/shared/Card';
import { Page } from 'components/shared/Page';
import { getDateString } from 'utils/date';
import { BlogTag } from 'components/pages/blog/BlogTag';
import { sortByDate } from 'utils/sorting';

const blogsInfo = sortByDate(Object.values(blogsMeta), 'date');

const PostCard: React.FC<
  BlogMeta & {
    imagePriority?: boolean;
  }
> = props => {
  const { title, slug, date, tags, published, image, imagePriority } = props;

  return (
    <Card
      tag={tags[0]}
      href="/blog/[slug]"
      aria-label={title}
      as={`/blog/${slug}`}
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
            <div className="mt-1 text-base text-gray-500 dark:text-gray-300">
              {getDateString(date)}
            </div>
          )}
          {tags.length > 0 && (
            <div className="blog-tag-group mt-2">
              {!published && <BlogTag text="draft" />}
              {tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const BlogIndexPage: React.FC = () => {
  return (
    <Page titlePre="Blog" className="max-w-6xl mx-auto px-6">
      <h1 className="visually-hidden">Blog</h1>
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
