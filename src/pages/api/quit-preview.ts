import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  res.clearPreviewData({});
  res.redirect('/');
};

export default handler;
