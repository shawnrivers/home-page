import { fetchImage, getImageUrl, uploadImage } from '@/utils/cloudinary';
import Image, { ImageProps } from 'next/image';

type NotionImageProps = Omit<
  ImageProps,
  'src' | 'width' | 'height' | 'loader'
> & {
  fileName: string;
  originalUrl: string;
  width?: number;
  height?: number;
};

export const NotionImage = async ({
  fileName,
  originalUrl,
  alt,
  width,
  ...imageProps
}: NotionImageProps) => {
  const image = await getImage(originalUrl, fileName);

  if (image == null) {
    return null;
  }

  const aspectRatio = image.width / image.height;
  const realWidth = width ?? image.width;
  const realHeight =
    width != undefined ? realWidth / aspectRatio : image.height;

  return (
    <Image
      src={getImageUrl(image.public_id, { width: realWidth, quality: 80 })}
      alt={alt}
      width={realWidth}
      height={realHeight}
      {...imageProps}
    />
  );
};

async function getImage(url: string, fileName: string) {
  try {
    const image = await fetchImage(fileName);
    return image ?? null;
  } catch (e) {
    try {
      const image = await uploadImage({ url, fileName });
      return image ?? null;
    } catch (e) {
      return null;
    }
  }
}
