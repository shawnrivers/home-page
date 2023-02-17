import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  res.clearPreviewData({});
  res.writeHead(307, { Location: '/' });
  res.end();
};

export default handler;
