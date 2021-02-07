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
    <div className="relative">
      <span className="absolute inline-block top-0 right-0 px-2 text-sm uppercase rounded-sm bg-gray-600 text-white">
        {language}
      </span>
      <pre tabIndex={0}>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(props.children, grammar, language),
          }}
        />
      </pre>
    </div>
  );
};

export default Code;
