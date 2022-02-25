import { joinClassNames } from 'app/utils/class';

type BioCardProps = {
  className?: string;
  heading: string;
  text: string;
};

export const BioCard: React.FC<BioCardProps> = props => {
  return (
    <article
      className={joinClassNames(
        'sheet inline-flex min-w-2xs max-w-xs flex-col items-center px-8 py-4 text-center',
        props.className,
      )}
    >
      <h3 className="text-xl font-bold uppercase">{props.heading}</h3>
      <p className="mt-4 text-sm">{props.text}</p>
    </article>
  );
};
