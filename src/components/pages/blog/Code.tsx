import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

const Code: React.FC<{
  children?: string;
  className?: string;
}> = props => {
  const language = props.className.replace(/language-/, '') ?? 'javascript';
  const grammar =
    Prism.languages[language.toLowerCase()] || Prism.languages.javascript;

  return (
    <code
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(props.children, grammar, language),
      }}
    />
  );
};

export default Code;
