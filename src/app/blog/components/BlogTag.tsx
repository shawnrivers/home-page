import { getTagColor } from '@/app/blog/utils/tags';
import { cn } from '@/utils/classNames';

type BlogTagProps = {
  name: string;
  color: string;
};

export const BlogTag: React.FC<BlogTagProps> = ({ name, color }) => {
  return (
    <span
      className={cn(
        'inline-block rounded-3xl px-2.5 py-1.5 font-mono text-sm',
        getTagColor(color),
      )}
    >
      {name}
    </span>
  );
};
