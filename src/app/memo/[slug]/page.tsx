import {
  TableOfContents,
  type Toc,
} from '@/app/memo/[slug]/_components/TableOfContents';
import { PostImage } from '@/app/memo/_components/PostImage';
import { PostTag } from '@/app/memo/_components/PostTag';
import { getPostBySlug } from '@/app/memo/_utils/getPostBySlug';
import { getPosts } from '@/app/memo/_utils/getPosts';
import { renderPostContent } from '@/app/memo/_utils/renderPostContent';
import { getImageUrl } from '@/libs/api/cloudinary';
import { formatDate } from '@/libs/utils/date';
import { sharedMetadata } from '@/libs/utils/meta';
import type { Block } from '@/libs/api/notion/api/fetchBlocks';
import { convertRichTextToPlainText } from '@/libs/api/notion/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSlugFromText } from '@/libs/utils/string';

interface MemoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<
  Awaited<MemoPageProps['params']>[]
> {
  const posts = await getPosts({ ignoreDraft: true });
  return (
    posts?.map(post => ({
      slug: convertRichTextToPlainText(post.properties.Slug.rich_text),
    })) ?? []
  );
}

export async function generateMetadata(
  props: MemoPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      ...sharedMetadata,
      openGraph: {
        type: 'article',
        authors: 'https://usho.dev',
      },
    };
  }

  const { created_time, last_edited_time, properties, coverImage } = post;
  const postTitle = convertRichTextToPlainText(properties.Page.title);
  const title = `${postTitle} | Usho`;
  const url = `https://usho.dev/memo/${slug}`;

  return {
    ...sharedMetadata,
    title,
    openGraph: {
      type: 'article',
      url,
      title,
      authors: 'https://usho.dev',
      publishedTime: created_time,
      modifiedTime: last_edited_time,
      images: coverImage
        ? {
            url: getImageUrl(coverImage.public_id, {
              width: 1280,
              height: 800,
              quality: 80,
            }),
            type: 'image/jpeg',
            width: 1280,
            height: 800,
            alt: title,
          }
        : undefined,
    },
  };
}

export default async function Post(props: MemoPageProps) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const { properties, coverImage, blocks, images } = post;
  const title = convertRichTextToPlainText(properties.Page.title);
  const tableOfContents = getTableOfContent(blocks);

  return (
    <>
      <div className="isolate mx-auto flex items-start justify-center gap-4">
        {tableOfContents.length > 0 && (
          <TableOfContents
            className="sticky top-4 max-h-[calc(100dvh-2rem)] order-last hidden lg:block"
            tableOfContents={tableOfContents}
          />
        )}
        <article className="prose prose-gray relative w-full break-words lg:prose-lg dark:prose-invert prose-figcaption:mt-[0.5em] prose-pre:m-0 prose-h1:font-serif prose-h2:font-serif prose-h3:font-serif">
          <div className="mb-8">
            <time
              dateTime={properties.Date.date.start}
              className="mb-2 block text-gray-500 dark:text-gray-400"
            >
              {formatDate(properties.Date.date.start)}
            </time>
            {properties.Tags.multi_select.length > 0 && (
              <div className="mb-3 space-x-2">
                {properties.Tags.multi_select.map(tag => (
                  <PostTag key={tag.name} name={tag.name} color={tag.color} />
                ))}
              </div>
            )}
            <h1>{title}</h1>
            {coverImage && (
              <PostImage
                priority
                publicId={coverImage.public_id}
                originalWidth={coverImage.width}
                originalHeight={coverImage.height}
                alt=""
                sizes="800px"
                className="mx-auto h-auto w-full rounded-sm bg-white object-contain dark:bg-gray-900"
              />
            )}
          </div>
          <div>{renderPostContent({ blocks, images })}</div>
          {properties.UpdatedAt.date && (
            <time
              dateTime={properties.UpdatedAt.date.start}
              className="mt-12 block italic text-gray-500 dark:text-gray-400"
            >
              Updated on {formatDate(properties.UpdatedAt.date.start)}
            </time>
          )}
        </article>
      </div>
    </>
  );
}

type HeadingsBuffer = {
  level: 1 | 2 | 3;
  text: string;
}[];

function getTableOfContent(blocks: Block[]): Toc[] {
  const headingsBuffer: HeadingsBuffer = [];

  return blocks
    .filter(
      block =>
        block.type === 'heading_1' ||
        block.type === 'heading_2' ||
        block.type === 'heading_3',
    )
    .map(block => {
      switch (block.type) {
        case 'heading_1': {
          const text = convertRichTextToPlainText(block.heading_1.rich_text);
          const level = 1;
          headingsBuffer.push({ level, text });
          return {
            text,
            id: generateSlugFromText(text),
            level,
          };
        }
        case 'heading_2': {
          const text = convertRichTextToPlainText(block.heading_2.rich_text);
          const level = 2;
          headingsBuffer.push({ level, text });
          return {
            text,
            id: generateSlugFromText(text),
            level,
          };
        }
        case 'heading_3': {
          const text = convertRichTextToPlainText(block.heading_3.rich_text);
          const level = 3;
          const nearestHeading2 = headingsBuffer
            .slice()
            .reverse()
            .find(heading => heading.level === 2);
          headingsBuffer.push({ level, text });
          return {
            text,
            id: generateSlugFromText(nearestHeading2?.text, text),
            level,
          };
        }
      }
    });
}
