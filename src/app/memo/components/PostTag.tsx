import { getTagColor } from '@/app/memo/utils/tags';
import { cn } from '@/utils/classNames';

export const PostTag: React.FC<{
  name: string;
  color: string;
}> = ({ name, color }) => {
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
