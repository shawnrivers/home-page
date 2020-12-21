import Link from 'next/link';
import Header from '../../components/header';
import blogStyles from '../../styles/blog.module.css';
import { getBlogLink, getDateStr, postIsVisible } from '../../lib/blog-helpers';
// import { textBlock } from '../../lib/notion/renderers';
import getBlogIndex, { Blog } from '../../lib/notion/getBlogIndex';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { PostPreview } from '../../lib/notion/getPostPreview';
import { fetchNotionAsset } from '../../lib/apis/notion/assetAPI';
import { Badge } from '../../components/atoms/Badge';

type Post = Omit<Blog, 'Tags' | 'preview'> & {
  preview?: (PostPreview[0] & { source: string | null })[];
  Tags: string[];
};

type PostIndexProps = {
  posts: Post[];
  preview: boolean;
};

export const getStaticProps: GetStaticProps<PostIndexProps> = async params => {
  const { preview } = params;
  const postsTable = await getBlogIndex();

  const posts: Post[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug];
      // remove draft posts in production
      if (!preview && !postIsVisible(post)) {
        return null;
      }
      return {
        ...post,
        Tags: post.Tags.split(','),
        preview: post.preview.map(pre => ({
          ...pre,
          source: null,
        })),
      };
    })
    .filter(Boolean)
    .sort((postA, postB) => Math.sign(postB.Date - postA.Date));

  await Promise.all(
    posts.map(post =>
      Promise.all(
        post.preview?.map(async preview => {
          if (preview.type === 'image') {
            const source = await fetchNotionAsset(
              preview.content[0][0] as string,
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

  console.log({ posts });

  const featuredPostIndex = posts.findIndex(post => post.Featured === 'Yes');
  const featuredPost = featuredPostIndex > -1 ? posts[featuredPostIndex] : null;
  const normalPosts = posts.filter((_, index) => index !== featuredPostIndex);

  console.log({ featuredPost, normalPosts });

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
        {featuredPost && (
          <article className={blogStyles.postPreview}>
            <Link href="/blog/[slug]" as={getBlogLink(featuredPost.Slug)}>
              <div className={blogStyles.featuredPost}>
                {(featuredPost.preview || [])
                  .filter(block => block.type === 'image')
                  .map((block, idx) => {
                    if (idx > 0) {
                      return null;
                    }

                    if (!block.content || !block.source) {
                      return <div className={blogStyles.noImage} key={idx} />;
                    }

                    return (
                      <Image
                        src={block.source}
                        width={600}
                        height={450}
                        alt=""
                        role="presentation"
                        key={block.id}
                        className={`placeholder ${blogStyles.featuredPostImage}`}
                      />
                    );
                  })}
                <div className={blogStyles.featuredPostText}>
                  <h3>{featuredPost.Page}</h3>
                  {featuredPost.Date && (
                    <div className="posted">
                      {getDateStr(featuredPost.Date)}
                    </div>
                  )}
                  {featuredPost.Tags.length > 0 && (
                    <div className={blogStyles.badgeGroup}>
                      {featuredPost.Published !== 'Yes' && (
                        <Badge text="Draft" />
                      )}
                      {featuredPost.Tags.map(tag => (
                        <Badge text={tag} key={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </article>
        )}
        <div className={blogStyles.postsContainer}>
          {normalPosts.map(post => {
            return (
              <article className={blogStyles.postPreview} key={post.Slug}>
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
                    <h3>{post.Page}</h3>
                    {post.Date && (
                      <div className="posted">{getDateStr(post.Date)}</div>
                    )}
                    {post.Tags.length > 0 && (
                      <div className={blogStyles.badgeGroup}>
                        {post.Published !== 'Yes' && <Badge text="Draft" />}
                        {post.Tags.map(tag => (
                          <Badge text={tag} key={tag} />
                        ))}
                      </div>
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
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostIndex;
