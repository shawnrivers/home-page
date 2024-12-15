import { EnterDraftModeButton } from '@/components/DraftModeStatusToast/components/EnterDraftModeButton';
import { ExitDraftModeButton } from '@/components/DraftModeStatusToast/components/ExitDraftModeButton';
import { cn } from '@/libs/utils/classNames';
import { draftMode } from 'next/headers';

export const DraftStatusToast = async ({
  className,
}: { className?: string }) => {
  const { isEnabled } = await draftMode();

  if (!isEnabled && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <aside className={cn('fixed bottom-4 left-4', className)}>
      <span className="flex items-center gap-2 rounded border-2 border-gray-800 bg-gray-200 p-2 font-bold dark:border-white dark:bg-gray-700">
        Draft Mode
        {isEnabled && <ExitDraftModeButton />}
        {!isEnabled && process.env.NODE_ENV !== 'production' && (
          <EnterDraftModeButton />
        )}
      </span>
    </aside>
  );
};
