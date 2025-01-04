import type React from 'react';
import type { Block } from '@/libs/api/notion/api/fetchBlocks';
import type { fetchPostImages } from '@/app/memo/_utils/fetchPostImages';
import { cn } from '@/libs/utils/classNames';
import { PostImage } from '@/app/memo/_components/PostImage';
import { convertRichTextToPlainText } from '@/libs/api/notion/utils';
import Prism from 'prismjs';
import { Fragment } from 'react';
import type { RichText } from '@/libs/api/notion/schema/RichTextSchema';
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
      const highlightLanguage = getPrismLanguage(language);

      return (
        <div className="relative">
          <span className="absolute right-0 top-0 inline-block font-mono rounded-sm rounded-tr-md rounded-bl-md bg-gray-700 px-2 py-1.5 text-xs leading-none text-white selection:bg-gray-500">
            {caption.length > 0 ? renderRichText(caption) : language}
          </span>
          <pre
            // biome-ignore lint/a11y/noNoninteractiveTabindex: Should be focusable for keyboard navigation because it's potentially scrollable
            tabIndex={0}
            className="rounded-md bg-gray-800 !py-6 !leading-normal selection:bg-gray-600"
          >
            <code
              // biome-ignore lint/security/noDangerouslySetInnerHtml: The data source is trusted
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  convertRichTextToPlainText(rich_text),
                  Prism.languages[highlightLanguage] as Prism.Grammar,
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

      const imageElement = (
        <PostImage
          priority
          publicId={image.public_id}
          width={768}
          originalWidth={image.width}
          originalHeight={image.height}
          alt=""
          sizes="800px"
          className="mx-auto h-auto max-w-full rounded bg-white object-contain dark:bg-gray-900"
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
          bold && 'font-bold',
          code &&
            'rounded bg-gray-100 px-1.5 py-0.5 font-mono font-normal text-red-600 before:content-none after:content-none dark:bg-gray-800 dark:text-red-400',
          italic && 'italic',
          strikethrough && 'line-through',
          underline && 'underline',
        )}
      >
        {text.link ? (
          <a href={text.link.url} className="text-inherit font-semibold">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </Component>
    );
  });
}

function getPrismLanguage(lang: string): string {
  switch (lang) {
    case 'javascript':
      return 'jsx';
    case 'typescript':
      return 'tsx';
    case 'html':
      return 'html';
    case 'svg':
      return 'svg';
    case 'css':
      return 'css';
    default:
      return 'markdown';
  }
}
