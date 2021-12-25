import { Tag } from 'pages/blog/meta';

type BlogTagProps = {
  text: Tag | 'draft';
} & React.HTMLAttributes<HTMLSpanElement>;

export const BlogTag: React.FC<BlogTagProps> = props => {
  const { text, ...restProps } = props;

  switch (text) {
    case 'react':
      return (
        <span className="blog-tag text-white bg-react-dark" {...restProps}>
          {text}
        </span>
      );
    case 'css':
      return (
        <span className="blog-tag text-white bg-css-dark" {...restProps}>
          {text}
        </span>
      );
    case 'html':
      return (
        <span className="blog-tag text-white bg-html-dark" {...restProps}>
          {text}
        </span>
      );
    case 'a11y':
      return (
        <span className="blog-tag text-white bg-a11y-dark" {...restProps}>
          {text}
        </span>
      );
    case 'draft':
      return (
        <span
          className="blog-tag text-white bg-draft-default dark:text-draft-default dark:bg-zinc-200"
          {...restProps}
        >
          {text}
        </span>
      );
    default:
      return null;
  }
};
