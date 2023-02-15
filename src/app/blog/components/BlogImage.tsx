import { getImageUrl } from '@/utils/cloudinary';
import Image, { ImageProps } from 'next/image';

type BlogImageProps = Omit<ImageProps, 'src' | 'width' | 'loader'> & {
  publicId: string;
  width?: number;
  originalWidth?: number;
  originalHeight?: number;
};

export const BlogImage = ({
  publicId,
  alt,
  width,
  originalWidth,
  originalHeight,
  ...imageProps
}: BlogImageProps) => {
  const aspectRatio =
    originalWidth !== undefined && originalHeight !== undefined
      ? originalWidth / originalHeight
      : undefined;
  const realWidth = width ?? originalWidth;
  const realHeight =
    realWidth !== undefined && aspectRatio !== undefined
      ? realWidth / aspectRatio
      : originalHeight;

  return (
    <Image
      src={getImageUrl(publicId, { width, quality: 80 })}
      alt={alt}
      width={realWidth}
      height={realHeight}
      {...imageProps}
    />
  );
};
