import { BlogMeta } from 'app/pages/blog/meta';
import { getDateString } from 'app/utils/date';
import { getBlogOgImageUrl } from 'app/utils/url';
import { HeaderProps } from 'app/components/shared/Header';
import { Page } from 'app/components/shared/Page';
import { BlogTag } from './BlogTag';
import { TableOfContentIcon } from 'app/components/icons/TableOfContentIcon';
import { Menu, Transition } from '@headlessui/react';
import {
  Children,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { convertNodeToString } from 'app/utils/string';
import { joinClassNames } from 'app/utils/class';
import { ArrowRightIcon } from 'app/components/icons/ArrowRightIcon';
import { useScrollDirection } from 'app/hooks/useScrollDirection';

function getBlogHead(blogMeta: BlogMeta): HeaderProps {
  return {
    titlePre: blogMeta.title,
    ogImageUrl: blogMeta.image
      ? getBlogOgImageUrl(blogMeta.image.url)
      : undefined,
    description: blogMeta.description,
  };
}

type TableOfContent = { text: string; url: string; level: number };

const TableOfContentMenu: React.FC<{
  content: TableOfContent[];
  className?: string;
}> = props => {
  const { content, className } = props;
  const scrollDirection = useScrollDirection();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (scrollDirection === 'up') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [scrollDirection]);

  return (
    <Menu
      as="div"
      className={joinClassNames(
        `fixed top-4 z-10 transition-all duration-300 ${
          visible ? 'opacity-100' : '-top-12 opacity-0'
        }`,
        className,
      )}
    >
      <Menu.Button
        aria-hidden={visible ? 'false' : 'true'}
        tabIndex={visible ? 0 : -1}
        className="relative inline-flex items-center rounded-lg border-2 border-zinc-500 bg-zinc-100 py-1 pl-2 pr-3 text-zinc-800 shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-500 focus-visible:ring-opacity-70 focus-visible:ring-offset-2 dark:border-zinc-100 dark:bg-zinc-800 dark:text-white mouse-hover:hover:bg-zinc-200 dark:mouse-hover:hover:bg-zinc-700"
      >
        <TableOfContentIcon className="mr-2 h-8 w-8 fill-current" />
        <span className="text-base">Table of Content</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="nav"
          className="absolute left-0 mt-1 flex w-[300px] max-w-max origin-top-right flex-col space-y-1 overflow-hidden rounded-lg border-2 border-zinc-500 bg-zinc-100 p-2 shadow-lg focus-visible:outline-none dark:border-zinc-100 dark:bg-zinc-800"
        >
          {content.map(item => (
            <Menu.Item key={item.text}>
              {({ active }) => (
                <a
                  href={item.url}
                  className={`rounded px-2 text-base leading-[1.1] no-underline mouse-hover:hover:text-zinc-900 dark:mouse-hover:hover:text-white ${
                    item.level === 3
                      ? 'ml-4 py-0.5 text-sm text-zinc-600 dark:text-zinc-400 mouse-hover:hover:text-zinc-600 dark:mouse-hover:hover:text-zinc-400'
                      : 'py-1'
                  } ${active ? 'ring-4 ring-zinc-400 ring-opacity-70' : ''}`}
                  onClick={() => setTimeout(() => setVisible(false), 100)}
                >
                  {item.text}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const BackToTop: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (scrollDirection === 'up') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [scrollDirection]);

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <button
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-4 right-4 z-10 rounded-lg border-2 border-zinc-500 bg-zinc-100 p-2 text-zinc-800 shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-500 focus-visible:ring-opacity-70 focus-visible:ring-offset-2 dark:border-zinc-100 dark:bg-zinc-800 dark:text-white mouse-hover:hover:bg-zinc-200 dark:mouse-hover:hover:bg-zinc-700 ${
        visible ? 'opacity-100' : '-bottom-12 opacity-0'
      }`}
      aria-label="Back to top"
      onClick={backToTop}
    >
      <ArrowRightIcon className="h-6 w-6 -rotate-90 fill-current" />
    </button>
  );
};

export const BlogWrapper: React.FC<{
  children?: React.ReactNode;
  meta: BlogMeta;
}> = props => {
  const { meta, children } = props;
  const { title, date, tags, published } = meta;

  const content = useMemo<TableOfContent[]>(() => {
    return Children.toArray(children)
      .filter((child: React.ReactNode) => {
        if (typeof child === 'object' && 'props' in child) {
          return (
            child.props.mdxType && ['h2', 'h3'].includes(child.props.mdxType)
          );
        }
        return false;
      })
      .map((child: React.ReactNode) => {
        const text = convertNodeToString(child);

        return {
          text,
          url: `#${text}`,
          level:
            (typeof child === 'object' &&
              'props' in child &&
              child.props.mdxType &&
              parseInt(child.props.mdxType.replace('h', ''), 10)) ??
            0,
        };
      });
  }, [children]);

  return (
    <Page {...getBlogHead(meta)}>
      <article className="prose prose-zinc mx-auto break-words px-4 dark:prose-invert lg:prose-lg">
        <div className="mb-8">
          <time
            dateTime={date}
            className="mb-2 block text-base text-zinc-500 dark:text-zinc-400"
          >
            {getDateString(date)}
          </time>
          <h1>{title}</h1>
          {tags.length > 0 && (
            <div className="mt-3 space-x-2">
              {!published && <BlogTag text="draft" />}
              {tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
        <TableOfContentMenu content={content} className="not-prose" />
        <div className="post-body">{children}</div>
        <BackToTop />
      </article>
    </Page>
  );
};
