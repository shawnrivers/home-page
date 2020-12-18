import Link from 'next/link';
import Header from '../../components/header';
import blogStyles from '../../styles/blog.module.css';
import { getBlogLink, getDateStr, postIsVisible } from '../../lib/blog-helpers';
import { textBlock } from '../../lib/notion/renderers';
import getBlogIndex from '../../lib/notion/getBlogIndex';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { TableRow } from '../../lib/notion/getTableData';
import { PostPreview } from '../../lib/notion/getPostPreview';
import { fetchNotionAsset } from '../../lib/apis/notion/assetAPI';

type Post = {
  preview?: (PostPreview[0] & { source?: string })[];
} & TableRow;

type PostIndexProps = {
  posts: Post[];
  preview: boolean;
};

export const getStaticProps: GetStaticProps<PostIndexProps> = async params => {
  const { preview } = params;
  const postsTable = await getBlogIndex();

  const posts = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug];
      // remove draft posts in production
      if (!preview && !postIsVisible(post)) {
        return null;
      }
      return post;
    })
    .filter(Boolean)
    .sort((postA, postB) => Math.sign(postB.Date - postA.Date));

  await Promise.all(
    posts.map(post =>
      Promise.all(
        post.preview?.map(async preview => {
          if (preview.type === 'image') {
            const source = await fetchNotionAsset(
              preview.content[0][0],
              preview.id,
            );

            preview.source = source;
          }
        }),
      ),
    ),
  );

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  };
};

const PostIndex: React.FC<PostIndexProps> = props => {
  const { posts, preview } = props;

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

                        if (!block.content || !block.source) {
                          return (
                            <div className={blogStyles.noImage} key={idx} />
                          );
                        }

                        return (
                          <Image
                            src={block.source}
                            width={400}
                            height={300}
                            alt=""
                            role="presentation"
                            key={block.id}
                            className="placeholder"
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
                    <p>
                      {(!post.preview || post.preview.length === 0) &&
                        'No preview available'}
                      {/* {(post.preview || []).map((block, idx) => {
                        if (block.type === 'text') {
                          return textBlock(
                            block.content,
                            true,
                            `${post.Slug}${idx}`,
                          );
                        }
                        return null;
                      })} */}
                    </p>
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

export default PostIndex;
