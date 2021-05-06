type SortOrder = 'asc' | 'desc';

export function sortByDate<T>(
  array: T[],
  keyField: keyof T,
  order: SortOrder = 'desc',
): T[] {
  return array.slice().sort((itemA, itemB) => {
    return order === 'asc'
      ? new Date(itemA[keyField] as any).getTime() -
          new Date(itemB[keyField] as any).getTime()
      : new Date(itemB[keyField] as any).getTime() -
          new Date(itemA[keyField] as any).getTime();
  });
}
