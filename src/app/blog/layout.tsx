import { SKIP_NAV_MAIN_CONTENT_ID } from '@/components/SkipNavLink';

type BlogLayoutProps = { children: React.ReactNode };

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <main id={SKIP_NAV_MAIN_CONTENT_ID}>{children}</main>;
}
