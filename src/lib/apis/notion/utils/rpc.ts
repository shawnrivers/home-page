import axios from 'axios';
import { NOTION_API_ENDPOINT, NOTION_TOKEN } from './constants';

export default async function rpc<R = any>(
  fnName: string,
  body: any,
): Promise<R> {
  if (!NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is not set in env');
  }

  try {
    const response = await axios.post<R>(
      `${NOTION_API_ENDPOINT}/${fnName}`,
      body,
      {
        headers: {
          'content-type': 'application/json',
          cookie: `token_v2=${NOTION_TOKEN}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(`Notion API error: ${error}`);
  }
}
