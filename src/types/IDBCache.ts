export interface IDBCache<T> {
  version: number;
  date: Date;
  data: T;
}
