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
          className="blog-tag bg-react-dark text-white selection:bg-zinc-500"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'css':
      return (
        <span
          className="blog-tag bg-css-dark text-white selection:bg-zinc-500"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'html':
      return (
        <span
          className="blog-tag bg-html-dark text-white selection:bg-zinc-500"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'a11y':
      return (
        <span
          className="blog-tag bg-a11y-dark text-white selection:bg-zinc-500"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'draft':
      return (
        <span
          className="blog-tag bg-draft-default text-white selection:bg-zinc-500 dark:bg-zinc-200 dark:text-draft-default dark:selection:bg-zinc-400"
          {...restProps}
        >
          {text}
        </span>
      );
    default:
      return null;
  }
};
