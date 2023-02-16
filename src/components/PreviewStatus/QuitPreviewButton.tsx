'use client';

export const QuitPreviewButton: React.FC = () => {
  return (
    <button
      className="bg-gray-800 py-1 px-2 text-sm text-white dark:bg-white dark:text-gray-800"
      onClick={async () => {
        await fetch('/api/quit-preview');
        window.location.reload();
      }}
    >
      Quit
    </button>
  );
};
