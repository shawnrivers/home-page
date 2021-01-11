import { useRouter } from 'next/router';
import { Heading, HeadingProps } from '../../components/pages/blog/Heading';
import { DynamicComponent } from '../../components/pages/blog/DynamicComponent';
import ReactJSXParser from '@zeit/react-jsx-parser';
import { textBlock } from '../../lib/notion/renderers';
import getPageData from '../../lib/notion/getPageData';
import * as React from 'react';
import getBlogIndex from '../../lib/notion/getBlogIndex';
import { getBlogLink, getDateStr, postIsVisible } from '../../lib/blog-helpers';
import { fetchNotionAsset } from '../../lib/apis/notion/assetAPI';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Block,
  ImageBlock,
  TweetBlock,
  VideoBlock,
} from '../../lib/apis/notion/response/pageChunk';
import { TableRow } from '../../lib/notion/getTableData';
import {
  isCalloutBlock,
  isCodeBlock,
  isEmbedBlock,
  isEquationBlock,
  isHeaderBlock,
  isListBlock,
  isQuoteBlock,
  isTextBlock,
} from '../../lib/apis/notion/utils/typeGuards';
import axios from 'axios';
import { PreviewNote } from '../../components/pages/blog/PreviewNote';
import { Page } from '../../components/utils/Page';
import { BlogTag } from '../../components/pages/blog/BlogTag';

function isAssetContent(
  content: Post['content'][0],
): content is ImageContent | VideoContent {
  return content.value.type === 'image' || content.value.type === 'video';
}

function isImageContent(content: Post['content'][0]): content is ImageContent {
  return content.value.type === 'image';
}

function isVideoContent(content: Post['content'][0]): content is VideoContent {
  return content.value.type === 'video';
}

function isTweetContent(content: Post['content'][0]): content is TweetContent {
  return content.value.type === 'tweet';
}

const listTypes = new Set(['bulleted_list', 'numbered_list']);

type TweetContent = TweetBlock & {
  value: {
    properties: {
      html: string;
    };
  };
};

type AssetContent = {
  value: {
    source: string;
  };
};

type ImageContent = ImageBlock & AssetContent;
type VideoContent = VideoBlock & AssetContent;

type Post = {
  content: (
    | Exclude<Block, 'TweetBlock' | 'ImageBlock' | 'VideoBlock'>
    | TweetContent
    | ImageContent
    | VideoContent
  )[];
  hasTweet: boolean;
} & TableRow;

type PostEntryProps = {
  post?: Post;
  redirect?: string;
  preview: boolean;
};

type Params = {
  slug: string;
};

// Get the data for each blog post
export const getStaticProps: GetStaticProps<PostEntryProps, Params> = async ({
  params: { slug },
  preview,
}) => {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex();
  const post: Post = { ...postsTable[slug], hasTweet: false, content: [] };

  // if we can't find the post or if it is unpublished and
  // viewed without preview mode then we just redirect to /blog
  if (!post || (!postIsVisible(post) && !preview)) {
    console.log(`Failed to find post for slug: ${slug}`);
    return {
      props: {
        redirect: '/blog',
        preview: false,
      },
      revalidate: 5,
    };
  }

  const postData = await getPageData(post.id as string, 1000);
  post.content = postData.blocks;
  post.Tags = post.Tags.split(',');

  await Promise.all(
    post.content.map(async block => {
      if (isTweetContent(block)) {
        const { value } = block;

        const src = value.properties.source[0][0] as string;
        // parse id from https://twitter.com/_ijjk/status/TWEET_ID format
        const tweetId = src.split('/')[5].split('?')[0];
        if (tweetId) {
          try {
            const response = await axios.get(
              `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`,
            );
            value.properties.html = response.data.html.split('<script')[0];
            post.hasTweet = true;
          } catch (error) {
            console.log(`Failed to get tweet embed for ${src}`);
          }
        }
      }

      if (isAssetContent(block)) {
        const { value } = block;

        if (value.format) {
          value.source = await fetchNotionAsset(
            value.format.display_source,
            value.id,
          );
        } else {
          value.source = value.properties.source[0][0] as string;
        }
      }
    }),
  );

  return {
    props: {
      post,
      preview: preview || false,
    },
    revalidate: 10,
  };
};

// Return our list of blog posts to prerender
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const postsTable = await getBlogIndex();
  // we fallback for any unpublished posts to save build time
  // for actually published ones
  return {
    paths: Object.keys(postsTable)
      .filter(post => postsTable[post].Published === 'Yes')
      .map(slug => getBlogLink(slug)),
    fallback: true,
  };
};

const PostEntry: React.FC<PostEntryProps> = props => {
  const { post, redirect, preview } = props;
  const router = useRouter();

  let listTagName: string | null = null;
  let listLastId: string | null = null;
  let listMap: {
    [id: string]: {
      key: string;
      isNested?: boolean;
      nested: string[];
      children: React.ReactFragment;
    };
  } = {};

  React.useEffect(() => {
    // make sure to initialize any new widgets loading on
    // client navigation
    if (post && post.hasTweet) {
      const twitterSrc = 'https://platform.twitter.com/widgets.js';

      if ((window as any)?.twttr?.widgets) {
        (window as any).twttr.widgets.load();
      } else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.src = twitterSrc;
        document.querySelector('body').appendChild(script);
      }
    }
  }, []);
  React.useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect);
    }
  }, [redirect, post]);

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Page className="mt-8 prose post">
        <p className="text-center text-lg font-bold">Loading...</p>
      </Page>
    );
  }

  // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index
  if (!post) {
    return (
      <Page className="prose post mt-8">
        <p>
          Woops! didn't find that post, redirecting you back to the blog index
        </p>
      </Page>
    );
  }

  const ogImageUrl = isImageContent(post.content[0])
    ? post.content[0].value.source
    : undefined;
  const description = post.preview[1]?.content[0][0] ?? undefined;

  return (
    <Page
      titlePre={post.Page}
      ogImageUrl={ogImageUrl}
      description={description}
    >
      {preview && (
        <PreviewNote
          clearLink={`/api/clear-preview?slug=${post.Slug}`}
          className="mb-8"
        />
      )}
      <article className="prose post break-words">
        <div className="mb-6">
          {post.Date && (
            <div className="text-base mb-2 text-gray-500 dark:text-gray-400">
              {getDateStr(post.Date)}
            </div>
          )}
          <h1 className="text-2xl">{post.Page || ''}</h1>
          {post.Tags.length > 0 && (
            <div className="blog-tag-group mt-4">
              {post.Published !== 'Yes' && <BlogTag text="Draft" />}
              {post.Tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>

        {(!post.content || post.content.length === 0) && (
          <p>This post has no content</p>
        )}

        {/* Post content */}
        {(post.content || []).map((block, blockIdx) => {
          const { id } = block.value;
          const toRender = [];

          // page or divider
          if (block.value.type === 'page' || block.value.type === 'divider') {
            return toRender;
          }

          // list
          if (isListBlock(block)) {
            const { parent_id, properties } = block.value;

            listTagName =
              DynamicComponent[
                block.value.type === 'bulleted_list' ? 'ul' : 'ol'
              ];
            listLastId = `list${id}`;

            listMap[id] = {
              key: id,
              nested: [],
              children: textBlock(properties.title, true, id),
            };

            if (listMap[parent_id]) {
              listMap[id].isNested = true;
              listMap[parent_id].nested.push(id);
            }
          }

          const isList = listTypes.has(block.value.type);
          const isLast = blockIdx === post.content.length - 1;

          if (listTagName && (isLast || !isList)) {
            toRender.push(
              React.createElement(
                listTagName,
                { key: listLastId },
                Object.keys(listMap).map(itemId => {
                  if (listMap[itemId].isNested) return null;

                  const createEl = item =>
                    React.createElement(
                      DynamicComponent.li || 'ul',
                      { key: item.key },
                      item.children,
                      item.nested.length > 0
                        ? React.createElement(
                            DynamicComponent.ul || 'ul',
                            { key: item + 'sub-list' },
                            item.nested.map(nestedId =>
                              createEl(listMap[nestedId]),
                            ),
                          )
                        : null,
                    );
                  return createEl(listMap[itemId]);
                }),
              ),
            );
            listMap = {};
            listLastId = null;
            listTagName = null;

            return toRender;
          }

          // quote
          if (isQuoteBlock(block)) {
            const { properties } = block.value;

            toRender.push(
              React.createElement(
                DynamicComponent.blockquote,
                { key: id },
                properties.title,
              ),
            );

            return toRender;
          }

          // equation
          if (isEquationBlock(block)) {
            const { properties } = block.value;

            const content = properties.title[0][0];
            toRender.push(
              <DynamicComponent.Equation key={id} displayMode={true}>
                {content}
              </DynamicComponent.Equation>,
            );

            return toRender;
          }

          // text
          if (isTextBlock(block)) {
            const { properties } = block.value;

            if (properties) {
              toRender.push(textBlock(properties.title, false, id));
            }

            return toRender;
          }

          // header
          if (isHeaderBlock(block)) {
            const { type } = block.value;
            const renderHeading = (type: HeadingProps['element']) => {
              if (isHeaderBlock(block)) {
                toRender.push(
                  <Heading key={id} element={type}>
                    {textBlock(block.value.properties.title, true, id)}
                  </Heading>,
                );
              }
            };

            switch (type) {
              case 'header':
                renderHeading('h1');
                break;
              case 'sub_header':
                renderHeading('h2');
                break;
              case 'sub_sub_header':
                renderHeading('h3');
                break;
            }

            return toRender;
          }

          // image
          if (isImageContent(block)) {
            const maxWidth = 600;
            const captionBlock = block.value.properties.caption
              ? textBlock(
                  block.value.properties.caption,
                  false,
                  `${id}-caption`,
                )
              : undefined;

            if (block.value.format) {
              const { block_width, block_aspect_ratio } = block.value.format;
              const blockWidth = block_width < maxWidth ? block_width : 600;
              const blockHeight = blockWidth * block_aspect_ratio;

              /**
               * Due to a next/image bug, GIF becomes larger after optimization.
               * Here, we unoptimize the image if it's a GIF
               * (Issue: https://github.com/vercel/next.js/issues/19443)
               */
              const isGif = (block.value.properties
                .source[0][0] as string).endsWith('.gif');

              toRender.push(
                <div style={{ textAlign: 'center' }} key={id}>
                  <figure>
                    <Image
                      src={block.value.source}
                      width={blockWidth}
                      height={blockHeight}
                      unoptimized={isGif}
                      className="asset-without-wrapper object-contain"
                    />
                    {captionBlock && <figcaption>{captionBlock}</figcaption>}
                  </figure>
                </div>,
              );
            } else {
              toRender.push(
                <div style={{ textAlign: 'center' }} key={id}>
                  <figure>
                    <img
                      src={block.value.source}
                      loading="lazy"
                      className="asset-without-wrapper"
                    />
                    {captionBlock && <figcaption>{captionBlock}</figcaption>}
                  </figure>
                </div>,
              );
            }

            return toRender;
          }

          // video
          if (isVideoContent(block)) {
            const { format } = block.value;
            const { block_width } = format;
            const maxWidth = 600;
            const blockWidth = block_width < maxWidth ? block_width : 600;

            const child = (
              <video
                key={id}
                src={block.value.source}
                controls
                loop
                muted
                autoPlay
                width={blockWidth}
                className="asset-without-wrapper"
              />
            );

            toRender.push(child);
            return toRender;
          }

          // embed
          if (isEmbedBlock(block)) {
            const child = (
              <iframe
                src={block.value.format.display_source}
                key={id}
                className="asset-without-wrapper"
              />
            );

            toRender.push(child);
            return toRender;
          }

          // code
          if (isCodeBlock(block)) {
            const { properties } = block.value;

            const content = properties.title[0][0];
            const language = properties.language[0][0];

            if (language === 'LiveScript') {
              // this requires the DOM for now
              toRender.push(
                <ReactJSXParser
                  key={id}
                  jsx={content}
                  components={DynamicComponent}
                  componentsOnly={false}
                  renderInpost={false}
                  allowUnknownElements={true}
                  blacklistedTags={['script', 'style']}
                />,
              );
            } else {
              toRender.push(
                <DynamicComponent.Code
                  key={id}
                  language={(language as string) || ''}
                >
                  {content}
                </DynamicComponent.Code>,
              );
            }

            return toRender;
          }

          // callout
          if (isCalloutBlock(block)) {
            const { properties, format } = block.value;

            toRender.push(
              <div className="callout" key={id}>
                {format.page_icon && <div>{format.page_icon}</div>}
                <div className="text">
                  {textBlock(properties.title, true, id)}
                </div>
              </div>,
            );

            return toRender;
          }

          // tweet
          if (isTweetContent(block)) {
            const { properties } = block.value;

            if (properties.html) {
              toRender.push(
                <div
                  dangerouslySetInnerHTML={{ __html: properties.html }}
                  key={id}
                />,
              );
            }

            return toRender;
          }

          if (
            process.env.NODE_ENV !== 'production' &&
            !listTypes.has(block.value.type)
          ) {
            console.log('unknown type:', block.value.type);
          }

          return toRender;
        })}
      </article>
    </Page>
  );
};

export default PostEntry;
