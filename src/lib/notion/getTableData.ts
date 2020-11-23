import Slugger from 'github-slugger';
import { normalizeSlug } from '../blog-helpers';
import { CollectionViewBlock } from '../apis/notion/response/pageChunk';
import queryCollection from '../apis/notion/queryCollectionApi';
import { PostPreview } from './getPostPreview';

export type TableVal = string | number | boolean | PostPreview | any;
export type TableRow = {
  [schema: string]: TableVal | null;
  Slug: string;
};
export type TableObject = Record<string, TableRow>;
type TableArray = TableRow[];
type Table = TableObject | TableArray;

export default async function loadTable(
  collectionBlock: CollectionViewBlock,
  isPosts = false,
): Promise<Table> {
  const slugger = new Slugger();

  const { value } = collectionBlock;
  let table = {} as Table;

  const col = await queryCollection({
    collectionId: value.collection_id,
    collectionViewId: value.view_ids[0],
  });

  const entries = Object.values(col.recordMap.block).filter(block => {
    return block.value && block.value.parent_id === value.collection_id;
  });

  const colId = Object.keys(col.recordMap.collection)[0];
  const schema = col.recordMap.collection[colId].value.schema;
  const schemaKeys = Object.keys(schema);

  for (const entry of entries) {
    const props =
      'properties' in entry.value ? entry.value.properties : entry.value;
    const row = {} as TableRow;

    if (!props) continue;

    if ('content' in entry.value) {
      row.id = entry.value.id;
    }

    schemaKeys.forEach(key => {
      // might be undefined
      let val: TableVal = props[key] && props[key][0][0];

      // authors and blocks are centralized
      if (val && props[key][0][1]) {
        const type = props[key][0][1][0];

        switch (type[0]) {
          case 'a': // link
            val = type[1];
            break;
          case 'u': // user
            val = props[key]
              .filter(arr => arr.length > 1)
              .map(arr => arr[1][0][1]);
            break;
          case 'p': {
            // page (block)
            const page = col.recordMap.block[type[1]];
            row.id = page.value.id;
            if (
              'properties' in page.value &&
              'title' in page.value.properties
            ) {
              val = page.value.properties.title[0][0] as string;
            }
            break;
          }
          case 'd': {
            // date
            // start_date: 2019-06-18
            // start_time: 07:00
            // time_zone: Europe/Berlin, America/Los_Angeles

            if (!type[1].start_date) {
              break;
            }
            // initial with provided date
            const providedDate = new Date(
              type[1].start_date + ' ' + (type[1].start_time || ''),
            ).getTime();

            // calculate offset from provided time zone
            const timezoneOffset =
              new Date(
                new Date().toLocaleString('en-US', {
                  timeZone: type[1].time_zone,
                }),
              ).getTime() - new Date().getTime();

            // initialize subtracting time zone offset
            val = new Date(providedDate - timezoneOffset).getTime();
            break;
          }
          default:
            console.error('unknown type', type[0], type);
            break;
        }
      }

      if (typeof val === 'string') {
        val = val.trim();
      }
      row[schema[key].name] = val || null;
    });

    // auto-generate slug from title
    row.Slug = normalizeSlug(row.Slug || slugger.slug(row.Page || ''));

    const key = row.Slug;
    if (isPosts && !key) continue;

    if (key) {
      table[key] = row;
    } else {
      if (!Array.isArray(table)) table = [];
      table.push(row);
    }
  }

  return table;
}
