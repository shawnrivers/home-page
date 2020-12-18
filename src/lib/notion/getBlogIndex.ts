import { Sema } from 'async-sema';
import createTable from './createTable';
import getTableData, { TableObject } from './getTableData';
import { getPostPreview } from './getPostPreview';
import { readFile, writeFile } from '../fs-helpers';
import { BLOG_INDEX_ID, BLOG_INDEX_CACHE } from './server-constants';
import { loadPageChunk } from '../apis/notion/loadPageChunkAPI';
import { isCollectionViewBlock } from '../apis/notion/utils/typeGuards';

export default async function getBlogIndex(
  previews = true,
): Promise<TableObject> {
  let postsTable: TableObject = null;
  const useCache = process.env.USE_CACHE === 'true';
  const cacheFile = `${BLOG_INDEX_CACHE}${previews ? '_previews' : ''}`;

  if (useCache) {
    try {
      postsTable = JSON.parse(await readFile(cacheFile, 'utf8'));
    } catch (_) {
      /* not fatal */
    }
  }

  if (!postsTable) {
    try {
      const data = await loadPageChunk({ pageId: BLOG_INDEX_ID, limit: 999 });

      // Parse table with posts
      const tableBlock = Object.values(data.recordMap.block).find(
        block => block.value.type === 'collection_view',
      );

      if (isCollectionViewBlock(tableBlock)) {
        postsTable = (await getTableData(tableBlock, true)) as TableObject;
      }
    } catch (err) {
      console.warn(
        `Failed to load Notion posts, attempting to auto create table`,
      );
      try {
        await createTable();
        console.log(`Successfully created table in Notion`);
      } catch (err) {
        console.error(
          `Auto creating table failed, make sure you created a blank page and site the id with BLOG_INDEX_ID in your environment`,
          err,
        );
      }
      return {};
    }

    // only get 10 most recent post's previews
    const postsKeys = Object.keys(postsTable).splice(0, 10);

    const sema = new Sema(3, { capacity: postsKeys.length });

    if (previews) {
      await Promise.all(
        postsKeys
          .sort((a, b) => {
            const timeA = postsTable[a].Date as number;
            const timeB = postsTable[b].Date as number;
            return Math.sign(timeB - timeA);
          })
          .map(async postKey => {
            await sema.acquire();
            const post = postsTable[postKey];
            post.preview = post.id
              ? await getPostPreview(postsTable[postKey].id as string)
              : [];
            sema.release();
          }),
      );
    }

    if (useCache) {
      writeFile(cacheFile, JSON.stringify(postsTable), 'utf8').catch(() => {
        //
      });
    }
  }

  return postsTable;
}
