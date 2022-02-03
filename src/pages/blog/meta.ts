export type Tag = 'react' | 'css' | 'html' | 'a11y';
import SuspenseWithSwrHeroImage from 'public/blogs/experimenting-react-suspense-with-swr/Suspense_with_SWR.jpg';
import ElementSizingHeroImage from 'public/blogs/basic-css-element-sizing/Element_Sizing.png';
import CommonAriaPropertiesHeroImage from 'public/blogs/common-aria-properties/hero.png';
import React18NewFeaturesHeroImage from 'public/blogs/react-18-new-features/hero.png';

export type BlogMeta = {
  title: string;
  slug: string;
  featured: boolean;
  published: boolean;
  date: string;
  tags: Tag[];
  image?: { static: StaticImageData; url: string };
  description?: string;
};

export const blogsMeta: Record<string, BlogMeta> = {
  'experimenting-react-suspense-with-swr': {
    title: 'React Suspense with SWR',
    slug: 'experimenting-react-suspense-with-swr',
    featured: true,
    published: true,
    date: '2020-12-10',
    tags: ['react'],
    image: {
      static: SuspenseWithSwrHeroImage,
      url: '/blogs/experimenting-react-suspense-with-swr/Suspense_with_SWR.jpg',
    },
    description:
      'This article will show how to use React Suspense with SWR and the pros/cons and caveats of this pattern.',
  },
  'basic-css-element-sizing': {
    title: 'Basic CSS Element Sizing',
    slug: 'basic-css-element-sizing',
    featured: false,
    published: true,
    date: '2020-11-21',
    tags: ['css'],
    image: {
      static: ElementSizingHeroImage,
      url: '/blogs/basic-css-element-sizing/Element_Sizing.png',
    },
    description:
      'This article introduces the very basic concepts of element sizing using CSS.',
  },
  'common-aria-properties': {
    title: 'Some Common ARIA Properties',
    slug: 'common-aria-properties',
    featured: false,
    published: true,
    date: '2021-12-10',
    tags: ['a11y', 'html'],
    image: {
      static: CommonAriaPropertiesHeroImage,
      url: '/blogs/common-aria-properties/hero.png',
    },
    description: 'This article introduces some commonly used ARIA properties.',
  },
  'react-18-new-features': {
    title: 'React 18 New Features',
    slug: 'react-18-new-features',
    featured: true,
    published: true,
    date: '2021-12-26',
    tags: ['react'],
    image: {
      static: React18NewFeaturesHeroImage,
      url: '/blogs/react-18-new-features/hero.png',
    },
    description:
      'This article introduces some React 18 features that I think are important.',
  },
};
