import * as React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

const Code: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = props => {
  const language = props.className.replace(/language-/, '') ?? 'javascript';

  return (
    <code
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(
          props.children,
          Prism.languages[language.toLowerCase()] || Prism.languages.javascript,
        ),
      }}
    />
  );
};

export default Code;
