import { BlogMeta } from 'blogs/meta';
import { getDateString } from 'utils/date';
import { getBlogOgImageUrl } from 'utils/url';
import { HeaderProps } from 'components/utils/Header';
import { Page } from 'components/utils/Page';
import { BlogTag } from './BlogTag';

function getBlogHead(blogMeta: BlogMeta): HeaderProps {
  return {
    titlePre: blogMeta.title,
    ogImageUrl: blogMeta.image ? getBlogOgImageUrl(blogMeta.image) : undefined,
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
      <article className="prose post break-words">
        <div className="mb-8">
          <div className="text-base mb-2 text-gray-500 dark:text-gray-400">
            {getDateString(date)}
          </div>
          <h1 className="text-2xl">{title}</h1>
          {tags.length > 0 && (
            <div className="blog-tag-group mt-4">
              {!published && <BlogTag text="draft" />}
              {tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
        {children}
      </article>
    </Page>
  );
};
