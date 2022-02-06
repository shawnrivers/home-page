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
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { convertNodeToString } from 'app/utils/string';
import { joinClassNames } from 'app/utils/class';

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
  const prevOffset = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        setScrollDirection(null);
      } else if (scrollY > prevOffset.current) {
        setScrollDirection('down');
      } else if (scrollY < prevOffset.current) {
        setScrollDirection('up');
      }
      prevOffset.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          visible ? '' : '-top-12'
        }`,
        className,
      )}
    >
      <Menu.Button
        aria-hidden={visible ? 'false' : 'true'}
        tabIndex={visible ? 0 : -1}
        className="pl-2 pr-3 py-1 relative inline-flex items-center shadow-lg rounded-lg border-2 border-zinc-500 dark:border-zinc-100 text-zinc-800 dark:text-white bg-zinc-100 dark:bg-zinc-800 mouse-hover:hover:bg-zinc-200 dark:mouse-hover:hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 focus-visible:ring-opacity-70 transition-colors"
      >
        <TableOfContentIcon className="fill-current w-8 h-8 mr-2" />
        <span className="text-base">Table of Content</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="nav"
          className="absolute left-0 mt-2 p-2 max-w-max w-[300px] overflow-hidden flex flex-col origin-top-right bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg border-2 border-zinc-500 dark:border-zinc-100 focus-visible:outline-none"
        >
          {content.map(item => (
            <Menu.Item key={item.text}>
              {({ active }) => (
                <a
                  href={item.url}
                  className={`px-2 text-base leading-tight rounded-md no-underline mouse-hover:hover:text-zinc-900 dark:mouse-hover:hover:text-white ${
                    item.level === 3 ? 'mx-4 py-0.5 text-sm' : 'py-1'
                  } ${active ? 'ring-4 ring-zinc-400 ring-opacity-70' : ''}`}
                  onClick={() => setVisible(false)}
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
      <article className="prose lg:prose-lg prose-zinc dark:prose-invert mx-auto px-4 break-words">
        <div className="mb-8">
          <time
            dateTime={date}
            className="block text-base mb-2 text-zinc-500 dark:text-zinc-400"
          >
            {getDateString(date)}
          </time>
          <h1>{title}</h1>
          {tags.length > 0 && (
            <div className="space-x-2 mt-3">
              {!published && <BlogTag text="draft" />}
              {tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
        <TableOfContentMenu content={content} className="not-prose" />
        <div className="post-body">{children}</div>
      </article>
    </Page>
  );
};
