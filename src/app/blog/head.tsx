import { SharedHead } from '@/components/SharedHead';

export default function Head() {
  return (
    <>
      <SharedHead />
      <title>Blog | Usho</title>
      <meta name="description" content="Usho's blog" />
      <meta name="url" content="https://usho.dev" />
      <meta name="og:title" content="Blog | Usho" />
      <meta name="og:description" content="Usho's blog" />
      <meta name="og:type" content="website" />
      <meta name="og:url" content="https://usho.dev/blog" />
      <meta name="og:image" content="/og-image.jpg" />
      <meta name="og:image:type" content="image/jpeg" />
      <meta name="og:image:width" content="1280" />
      <meta name="og:image:height" content="640" />
      <meta name="og:image:alt" content="Usho's blog" />
    </>
  );
}
