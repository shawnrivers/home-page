import {
  TableOfContents,
  Toc,
} from '@/app/memo/[slug]/components/TableOfContents';
import { PostImage } from '@/app/memo/components/PostImage';
import { PostTag } from '@/app/memo/components/PostTag';
import { getPostBySlug } from '@/app/memo/utils/getPostBySlug';
import { getPosts } from '@/app/memo/utils/getPosts';
import { renderPostContent } from '@/features/post/utils/renderPostContent';
import { getImageUrl } from '@/utils/cloudinary';
import { formatDate } from '@/utils/date';
import { sharedMetadata } from '@/utils/meta';
import { Block } from '@/utils/notion/api/fetchBlocks';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import slugify from 'slugify';

export const revalidate = 3600;
export const dynamicParams = true;

interface MemoPageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<
  MemoPageProps['params'][]
> {
  const posts = await getPosts({ ignoreDraft: true });
  return (
    posts?.map(post => ({
      slug: convertRichTextToPlainText(post.properties.Slug.rich_text),
    })) ?? []
  );
}

export async function generateMetadata({
  params,
}: MemoPageProps): Promise<Metadata> {
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

export default async function Post({ params }: MemoPageProps) {
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
            className="sticky top-4 order-last hidden lg:block"
            tableOfContents={tableOfContents}
          />
        )}
        <article className="prose prose-gray relative w-full break-words lg:prose-lg dark:prose-invert">
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
                className="mx-auto h-auto w-full rounded bg-white object-contain dark:bg-gray-900"
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

function getTableOfContent(blocks: Block[]): Toc[] {
  return blocks
    .filter(
      block =>
        block.type === 'heading_1' ||
        block.type === 'heading_2' ||
        block.type === 'heading_3',
    )
    .map(block => {
      let text = '';
      let level = 1;
      switch (block.type) {
        case 'heading_1':
          text = convertRichTextToPlainText(block.heading_1.rich_text);
          level = 1;
          break;
        case 'heading_2':
          text = convertRichTextToPlainText(block.heading_2.rich_text);
          level = 2;
          break;
        case 'heading_3':
          text = convertRichTextToPlainText(block.heading_3.rich_text);
          level = 3;
          break;
        default:
          break;
      }
      return { text, url: `#${slugify(text)}`, level };
    });
}
