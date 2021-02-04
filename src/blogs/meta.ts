export type Tag = 'react' | 'css';

export type BlogMeta = {
  title: string;
  slug: string;
  featured: boolean;
  published: boolean;
  date: string;
  tags: Tag[];
  image?: string;
  description?: string;
};

export const blogsMeta: Record<string, BlogMeta> = {
  'experimenting-react-suspense-with-swr': {
    title: 'Experimenting React Suspense with SWR',
    slug: 'experimenting-react-suspense-with-swr',
    featured: true,
    published: true,
    date: '2020-12-10',
    tags: ['react'],
    image: '/blogs/experimenting-react-suspense-with-swr/Suspense_with_SWR.jpg',
    description:
      'This article will show how to use React Suspense with SWR and the pros/cons and caveats of this pattern.',
  },
  'basic-css-element-sizing': {
    title: 'A Memo For Basic CSS Element Sizing',
    slug: 'basic-css-element-sizing',
    featured: false,
    published: true,
    date: '2020-11-21',
    tags: ['css'],
    image: '/blogs/basic-css-element-sizing/Element_Sizing.png',
    description:
      'This article introduces the very basic concepts of element sizing using CSS.',
  },
};
