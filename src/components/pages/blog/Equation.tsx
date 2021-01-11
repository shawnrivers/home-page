import { renderToString, ParseError } from 'katex';

function render(expression: string, displayMode: boolean): string {
  let result: string;
  try {
    result = renderToString(expression, { displayMode: displayMode });
  } catch (e) {
    if (e instanceof ParseError) {
      result = e.message;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.error(e);
    }
  }
  return result;
}

const Equation: React.FC<{
  children?: string;
  displayMode?: boolean;
  key?: string | number;
}> = props => {
  const { children, displayMode = true, key } = props;

  return (
    <span
      key={key}
      dangerouslySetInnerHTML={{
        __html: render(children, displayMode),
      }}
    />
  );
};

export default Equation;
