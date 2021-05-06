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
      <span className="absolute inline-block top-0 right-0 px-2 py-0.5 text-sm uppercase rounded-sm bg-gray-600 text-white">
        {language}
      </span>
      {/* When content overflow on the x axis happens, to allow horizontal scroll using the keyboard, we need to make the <pre> element focusable */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
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
