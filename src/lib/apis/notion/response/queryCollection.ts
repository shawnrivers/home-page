import { RecordMap } from './pageChunk';

export type QueryCollection = {
  result: {
    type: 'table';
    blockIds: string[];
    aggregationResults: any[];
    total: number;
  };
  recordMap: RecordMap;
};
