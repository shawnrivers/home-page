import { NOTION_API_ENDPOINT, NOTION_TOKEN } from '../constants/notion';

export async function fetchNotionAsset(
  url: string,
  blockId: string,
): Promise<string> {
  const requestURL = `${NOTION_API_ENDPOINT}/getSignedFileUrls`;
  const assetRes = await fetch(requestURL, {
    method: 'POST',
    headers: {
      cookie: `token_v2=${NOTION_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      urls: [
        {
          url,
          permissionRecord: {
            table: 'block',
            id: blockId,
          },
        },
      ],
    }),
  });

  if (assetRes.ok) {
    const response = await assetRes.json();
    return response.signedUrls[0];
  }

  throw new Error('Notion asset fetching failed');
}
