import * as React from 'react';
import Image from 'next/image';
import { blogMeta, BlogMeta } from '../../blogs/meta';
import { Card } from '../../components/utils/Card';
import { Page } from '../../components/utils/Page';
import { getDateString } from '../../lib/utils/date';
import { BlogTag } from '../../components/pages/blog/BlogTag';
import { GetStaticProps } from 'next';
import { sortByDate } from '../../lib/utils/sorting';

const FeaturedPostCard: React.FC<BlogMeta> = props => {
  const { title, slug, date, tags, published, image } = props;

  return (
    <Card
      tag={tags[0]}
      href="/blog-mdx/[slug]"
      aria-label={title}
      as={`/blog-mdx/${slug}`}
    >
      <div className="flex flex-col sm:flex-row flex-wrap sm:items-center">
        {image && (
          <div className="flex-1 featured-card-flex">
            <Image
              src={image}
              width={480}
              height={360}
              alt=""
              role="presentation"
              className="placeholder object-cover"
            />
          </div>
        )}
        <div className="flex-1 m-4">
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
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
const NormalPostCard: React.FC<BlogMeta> = props => {
  const { title, slug, date, tags, published, image } = props;

  return (
    <Card
      tag={tags[0]}
      href="/blog-mdx/[slug]"
      aria-label={title}
      as={`/blog-mdx/${slug}`}
    >
      <div>
        {image && (
          <Image
            src={image}
            width={480}
            height={360}
            alt=""
            role="presentation"
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

type BlogIndexPageProps = {
  blogsMeta: {
    featured: BlogMeta;
    normal: BlogMeta[];
  };
};

export const getStaticProps: GetStaticProps<BlogIndexPageProps> = async context => {
  const meta = sortByDate(
    context.preview
      ? Object.values(blogMeta)
      : Object.values(blogMeta).filter(meta => meta.published),
    'date',
  );

  console.log(meta);

  const featuredIndex = meta.findIndex(meta => meta.featured);
  const featured = meta[featuredIndex];
  meta.splice(featuredIndex, 1);

  return {
    props: {
      blogsMeta: {
        featured,
        normal: meta,
      },
    },
  };
};

const BlogIndexPage: React.FC<BlogIndexPageProps> = props => {
  const { blogsMeta } = props;

  return (
    <Page titlePre="Blog" className="max-w-screen-lg mx-auto px-6">
      <h1 className="visually-hidden">Blog</h1>
      {blogsMeta.featured && (
        // Hack: for showing focus-visible outline
        <div className="grid grid-cols-1">
          <FeaturedPostCard {...blogsMeta.featured} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 content-center">
        {blogsMeta.normal.map(meta => (
          <NormalPostCard {...meta} key={meta.slug} />
        ))}
      </div>
    </Page>
  );
};

export default BlogIndexPage;
