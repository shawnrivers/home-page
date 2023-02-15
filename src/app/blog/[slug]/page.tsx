import { BlogTag } from '@/app/blog/components/BlogTag';
import { getCoverImageId } from '@/app/blog/utils/cover';
import { BackToTop } from '@/app/blog/[slug]/components/BackToTop';
import { BlogImage } from '@/app/blog/components/BlogImage';
import {
  TableOfContent,
  TableOfContentMenu,
} from '@/app/blog/[slug]/components/TableOfContentMenu';
import { getBlogData } from '@/app/blog/[slug]/utils/getBlogData';
import { cn } from '@/utils/classNames';
import { Block } from '@/utils/notion/api/fetchBlocks';
import { RichText } from '@/utils/notion/schema';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import { notFound } from 'next/navigation';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { Fragment } from 'react';
import slugify from 'slugify';

export const revalidate = 3600;

export type BlogPageProps = { params: { slug: string } };

export default async function Blog({ params }: BlogPageProps) {
  const { slug } = params;
  const blog = await getBlogData(slug);
  if (!blog) {
    notFound();
  }
  const { last_edited_time, properties, blocks } = blog;

  const title = convertRichTextToPlainText(properties.Page.title);

  const coverImage = findImage(getCoverImageId(title), blog.images);

  return (
    <>
      <div className="mx-auto flex items-start justify-center gap-4">
        <article className="prose prose-zinc relative w-full break-words dark:prose-invert lg:prose-lg">
          <div className="mb-8">
            <time
              dateTime={properties.Date.date.start}
              className="mb-2 block text-gray-500 dark:text-gray-400"
            >
              {formateDate(properties.Date.date.start)}
            </time>
            {properties.Tags.multi_select.length > 0 && (
              <div className="mb-3 space-x-2">
                {properties.Tags.multi_select.map(tag => (
                  <BlogTag key={tag.name} name={tag.name} color={tag.color} />
                ))}
              </div>
            )}
            <h1>{convertRichTextToPlainText(properties.Page.title)}</h1>
            {coverImage && (
              <BlogImage
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
          <div>
            {blocks.map((block, i) => (
              <Fragment key={block.id}>
                {renderBlock({
                  block,
                  nextBlock: blocks[i + 1],
                  images: blog.images,
                })}
              </Fragment>
            ))}
          </div>
          <time
            dateTime={last_edited_time}
            className="mt-12 block italic text-gray-500 dark:text-gray-400"
          >
            Updated on {formateDate(last_edited_time)}
          </time>
          <TableOfContentMenu
            content={getTableOfContent(blocks)}
            className="not-prose"
          />
          <BackToTop />
        </article>
      </div>
    </>
  );
}

function formateDate(date: string) {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function renderRichText(richText: RichText): React.ReactNode {
  return richText.map((value, i) => {
    const {
      annotations: { bold, code, italic, strikethrough, underline },
      text,
    } = value;

    const Component = code ? 'code' : 'span';

    return (
      <Component
        key={i}
        className={cn(
          bold && 'font-bold',
          code &&
            'rounded bg-gray-200 py-0.5 px-1.5 font-mono text-gray-800 before:content-none after:content-none dark:bg-gray-700 dark:text-gray-100',
          italic && 'italic',
          strikethrough && 'line-through',
          underline && 'underline',
        )}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </Component>
    );
  });
}

function getTableOfContent(blocks: Block[]): TableOfContent[] {
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

type Images = Exclude<
  Awaited<ReturnType<typeof getBlogData>>,
  undefined
>['images'];

function findImage(fileName: string, images: Images) {
  return images.find(image => image?.public_id.includes(fileName));
}

let listBuffer: React.ReactNode[] = [];

function renderBlock(params: {
  block: Block;
  nextBlock: Block | undefined;
  images: Images;
}) {
  const { block, nextBlock, images } = params;

  switch (block.type) {
    case 'paragraph': {
      return <p>{renderRichText(block.paragraph.rich_text)}</p>;
    }
    case 'heading_1': {
      return (
        <h1 id={slugify(convertRichTextToPlainText(block.heading_1.rich_text))}>
          {renderRichText(block.heading_1.rich_text)}
        </h1>
      );
    }
    case 'heading_2': {
      return (
        <h2 id={slugify(convertRichTextToPlainText(block.heading_2.rich_text))}>
          {renderRichText(block.heading_2.rich_text)}
        </h2>
      );
    }
    case 'heading_3': {
      return (
        <h3 id={slugify(convertRichTextToPlainText(block.heading_3.rich_text))}>
          {renderRichText(block.heading_3.rich_text)}
        </h3>
      );
    }
    case 'bulleted_list_item':
    case 'numbered_list_item': {
      const isLast = nextBlock?.type !== block.type;
      const itemElement = (
        <li key={block.id}>
          {renderRichText(
            block.type === 'bulleted_list_item'
              ? block.bulleted_list_item.rich_text
              : block.numbered_list_item.rich_text,
          )}
        </li>
      );

      if (isLast) {
        const Wrapper = block.type === 'bulleted_list_item' ? 'ul' : 'ol';
        const list = [...listBuffer, itemElement];
        listBuffer = [];
        return <Wrapper>{list}</Wrapper>;
      } else {
        listBuffer.push(itemElement);
        return null;
      }
    }
    case 'quote': {
      return <blockquote>{renderRichText(block.quote.rich_text)}</blockquote>;
    }
    case 'code': {
      const { rich_text, language } = block.code;
      const highlightLanguage =
        language === 'javascript'
          ? 'jsx'
          : language === 'typescript'
          ? 'tsx'
          : language;

      return (
        <div className="relative">
          <span className="absolute top-0 right-0 inline-block rounded-sm rounded-tr-md bg-gray-600 px-2 py-1 text-xs uppercase leading-none text-white">
            {language}
          </span>
          <pre
            tabIndex={0}
            className="rounded-md bg-gray-800 !py-6 !leading-tight"
          >
            <code
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  convertRichTextToPlainText(rich_text),
                  Prism.languages[highlightLanguage],
                  highlightLanguage,
                ),
              }}
            />
          </pre>
        </div>
      );
    }
    case 'divider': {
      return <hr className="border-t-2" />;
    }
    case 'image': {
      const image = findImage(block.id, images);
      if (!image) {
        return null;
      }

      return (
        <BlogImage
          priority
          publicId={image.public_id}
          width={600}
          originalWidth={image.width}
          originalHeight={image.height}
          alt=""
          sizes="800px"
          className="mx-auto h-auto max-w-full rounded bg-white object-contain dark:bg-gray-900"
        />
      );
    }
    default: {
      console.error('Unknown block type');
      return null;
    }
  }
}
