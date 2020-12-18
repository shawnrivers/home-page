import Link from 'next/link';
import fetch from 'node-fetch';
import { useRouter } from 'next/router';
import Header from '../../components/header';
import Heading from '../../components/heading';
import components from '../../components/dynamic';
import ReactJSXParser from '@zeit/react-jsx-parser';
import blogStyles from '../../styles/blog.module.css';
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
  const postData = await getPageData(post.id as string);
  post.content = postData.blocks;

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

        value.source = await fetchNotionAsset(
          value.format.display_source,
          value.id,
        );
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
    return <div>Loading...</div>;
  }

  // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index
  if (!post) {
    return (
      <div className={blogStyles.post}>
        <p>
          Woops! didn't find that post, redirecting you back to the blog index
        </p>
      </div>
    );
  }

  return (
    <>
      <Header titlePre={post.Page} />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview?slug=${post.Slug}`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={blogStyles.post}>
        <h1>{post.Page || ''}</h1>
        {post.Date && (
          <div className="posted">Posted: {getDateStr(post.Date)}</div>
        )}

        <hr />

        {(!post.content || post.content.length === 0) && (
          <p>This post has no content</p>
        )}

        {/* Post content */}
        {(post.content || []).map((block, blockIdx) => {
          const { id, type } = block.value;
          const toRender = [];

          // page or divider
          if (block.value.type === 'page' || block.value.type === 'divider') {
            return toRender;
          }

          // list
          if (isListBlock(block)) {
            const { parent_id, properties } = block.value;

            listTagName =
              components[block.value.type === 'bulleted_list' ? 'ul' : 'ol'];
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
                      components.li || 'ul',
                      { key: item.key },
                      item.children,
                      item.nested.length > 0
                        ? React.createElement(
                            components.ul || 'ul',
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
                components.blockquote,
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
              <components.Equation key={id} displayMode={true}>
                {content}
              </components.Equation>,
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
            const renderHeading = (Type: string | React.ComponentType) => {
              if (isHeaderBlock(block)) {
                toRender.push(
                  <Heading key={id}>
                    <Type key={id}>
                      {textBlock(block.value.properties.title, true, id)}
                    </Type>
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
            const { format } = block.value;

            const { block_width, block_aspect_ratio } = format;

            const maxWidth = 600;
            const blockWidth = block_width < maxWidth ? block_width : 600;
            const blockHeight = blockWidth * block_aspect_ratio;

            const child = (
              <div style={{ textAlign: 'center' }} key={id}>
                <Image
                  src={block.value.source}
                  width={blockWidth}
                  height={blockHeight}
                  layout="intrinsic"
                  className={blogStyles.assetWithoutWrapper}
                />
              </div>
            );

            toRender.push(child);

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
                className={blogStyles.assetWithoutWrapper}
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
                className={blogStyles.assetWithoutWrapper}
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
                  components={components}
                  componentsOnly={false}
                  renderInpost={false}
                  allowUnknownElements={true}
                  blacklistedTags={['script', 'style']}
                />,
              );
            } else {
              toRender.push(
                <components.Code key={id} language={(language as string) || ''}>
                  {content}
                </components.Code>,
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
      </div>
    </>
  );
};

export default PostEntry;
