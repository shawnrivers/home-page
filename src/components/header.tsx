import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import ExtLink from './ext-link';
import { useRouter } from 'next/router';

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
];

const ogImageUrl =
  'https://raw.githubusercontent.com/shawnrivers/shawnrivers.github.io/develop/public/meta-social-text.jpg';

const Header: React.FC<{
  titlePre?: string;
}> = props => {
  const { titlePre } = props;
  const { pathname } = useRouter();

  return (
    <header className="block h-16 px-4 text-center">
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Usho</title>
        <meta
          name="description"
          content="An example Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="Usho" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@yuxiao_he" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <ul className="p-0 list-none">
        {navItems.map(({ label, page, link }) => (
          <li className="inline-block px-2 py-4" key={label}>
            {page ? (
              <Link href={page}>
                <a
                  className={`text-xl ${
                    pathname === page
                      ? 'text-blue-500 font-bold'
                      : 'text-gray-800 font-normal'
                  }`}
                >
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink
                href={link}
                className="text-xl text-gray-800 font-normal"
              >
                {label}
              </ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
