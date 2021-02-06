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
    <pre tabIndex={0} className="relative">
      <span className="absolute inline-block top-0 right-0 px-2 leading-6 uppercase rounded-sm bg-gray-600 text-white">
        {language}
      </span>
      <code
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(props.children, grammar, language),
        }}
      />
    </pre>
  );
};

export default Code;
