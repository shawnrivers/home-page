import { QueryCollection } from './response/queryCollection';
import rpc from './utils/rpc';

type QueryCollectionParams = {
  collectionId: string;
  collectionViewId: string;
  loader?: {
    limit?: number;
    loadContentCover?: boolean;
    type?: string;
    userLocale?: string;
    userTimeZone?: string;
  };
  query?: {
    aggregate?: [
      {
        aggregation_type: string;
        id: string;
        property: string;
        type: string;
        view_type: string;
      },
    ];
    filter?: any[];
    filter_operator?: string;
    sort?: any[];
  };
};

export default function queryCollection({
  collectionId,
  collectionViewId,
  loader = {},
  query = {},
}: QueryCollectionParams): Promise<QueryCollection> {
  const {
    limit = 999, // TODO: figure out Notion's way of handling pagination
    loadContentCover = true,
    type = 'table',
    userLocale = 'en',
    userTimeZone = 'America/Phoenix',
  } = loader;

  const {
    aggregate = [
      {
        aggregation_type: 'count',
        id: 'count',
        property: 'title',
        type: 'title',
        view_type: 'table',
      },
    ],
    filter = [],
    filter_operator = 'and',
    sort = [],
  } = query;

  return rpc<QueryCollection>('queryCollection', {
    collectionId,
    collectionViewId,
    loader: {
      limit,
      loadContentCover,
      type,
      userLocale,
      userTimeZone,
    },
    query: {
      aggregate,
      filter,
      filter_operator,
      sort,
    },
  });
}
