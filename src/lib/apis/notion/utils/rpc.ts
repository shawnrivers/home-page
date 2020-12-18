import fetch, { Response } from 'node-fetch';
import { NOTION_API_ENDPOINT, NOTION_TOKEN } from './constants';

export default async function rpc<R = any>(
  fnName: string,
  body: any,
): Promise<R> {
  if (!NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is not set in env');
  }
  const res = await fetch(`${NOTION_API_ENDPOINT}/${fnName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: `token_v2=${NOTION_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return res.json() as R;
  } else {
    throw new Error(await getError(res));
  }
}

export async function getError(res: Response): Promise<string> {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res,
  )}\n ${await getBodyOrNull(res)}`;
}

export function getJSONHeaders(res: Response): string {
  return JSON.stringify(res.headers.raw());
}

export function getBodyOrNull(res: Response): string | null {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}
