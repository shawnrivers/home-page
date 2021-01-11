import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import ExtLink from '../pages/blog/ExtLink';
import { useRouter } from 'next/router';

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
];

function isCurrentPageMatchingNav(params: {
  pathname: string;
  navPage: string;
}): boolean {
  const { pathname, navPage } = params;

  if (pathname === navPage) {
    return true;
  }

  if (pathname === '/blog/[slug]' && navPage === '/blog') {
    return true;
  }
}

const ogImageUrl =
  'https://raw.githubusercontent.com/shawnrivers/shawnrivers.github.io/develop/public/meta-social-text.jpg';

export type HeaderProps = {
  titlePre?: string;
};

export const Header: React.FC<HeaderProps> = props => {
  const { titlePre } = props;
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{titlePre ? `${titlePre} | ` : ''}Usho</title>
        <meta name="description" content="Usho Ka (Yuxiao He)'s home page" />
        <meta name="og:title" content="Usho" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@yuxiao_he" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <header className="block h-16 px-4 mb-8 text-center">
        <nav>
          <ul className="p-0 list-none">
            {navItems.map(({ label, page, link }) => (
              <li className="inline-block px-2 py-4" key={label}>
                {page ? (
                  <Link href={page}>
                    <a
                      className={`text-xl ${
                        isCurrentPageMatchingNav({ pathname, navPage: page })
                          ? 'text-blue-400 font-bold'
                          : 'text-gray-900 font-normal'
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
        </nav>
      </header>
    </>
  );
};
