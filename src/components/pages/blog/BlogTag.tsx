import * as React from 'react';

type BlogTagProps = { text: string } & React.HTMLAttributes<HTMLSpanElement>;

export const BlogTag: React.FC<BlogTagProps> = props => {
  const { text, ...restProps } = props;

  switch (text) {
    case 'React':
      return (
        <span className="blog-tag text-white bg-react-default" {...restProps}>
          {text}
        </span>
      );
    case 'CSS':
      return (
        <span className="blog-tag text-white bg-css-default" {...restProps}>
          {text}
        </span>
      );
    case 'Draft':
      return (
        <span
          className="blog-tag text-white bg-draft-default dark:text-draft-default dark:bg-gray-200"
          {...restProps}
        >
          {text}
        </span>
      );

    default:
      return null;
  }
};
