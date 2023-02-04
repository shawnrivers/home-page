import { BlogTag } from '@/app/blog/components/BlogTag';
import { cn } from '@/utils/classNames';
import { Block, fetchBlocks } from '@/utils/notion/api/fetchBlocks';
import { fetchPosts } from '@/utils/notion/api/fetchPosts';
import { RichText } from '@/utils/notion/schema';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

export default async function Blog({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { last_edited_time, properties, blocks } = await getData(slug);

  return (
    <>
      <div className="mx-auto flex items-start justify-center gap-4">
        <article className="prose prose-zinc w-full break-words px-4 dark:prose-invert lg:prose-lg">
          <div className="mb-8">
            <time
              dateTime={properties.Date.date.start}
              className="mb-2 block text-gray-500 dark:text-gray-400"
            >
              {formateDate(properties.Date.date.start)}
            </time>
            <h1>
              {properties.Page.title.reduce(
                (prev, curr) => `${prev}${curr.plain_text}`,
                '',
              )}
            </h1>
            {properties.Tags.multi_select.length > 0 && (
              <div className="mt-3 space-x-2">
                {properties.Tags.multi_select.map(tag => (
                  <BlogTag key={tag.name} name={tag.name} color={tag.color} />
                ))}
              </div>
            )}
          </div>
          <div>
            {blocks.map((block, i) => (
              <Fragment key={block.id}>
                {renderBlock({ block, nextBlock: blocks[i + 1] })}
              </Fragment>
            ))}
          </div>
          <time
            dateTime={last_edited_time}
            className="mt-12 block italic text-gray-500 dark:text-gray-400"
          >
            Updated on {formateDate(last_edited_time)}
          </time>
          {/* <TableOfContentMenu content={content} className="not-prose" />
          <div className="post-body">{children}</div>
          <BackToTop /> */}
        </article>
      </div>
      {/* <pre className="whitespace-pre-wrap break-all">
        <code>{JSON.stringify(blocks, null, 2)}</code>
      </pre> */}
    </>
  );
}

async function getData(slug: string) {
  const posts = await fetchPosts();
  const post = (posts ?? []).find(
    blog => blog.properties.Slug.rich_text[0].plain_text === slug,
  );
  if (post == undefined) {
    notFound();
  }
  const blocks = await fetchBlocks({
    block_id: post.id,
  });

  return { ...post, blocks };
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

let listBuffer: React.ReactNode[] = [];

function renderBlock(params: {
  block: Block;
  nextBlock: Block | undefined;
}): React.ReactNode {
  const { block, nextBlock } = params;

  switch (block.type) {
    case 'paragraph': {
      return <p>{renderRichText(block.paragraph.rich_text)}</p>;
    }
    case 'heading_1': {
      return <h1>{renderRichText(block.heading_1.rich_text)}</h1>;
    }
    case 'heading_2': {
      return <h2>{renderRichText(block.heading_2.rich_text)}</h2>;
    }
    case 'heading_3': {
      return <h3>{renderRichText(block.heading_3.rich_text)}</h3>;
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
                  rich_text.reduce((prev, curr) => {
                    return `${prev}${curr.plain_text}`;
                  }, ''),
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
    default: {
      console.error('Unknown block type:', block.type);
      return null;
    }
  }
}
