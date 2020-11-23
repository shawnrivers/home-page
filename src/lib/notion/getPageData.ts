import rpc from './rpc';

export default async function getPageData(
  pageId: string,
): Promise<{
  blocks: Block[];
}> {
  try {
    const data = await loadPageChunk({ pageId });
    const blocks = Object.values(data.recordMap.block);

    const firstBlock = blocks[0];
    if (firstBlock) {
      if ('content' in firstBlock.value) {
        // remove table blocks
        blocks.splice(0, 3);
      }
    }

    return { blocks };
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err);
    return { blocks: [] };
  }
}

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

export type PageChunk = {
  recordMap: RecordMap;
  cursor: Cursor;
};

type Cursor = {
  stack: Stack[][];
};

type Stack = {
  table: Table;
  id: string;
  index: number;
};

type Role = 'editor';
type Permission = {
  role: Role;
  type: string;
  user_id: string;
};
type Table = 'block' | 'collection';
type CodeLanguage = 'CSS' | 'HTML';
type CreatorTable = 'notion_user';
type Property<T extends string> = (T | Property<T>)[][];
type TitleProperty = Property<string>;
type SourceProperty = Property<string>;
type LanguageProperty = Property<CodeLanguage>;

type Schema = {
  name: string;
  type: string;
};

export type RecordMap = {
  block: Record<string, Block>;
  collection: Record<string, Collection>;
  collection_view: Record<string, CollectionView>;
  space: Record<string, Space>;
};

export type BlockValue = {
  id: string;
  version: number;
  created_time: number;
  last_edited_time: number;
  parent_id: string;
  parent_table: Table;
  alive: boolean;
  created_by_table: CreatorTable;
  created_by_id: string;
  last_edited_by_table: CreatorTable;
  last_edited_by_id: string;
  shard_id: number;
  space_id: string;
} & (
  | {
      type: 'divider';
    }
  | {
      type: 'text' | 'bulleted_list' | 'sub_header' | 'sub_sub_header';
      properties?: {
        title: TitleProperty;
      };
    }
  | {
      type: 'code';
      properties: {
        title: TitleProperty;
        language: LanguageProperty;
      };
      format: {
        code_wrap: boolean;
      };
      copied_from: string;
    }
  | {
      type: 'callout';
      properties: {
        title: TitleProperty;
      };
      format: {
        page_icon: string;
        block_color: string;
      };
    }
  | {
      type: 'image';
      properties: {
        source: SourceProperty;
      };
      format: {
        block_width: number;
        block_height?: number;
        display_source: string;
        block_full_width: boolean;
        block_page_width: boolean;
        block_aspect_ratio: number;
        block_preserve_scale: boolean;
      };
      file_ids: string[];
    }
  | {
      type: 'page';
      properties: {
        title: TitleProperty;
        [key: string]: Property<string>;
      };
      content: string[];
      format?: {
        page_icon: string;
        block_locked: boolean;
        block_locked_by: string;
      };
      permissions?: Permission[];
    }
  | {
      type: 'collection_view';
      view_ids: string[];
      collection_id: string;
    }
);

type Block = {
  role: Role;
  value: BlockValue;
};

type CollectionPageProperty = {
  visible: boolean;
  property: string;
};

type CollectionValue = {
  id: string;
  version: number;
  name: string[][];
  schema: { [key: string]: Schema };
  format: {
    collection_page_properties: CollectionPageProperty[];
  };
  parent_id: string;
  parent_table: Table;
  alive: boolean;
  migrated: boolean;
};

type Collection = {
  role: Role;
  value: CollectionValue;
};

type TableProperty = {
  width?: number;
  visible: boolean;
  property: string;
};

type CollectionViewValue = {
  id: string;
  version: number;
  type: 'table';
  name: string;
  format: {
    table_wrap: boolean;
    table_properties: TableProperty[];
  };
  parent_id: string;
  parent_table: Table;
  alive: boolean;
  page_sort: string[];
  query2: Query2;
  shard_id: number;
  space_id: string;
};

type CollectionView = {
  role: Role;
  value: CollectionViewValue;
};

type Query2 = {
  filter: Query2Filter;
  aggregations: Aggregation[];
};

type Aggregation = {
  property: string;
  aggregator: string;
};

type Query2Filter = {
  filters: FilterElement[];
  operator: string;
};

type FilterElement = {
  filter: {
    value: {
      type: string;
    };
    operator: string;
  };
  property: string;
};

type SpaceValue = {
  id: string;
  version: number;
  name: string;
  domain: string;
  permissions: Permission[];
  icon: string;
  beta_enabled: boolean;
  pages: string[];
  created_by: string;
  created_time: number;
  last_edited_by: string;
  last_edited_time: number;
  created_by_table: CreatorTable;
  created_by_id: string;
  last_edited_by_table: CreatorTable;
  last_edited_by_id: string;
  shard_id: number;
  plan_type: string;
  invite_link_code: string;
  invite_link_enabled: boolean;
};

type Space = {
  role: Role;
  value: SpaceValue;
};
