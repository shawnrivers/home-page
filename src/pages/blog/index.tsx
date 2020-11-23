import Link from 'next/link';
import Header from '../../components/header';

import blogStyles from '../../styles/blog.module.css';
import sharedStyles from '../../styles/shared.module.css';

import { getBlogLink, getDateStr, postIsVisible } from '../../lib/blog-helpers';
import { textBlock } from '../../lib/notion/renderers';
import getNotionUsers from '../../lib/notion/getNotionUsers';
import getBlogIndex from '../../lib/notion/getBlogIndex';
import { getAssetURL } from '../../lib/utils/urls';

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex();

  const authorsToGet: Set<string> = new Set();
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
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

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name);
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
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>My Notion Blog</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        <div className={blogStyles.postsContainer}>
          {posts.map((post) => {
            return (
              <div className={blogStyles.postPreview} key={post.Slug}>
                <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                  <div>
                    {(post.preview || []).map((block, idx) => {
                      if (block.type === 'image') {
                        const assetSrc = getAssetURL(block.content, block.id);

                        return (
                          <img
                            src={assetSrc}
                            width="240"
                            height="240"
                            alt=""
                            role="presentation"
                          />
                        );
                      }
                      return <div className="no-image" />;
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
