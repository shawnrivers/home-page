import { Page } from 'app/components/shared/Page';
import type { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <Page titlePre="Not Found">
      <h1 className="text-center font-bold text-3xl">Not Found</h1>
    </Page>
  );
};

export default NotFound;
