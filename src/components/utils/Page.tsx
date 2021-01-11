import * as React from 'react';
import { joinClassNames } from '../../lib/utils/class';
import { Footer } from './Footer';
import { Header, HeaderProps } from './Header';

type PageProps = HeaderProps & {
  withFooter?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const Page: React.FC<PageProps> = props => {
  const { children, withFooter = true, className, ...headerProps } = props;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Header {...headerProps} />
        <main className={joinClassNames('mb-8', className)}>{children}</main>
      </div>
      {withFooter && <Footer className="flex-none" />}
    </div>
  );
};
