import { fetchImages, uploadImage } from '@/libs/api/cloudinary';

interface SourceImage {
  fileName: string;
  url: string;
}

export async function fetchPostImages(sourceImages: SourceImage[]) {
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
        }

        try {
          const image = await uploadImage({
            url: sourceImage.url,
            fileName: sourceImage.fileName,
          });
          return image ?? undefined;
        } catch (e) {
          console.error('Error uploading image to cloudinary', e);
          return undefined;
        }
      }),
    )
  ).filter(image => image !== undefined);

  return images;
}
