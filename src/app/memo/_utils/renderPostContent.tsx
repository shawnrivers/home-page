import type React from 'react';
import { Fragment } from 'react';
import { PostImage } from '@/app/memo/_components/PostImage';
import type { fetchPostImages } from '@/app/memo/_utils/fetchPostImages';
import { highlightCodeToHtml } from '@/app/memo/_utils/highlighter';
import type { Block } from '@/libs/api/notion/api/fetchBlocks';
import type { RichText } from '@/libs/api/notion/schema/RichTextSchema';
import { convertRichTextToPlainText } from '@/libs/api/notion/utils';
import { cn } from '@/libs/utils/classNames';
import { generateSlugFromText } from '@/libs/utils/string';

type Images = Awaited<ReturnType<typeof fetchPostImages>>;

type HeadingsBuffer = {
  level: 1 | 2 | 3;
  text: string;
}[];

export function renderPostContent({
  blocks,
  images,
}: {
  blocks: Block[];
  images: Images;
}) {
  const listBuffer: React.ReactNode[] = [];
  const headingsBuffer: HeadingsBuffer = [];

  return blocks.map((block, i) => (
    <Fragment key={block.id}>
      {renderBlock({
        block,
        nextBlock: blocks[i + 1],
        images,
        listBuffer,
        headingsBuffer,
      })}
    </Fragment>
  ));
}

function renderBlock({
  block,
  nextBlock,
  images,
  listBuffer,
  headingsBuffer,
}: {
  block: Block;
  nextBlock: Block | undefined;
  images: Images;
  listBuffer: React.ReactNode[];
  headingsBuffer: HeadingsBuffer;
}) {
  switch (block.type) {
    case 'paragraph': {
      return <p>{renderRichText(block.paragraph.rich_text)}</p>;
    }
    case 'heading_1': {
      const text = convertRichTextToPlainText(block.heading_1.rich_text);
      headingsBuffer.push({ level: 1, text });
      return (
        <h1 id={generateSlugFromText(text)}>
          {renderRichText(block.heading_1.rich_text)}
        </h1>
      );
    }
    case 'heading_2': {
      const text = convertRichTextToPlainText(block.heading_2.rich_text);
      headingsBuffer.push({ level: 2, text });
      return (
        <h2 id={generateSlugFromText(text)}>
          {renderRichText(block.heading_2.rich_text)}
        </h2>
      );
    }
    case 'heading_3': {
      const text = convertRichTextToPlainText(block.heading_3.rich_text);
      const nearestHeading2 = headingsBuffer
        .slice()
        .reverse()
        .find(heading => heading.level === 2);
      headingsBuffer.push({ level: 3, text });
      return (
        <h3 id={generateSlugFromText(nearestHeading2?.text, text)}>
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
      }

      listBuffer.push(itemElement);
      return null;
    }
    case 'quote': {
      return <blockquote>{renderRichText(block.quote.rich_text)}</blockquote>;
    }
    case 'code': {
      const { rich_text, language, caption } = block.code;

      return (
        <div className="relative isolate my-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <span className="absolute z-10 right-0 top-0 inline-block font-sans rounded-bl-lg px-2 py-1 text-xs leading-none dark:bg-gray-800 bg-gray-100 text-gray-900 border-l-2 border-b-2 border-gray-200 dark:border-gray-700 dark:text-white">
            {caption.length > 0 ? renderRichText(caption) : language}
          </span>
          <div
            dangerouslySetInnerHTML={{
              __html: highlightCodeToHtml(
                convertRichTextToPlainText(rich_text),
                language,
              ),
            }}
            className="relative z-0 *:my-0 *:py-6"
          />
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

      const imageElement = (
        <PostImage
          preload
          publicId={image.public_id}
          width={768}
          originalWidth={image.width}
          originalHeight={image.height}
          alt=""
          sizes="800px"
          className="mx-auto h-auto max-w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white object-contain dark:bg-gray-900"
        />
      );

      const caption = block.image.caption;

      if (caption.length > 0) {
        return (
          <figure>
            {imageElement}
            <figcaption>{renderRichText(caption)}</figcaption>
          </figure>
        );
      }

      return imageElement;
    }
    default: {
      // @ts-expect-error Logging unknown block types on runtime.
      console.error(`Unknown block type ${block.type}`);
      return null;
    }
  }
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
          code &&
            'rounded-sm bg-gray-200 px-1.5 py-0.5 font-mono [font-weight:inherit] dark:bg-gray-700 before:content-none after:content-none',
          bold && 'font-bold',
          italic && 'italic',
          strikethrough && 'line-through',
          underline && 'underline',
        )}
      >
        {text.link ? (
          <a href={text.link.url} className="text-inherit hover:text-gray-400">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </Component>
    );
  });
}
