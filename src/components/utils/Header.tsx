import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import ExtLink from '../pages/blog/ExtLink';
import { useRouter } from 'next/router';

const siteUrl = 'https://usho.dev';
const defaultOgImageUrl =
  'https://raw.githubusercontent.com/shawnrivers/blog/main/public/og-image.jpg';

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

export type HeaderProps = {
  titlePre?: string;
  ogImageUrl?: string;
  description?: string;
};

export const Header: React.FC<HeaderProps> = props => {
  const {
    titlePre,
    ogImageUrl,
    description = "Usho Ka (Yuxiao He)'s home page",
  } = props;
  const { pathname } = useRouter();
  const title = titlePre ? `${titlePre} | Usho` : 'Usho';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="url" content={siteUrl} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={siteUrl} />
        <meta name="og:image" content={ogImageUrl ?? defaultOgImageUrl} />
        {ogImageUrl === undefined ? (
          <meta name="og:image:type" content="image/jpeg" />
        ) : null}
        {ogImageUrl === undefined ? (
          <meta name="og:image:width" content="1280" />
        ) : null}
        {ogImageUrl === undefined ? (
          <meta name="og:image:height" content="640" />
        ) : null}
        <meta name="og:image:alt" content={title} />
        <meta name="twitter:creator" content="@yuxiao_he" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
                          : 'font-normal'
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
