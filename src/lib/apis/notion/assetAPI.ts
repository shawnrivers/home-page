import { SignedFileUrls } from './response/signedFileUrls';
import rpc from './utils/rpc';

export async function fetchNotionAsset(
  url: string,
  blockId: string,
): Promise<string> {
  const response = await rpc<SignedFileUrls>('getSignedFileUrls', {
    urls: [
      {
        url,
        permissionRecord: {
          table: 'block',
          id: blockId,
        },
      },
    ],
  });

  return response.signedUrls[0];
}
