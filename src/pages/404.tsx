import { Page } from 'app/components/shared/Page';
import type { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <Page titlePre="Not Found">
      <h1 className="text-center text-3xl font-bold">Not Found</h1>
    </Page>
  );
};

export default NotFound;
