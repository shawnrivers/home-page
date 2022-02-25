import { joinClassNames } from 'app/utils/class';

const RoundDot: React.FC<{ isHighlighted: boolean }> = props => {
  return (
    <div
      className={`absolute box-border border-zinc-200 dark:border-zinc-700 ${
        props.isHighlighted ? 'bg-red-400' : 'bg-zinc-400'
      }`}
      style={{
        width: '18px',
        height: '18px',
        borderWidth: '4px',
        borderRadius: '50%',
        top: '0',
        left: '-8px',
      }}
    />
  );
};

type BioListCardProps = {
  className?: string;
  heading: string;
  items: {
    text: string;
    isHighlighted: boolean;
  }[];
};

export const BioListCard: React.FC<BioListCardProps> = props => {
  const itemsCount = props.items.length;

  return (
    <article
      className={joinClassNames(
        'sheet inline-flex min-w-2xs max-w-xs flex-col items-center px-8 pt-4 pb-2',
        props.className,
      )}
    >
      <h3 className="text-xl font-bold uppercase">{props.heading}</h3>
      <ul className="mt-4">
        {props.items.map((item, index) => (
          <li key={item.text} className="relative">
            <RoundDot isHighlighted={item.isHighlighted} />
            <div
              className={joinClassNames(
                'border-l-2 pb-4 pl-4',
                index < itemsCount - 1
                  ? 'border-zinc-400'
                  : 'border-zinc-200 dark:border-zinc-700',
              )}
            >
              <p className="whitespace-pre-wrap text-sm">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};
