'use cache';

import type { Metadata } from 'next';
import { fetchPostContent } from '@/app/(pages)/memo/_utils/fetchPostContent';
import { renderPostContent } from '@/app/(pages)/memo/_utils/renderPostContent';
import { sharedMetadata } from '@/libs/utils/meta';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Job | Usho',
  description: "Usho's Job Experience",
  openGraph: {
    title: 'Job | Usho',
    description: "Usho's Job Experience",
    type: 'website',
    url: '/job',
    images: {
      url: '/og-image.jpg',
      type: 'image/jpeg',
      width: 1280,
      height: 640,
      alt: "Usho's job",
    },
  },
};

export default async function Job() {
  const { blocks, images } = await fetchPostContent(
    process.env.NOTION_PAGE_ID_JOB,
  );

  return (
    <>
      <div className="isolate mx-auto flex items-start justify-center max-w-2xl">
        <article className="prose prose-neutral relative w-full wrap-break-words lg:prose-lg dark:prose-invert prose-h1:font-display prose-h2:font-display prose-h3:font-display">
          <h1>Job Experience</h1>
          <div>{renderPostContent({ blocks, images })}</div>
        </article>
      </div>
    </>
  );
}
