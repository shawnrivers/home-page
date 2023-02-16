import { QuitPreviewButton } from '@/components/PreviewStatus/QuitPreviewButton';
import { cn } from '@/utils/classNames';
import { previewData } from 'next/headers';

export const PreviewStatus: React.FC<{ className?: string }> = ({
  className,
}) => {
  const data = previewData();
  const isPreviewMode = !!data;

  if (!isPreviewMode) {
    return null;
  }

  return (
    <span
      className={cn(
        'fixed bottom-2 right-8 flex items-center gap-2 rounded border-2 border-gray-800 bg-gray-200 px-2 py-1 font-bold dark:border-white dark:bg-gray-700',
        className,
      )}
    >
      Preview Mode
      <QuitPreviewButton />
    </span>
  );
};
