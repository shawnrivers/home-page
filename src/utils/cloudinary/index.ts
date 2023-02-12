import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function uploadImage(params: { url: string; fileName: string }) {
  const { url, fileName } = params;
  return cloudinary.uploader.upload(url, {
    public_id: fileName,
    folder: '/home-page/blog',
  });
}

export const getImageUrl = cloudinary.url;
