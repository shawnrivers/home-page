'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <button
        className="mt-8 rounded-lg border-4 border-gray-800 bg-white px-6 py-2 text-lg font-bold text-gray-900 shadow-md hover:bg-gray-100 hover:shadow-lg dark:border-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
