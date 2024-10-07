import { SKIP_NAV_MAIN_CONTENT_ID } from '@/components/SkipNavLink';

export default function MemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id={SKIP_NAV_MAIN_CONTENT_ID} className="mx-auto max-w-6xl">
      {children}
    </main>
  );
}
