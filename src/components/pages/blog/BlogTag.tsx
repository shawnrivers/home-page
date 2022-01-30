import { Tag } from 'app/pages/blog/meta';

type BlogTagProps = {
  text: Tag | 'draft';
} & React.HTMLAttributes<HTMLSpanElement>;

export const BlogTag: React.FC<BlogTagProps> = props => {
  const { text, ...restProps } = props;

  switch (text) {
    case 'react':
      return (
        <span
          className="blog-tag text-white bg-react-dark selection:bg-zinc-500"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'css':
      return (
        <span
          className="blog-tag text-white bg-css-dark selection:bg-zinc-500"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'html':
      return (
        <span
          className="blog-tag text-white bg-html-dark selection:bg-zinc-500"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'a11y':
      return (
        <span
          className="blog-tag text-white bg-a11y-dark selection:bg-zinc-500"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'draft':
      return (
        <span
          className="blog-tag text-white bg-draft-default selection:bg-zinc-500 dark:text-draft-default dark:bg-zinc-200 dark:selection:bg-zinc-400"
          {...restProps}
        >
          {text}
        </span>
      );
    default:
      return null;
  }
};
