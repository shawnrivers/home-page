import { getCoverImageId } from '@/app/blog/utils/cover';
import { BlogPageProps } from '@/app/blog/[slug]/page';
import { getBlogData } from '@/app/blog/[slug]/utils/getBlogData';
import { SharedHead } from '@/components/SharedHead';
import { getImageUrl } from '@/utils/cloudinary';
import { convertRichTextToPlainText } from '@/utils/notion/utils';

export default async function Head({ params }: BlogPageProps) {
  const { slug } = params;
  const blog = await getBlogData(slug);

  if (!blog) {
    return (
      <>
        <SharedHead />
        <meta name="og:type" content="article" />
        <meta name="article:author" content="https://usho.dev" />
      </>
    );
  }

  const { created_time, last_edited_time, properties } = blog;
  const title = `${convertRichTextToPlainText(properties.Page.title)} | Usho`;
  const url = `https://usho.dev/blog/${slug}`;

  return (
    <>
      <SharedHead />
      <title>{title}</title>
      <meta name="url" content={url} />
      <meta name="og:url" content={url} />
      <meta name="og:title" content={title} />
      <meta name="og:type" content="article" />
      <meta name="article:author" content="https://usho.dev" />
      <meta name="article:published_time" content={created_time} />
      <meta name="article:modified_time" content={last_edited_time} />
      <meta
        name="og:image"
        content={getImageUrl(getCoverImageId(title), {
          width: 1280,
          height: 800,
        })}
      />
      <meta name="og:image:type" content="image/jpeg" />
      <meta name="og:image:width" content="1280" />
      <meta name="og:image:height" content="800" />
      <meta name="og:image:alt" content={title} />
    </>
  );
}
