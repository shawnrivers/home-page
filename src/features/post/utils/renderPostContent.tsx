import type React from 'react';
import { Block } from '@/utils/notion/api/fetchBlocks';
import type { fetchPostImages } from '@/features/post/utils/fetchPostImages';
import { cn } from '@/utils/classNames';
import type { RichText } from '@/utils/notion/schema';
import { BlogImage } from '@/app/blog/components/BlogImage';
import { convertRichTextToPlainText } from '@/utils/notion/utils';
import Prism from 'prismjs';
import slugify from 'slugify';
import { Fragment } from 'react';

type Images = Awaited<ReturnType<typeof fetchPostImages>>;

export const renderPostContent = ({
  blocks,
  images,
}: {
  blocks: Block[];
  images: Images;
}) => {
  let listBuffer: React.ReactNode[] = [];

  return blocks.map((block, i) => (
    <Fragment key={block.id}>
      {renderBlock({
        block,
        nextBlock: blocks[i + 1],
        images,
        listBuffer,
      })}
    </Fragment>
  ));
};

const renderBlock = ({
  block,
  nextBlock,
  images,
  listBuffer,
}: {
  block: Block;
  nextBlock: Block | undefined;
  images: Images;
  listBuffer: React.ReactNode[];
}) => {
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
        listBuffer.splice(0, listBuffer.length);
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
          <span className="absolute right-0 top-0 inline-block rounded-sm rounded-tr-md bg-gray-600 px-2 py-1 text-xs uppercase leading-none text-white">
            {language}
          </span>
          <pre
            tabIndex={0}
            className="rounded-md bg-gray-800 !py-6 !leading-normal"
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
      const image = images.find(image => image?.public_id.includes(block.id));
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
      // @ts-expect-error Logging unknown block types on runtime.
      console.error(`Unknown block type ${block.type}`);
      return null;
    }
  }
};

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
            'rounded bg-gray-200 px-1.5 py-0.5 font-mono text-gray-800 before:content-none after:content-none dark:bg-gray-700 dark:text-gray-100',
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
