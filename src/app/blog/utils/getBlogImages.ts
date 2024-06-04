import { fetchImages, uploadImage } from '@/utils/cloudinary';

export type SourceImage = {
  fileName: string;
  url: string;
};

export async function getBlogImages(sourceImages: SourceImage[]) {
  const existingImages = await fetchImages(
    sourceImages.map(image => image.fileName),
  );

  const images = (
    await Promise.all(
      sourceImages.map(async sourceImage => {
        const existingImage = existingImages.resources.find(image =>
          image.public_id.includes(sourceImage.fileName),
        );
        if (existingImage) {
          return existingImage;
        } else {
          try {
            const image = await uploadImage({
              url: sourceImage.url,
              fileName: sourceImage.fileName,
            });
            return image ?? undefined;
          } catch (e) {
            return undefined;
          }
        }
      }),
    )
  ).filter(image => image !== undefined);

  return images;
}
