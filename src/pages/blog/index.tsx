import Link from 'next/link';
import Header from '../../components/header';
import blogStyles from '../../styles/blog.module.css';
import { getBlogLink, getDateStr, postIsVisible } from '../../lib/blog-helpers';
import { textBlock } from '../../lib/notion/renderers';
import getNotionUsers from '../../lib/notion/getNotionUsers';
import getBlogIndex from '../../lib/notion/getBlogIndex';
import { getAssetURL } from '../../lib/utils/urls';
import Image from 'next/image';

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex();

  const authorsToGet: Set<string> = new Set();
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug];
      // remove draft posts in production
      if (!preview && !postIsVisible(post)) {
        return null;
      }
      post.Authors = post.Authors || [];
      for (const author of post.Authors) {
        authorsToGet.add(author);
      }
      return post;
    })
    .filter(Boolean);

  const { users } = await getNotionUsers([...authorsToGet]);

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name);
  });

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  };
}

export default ({ posts = [], preview }) => {
  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={blogStyles.blogIndex}>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        <div className={blogStyles.postsContainer}>
          {posts.map(post => {
            return (
              <div className={blogStyles.postPreview} key={post.Slug}>
                <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                  <div>
                    {(post.preview || [])
                      .filter(block => block.type === 'image')
                      .map((block, idx) => {
                        if (idx > 0) {
                          return null;
                        }

                        if (!block.content) {
                          return (
                            <div className={blogStyles.noImage} key={idx} />
                          );
                        }

                        const assetSrc = getAssetURL(block.content, block.id);

                        return (
                          <img
                            src={assetSrc}
                            width="300"
                            height="300"
                            alt=""
                            role="presentation"
                            key={block.id}
                          />
                        );
                      })}
                    <h3>
                      {!post.Published && (
                        <span className={blogStyles.draftBadge}>Draft</span>
                      )}
                      {post.Page}
                    </h3>
                    {post.Date && (
                      <div className="posted">{getDateStr(post.Date)}</div>
                    )}
                    {/* <p>
                      {(!post.preview || post.preview.length === 0) &&
                        'No preview available'}
                      {(post.preview || []).map((block, idx) => {
                        if (block.type === 'text') {
                          return textBlock(
                            block.content,
                            true,
                            `${post.Slug}${idx}`,
                          );
                        }
                        return null;
                      })}
                    </p> */}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
