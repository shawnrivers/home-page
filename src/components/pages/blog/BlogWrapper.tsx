import { BlogMeta } from 'app/pages/blog/meta';
import { getDateString } from 'app/utils/date';
import { getBlogOgImageUrl } from 'app/utils/url';
import { HeaderProps } from 'app/components/shared/Header';
import { Page } from 'app/components/shared/Page';
import { BlogTag } from './BlogTag';

function getBlogHead(blogMeta: BlogMeta): HeaderProps {
  return {
    titlePre: blogMeta.title,
    ogImageUrl: blogMeta.image
      ? getBlogOgImageUrl(blogMeta.image.url)
      : undefined,
    description: blogMeta.description,
  };
}

export const BlogWrapper: React.FC<{
  children?: React.ReactNode;
  meta: BlogMeta;
}> = props => {
  const { meta, children } = props;
  const { title, date, tags, published } = meta;

  return (
    <Page {...getBlogHead(meta)}>
      <article className="prose lg:prose-lg prose-zinc dark:prose-invert mx-auto px-4 break-words">
        <div className="mb-8">
          <time
            dateTime={date}
            className="block text-base mb-2 text-zinc-500 dark:text-zinc-400"
          >
            {getDateString(date)}
          </time>
          <h1>{title}</h1>
          {tags.length > 0 && (
            <div className="space-x-2 mt-3">
              {!published && <BlogTag text="draft" />}
              {tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
        <div className="post-body">{children}</div>
      </article>
    </Page>
  );
};
