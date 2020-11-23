import { Cursor, PageChunk } from './response/pageChunk';
import rpc from './utils/rpc';

type LoadPageChunkParams = {
  pageId: string;
  limit?: number;
  cursor?: Cursor;
  chunkNumber?: number;
  verticalColumns?: boolean;
};

export function loadPageChunk({
  pageId,
  limit = 100,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false,
}: LoadPageChunkParams): Promise<PageChunk> {
  return rpc('loadPageChunk', {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns,
  });
}
