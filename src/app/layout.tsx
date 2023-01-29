import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';
import { Poppins, Space_Mono } from '@next/font/google';
import { cn } from '@/utils/classNames';
import { A11yReporter } from '@/components/A11yReporter';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'optional',
});
const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'optional',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(poppins.variable, spaceMono.variable)}>
      <head />
      <body>
        <div className="flex h-full flex-col">
          <div className="flex-1">
            <Header />
            <div className="pb-8">{children}</div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
        <A11yReporter />
      </body>
    </html>
  );
}
