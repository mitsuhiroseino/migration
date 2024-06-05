import isFunction from 'lodash/isFunction';

type Fn<T> = (...args: any[]) => Promise<T> | T;

/**
 * 配列や非同期の関数などを非同期のイテレーターを返すジェネレーターに変換する
 * @param iterable
 * @returns
 */
export default function toAsyncGenerator<T>(
  target: Iterable<T> | Fn<T | T[]> | T,
  args: any[] = [],
): () => AsyncGenerator<Awaited<T>, void> {
  if (isFunction(target)) {
    return async function* () {
      const result = target(...args);
      let data;
      if (result instanceof Promise) {
        data = await result;
      } else {
        data = result;
      }
      if (Array.isArray(data)) {
        for (const item of data) {
          yield item;
        }
      } else {
        yield data;
      }
    };
  } else if (isIterable(target)) {
    return async function* () {
      for (const item of target) {
        yield item;
      }
    };
  } else {
    return async function* () {
      yield target;
    };
  }
}

function isIterable(value: unknown): value is Iterable<unknown> {
  return value != null && typeof value[Symbol.iterator] === 'function';
}
