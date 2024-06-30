import { ExitDraftModeButton } from '@/components/DraftModeStatusToast/components/ExitDraftModeButton';
import { cn } from '@/utils/classNames';
import { draftMode } from 'next/headers';

export const DraftStatusToast: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isEnabled } = draftMode();

  if (!isEnabled) {
    return null;
  }

  return (
    <span
      className={cn(
        'fixed bottom-2 left-4 flex items-center gap-2 rounded border-2 border-gray-800 bg-gray-200 px-2 py-1 font-bold dark:border-white dark:bg-gray-700',
        className,
      )}
    >
      Draft Mode
      <ExitDraftModeButton />
    </span>
  );
};
