import { fetchPostContent } from '@/app/memo/_utils/fetchPostContent';
import { renderPostContent } from '@/app/memo/_utils/renderPostContent';
import { sharedMetadata } from '@/libs/utils/meta';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Job | Usho',
  description: "Usho's Job Experience",
  openGraph: {
    title: 'Job | Usho',
    description: "Usho's Job Experience",
    type: 'website',
    url: 'https://usho.dev/job',
    images: {
      url: 'https://usho.dev/og-image.jpg',
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
      <div className="isolate mx-auto flex items-start justify-center">
        <article className="prose prose-gray relative w-full break-words lg:prose-lg dark:prose-invert prose-h1:font-display prose-h2:font-display prose-h3:font-display">
          <h1>Job Experience</h1>
          <div>{renderPostContent({ blocks, images })}</div>
        </article>
      </div>
    </>
  );
}
