import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import ExtLink from './ext-link';
import { useRouter } from 'next/router';
import styles from '../styles/header.module.css';

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
    <header className={styles.header}>
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
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
