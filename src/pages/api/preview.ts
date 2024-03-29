import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.query.secret !== process.env.PREVIEW_API_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  res.setPreviewData({});
  res.writeHead(307, { location: '/' });
  res.end();
};

export default handler;
