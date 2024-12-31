import { generateSlugFromText } from '@/libs/utils/string';

export function getCoverImageId(title: string): string {
  return generateSlugFromText(`${title} cover`);
}
