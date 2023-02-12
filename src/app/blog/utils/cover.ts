import slugify from 'slugify';

export function getCoverImageId(title: string): string {
  return slugify(`${title} cover`);
}
