import * as React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

const Code: React.FC<{
  children?: React.ReactNode;
  language?: string;
}> = props => {
  const { children, language = 'javascript' } = props;

  return (
    <code
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(
          children,
          Prism.languages[language.toLowerCase()] || Prism.languages.javascript,
        ),
      }}
    />
  );
};

export default Code;
