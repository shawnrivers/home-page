import { AnyObject } from 'app/types/Global';

type SortOrder = 'asc' | 'desc';

type ConstraintObjectKey<
  O extends AnyObject,
  K extends keyof O,
  C,
> = O[K] extends C ? keyof O : never;

type Datable = string | number | Date;

export function sortByDate<T extends AnyObject, U extends keyof T>(
  array: T[],
  keyField: ConstraintObjectKey<T, U, Datable> extends Datable ? U : never,
  order: SortOrder = 'desc',
): T[] {
  return array.slice().sort((itemA, itemB) => {
    return order === 'asc'
      ? new Date(itemA[keyField] as Datable).getTime() -
          new Date(itemB[keyField] as Datable).getTime()
      : new Date(itemB[keyField] as Datable).getTime() -
          new Date(itemA[keyField] as Datable).getTime();
  });
}
