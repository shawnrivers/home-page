import { SKIP_NAV_MAIN_CONTENT_ID } from '@/components/SkipNavLink';

type HomeLayoutProps = { children: React.ReactNode };

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main id={SKIP_NAV_MAIN_CONTENT_ID} className="font-mono">
      {children}
    </main>
  );
}
