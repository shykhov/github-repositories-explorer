import { useLocation } from 'react-router-dom';

export declare class URLSearchParams {
  constructor(init?: string | URLSearchParams);

  append(name: string, value: string): void;

  delete(name: string): void;

  entries(): IterableIterator<[string, string]>;

  get(name: string): string;

  getAll(name: string): string[];

  has(name: string): boolean;

  keys(): IterableIterator<string>;

  set(name: string, value: string): void;

  toString(): string;

  values(): IterableIterator<string>;

  [Symbol.iterator](): IterableIterator<number>;
}

export const useUrlQuery = (): URLSearchParams => new URLSearchParams(useLocation().search);
