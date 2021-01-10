import { Header } from '../../components/utils/Header';
import { getBlogLink, getDateStr, postIsVisible } from '../../lib/blog-helpers';
import getBlogIndex, { Blog } from '../../lib/notion/getBlogIndex';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { PostPreview } from '../../lib/notion/getPostPreview';
import { fetchNotionAsset } from '../../lib/apis/notion/assetAPI';
import { BlogTag } from '../../components/pages/blog/BlogTag';
import { Card } from '../../components/utils/Card';
import { PreviewNote } from '../../components/pages/blog/PreviewNote';

type PreviewContent = PostPreview[0] & { source: string | null };

type Post = Omit<Blog, 'Tags' | 'preview'> & {
  preview?: PreviewContent[];
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

const FeaturedPostCard: React.FC<{
  post: Post;
}> = props => {
  const { post } = props;

  return (
    <Card tag={post.Tags[0]} href="/blog/[slug]" as={getBlogLink(post.Slug)}>
      <div className="flex flex-col sm:flex-row flex-wrap sm:items-center">
        {(post.preview || [])
          .filter(block => block.type === 'image')
          .map((block, idx) => {
            if (idx > 0) {
              return null;
            }

            if (!block.content || !block.source) {
              return null;
            }

            return (
              <div className="flex-1 featured-card-flex" key={block.id}>
                <Image
                  src={block.source}
                  width={480}
                  height={360}
                  alt=""
                  role="presentation"
                  key={block.id}
                  className="placeholder object-cover"
                />
              </div>
            );
          })}
        <div className="flex-1 ml-2 my-4">
          <h3>{post.Page}</h3>
          {post.Date && <div className="mt-1">{getDateStr(post.Date)}</div>}
          {post.Tags.length > 0 && (
            <div className="blog-tag-group mt-2">
              {post.Published !== 'Yes' && <BlogTag text="Draft" />}
              {post.Tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const NormalPostCard: React.FC<{
  post: Post;
}> = props => {
  const { post } = props;

  return (
    <Card tag={post.Tags[0]} href="/blog/[slug]" as={getBlogLink(post.Slug)}>
      <div>
        {(post.preview || [])
          .filter(block => block.type === 'image')
          .map((block, idx) => {
            if (idx > 0) {
              return null;
            }

            if (!block.content || !block.source) {
              return null;
            }

            return (
              <Image
                src={block.source}
                width={480}
                height={360}
                alt=""
                role="presentation"
                key={block.id}
                className="placeholder"
              />
            );
          })}
        <div className="mt-2 mb-4 mx-4">
          <h3>{post.Page}</h3>
          {post.Date && <div className="mt-1">{getDateStr(post.Date)}</div>}
          {post.Tags.length > 0 && (
            <div className="blog-tag-group mt-2">
              {post.Published !== 'Yes' && <BlogTag text="Draft" />}
              {post.Tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
          <p>
            {(!post.preview || post.preview.length === 0) &&
              'No preview available'}
          </p>
        </div>
      </div>
    </Card>
  );
};

const PostIndex: React.FC<PostIndexProps> = props => {
  const { posts, preview } = props;

  const featuredPostIndex = posts.findIndex(post => post.Featured === 'Yes');
  const featuredPost = featuredPostIndex > -1 ? posts[featuredPostIndex] : null;
  const normalPosts = posts.filter((_, index) => index !== featuredPostIndex);

  return (
    <>
      <Header titlePre="Blog" />
      {preview && <PreviewNote clearLink="/api/clear-preview" />}
      <main className="max-w-screen-lg mx-auto px-6">
        {posts.length === 0 && (
          <p className="text-center">There are no posts yet</p>
        )}
        {featuredPost && <FeaturedPostCard post={featuredPost} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 content-center">
          {normalPosts.map(post => (
            <NormalPostCard post={post} key={post.Slug} />
          ))}
        </div>
      </main>
    </>
  );
};

export default PostIndex;
