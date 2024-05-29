import isFunction from 'lodash/isFunction';

class AsyncIterableImpl<T> implements AsyncIterable<T> {
  private _iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this._iterable = iterable;
  }

  async *[Symbol.asyncIterator]() {
    for (const item of this._iterable) {
      yield item;
    }
  }
}

type Fn<T> = (...args: any[]) => Promise<T> | T;

class AsyncFnIterable<T> implements AsyncIterable<T> {
  private _fn: Fn<T>;
  private _args: any[];

  constructor(fn: Fn<T>, args: any[] = []) {
    this._fn = fn;
    this._args = args;
  }

  async *[Symbol.asyncIterator]() {
    const result = this._fn(...this._args);
    if (result instanceof Promise) {
      yield await result;
    } else {
      yield result;
    }
  }
}

/**
 * 配列や非同期の関数などを非同期のイテレーターを返すインスタンスに変換する
 * @param iterable
 * @returns
 */
export default function toAsyncIterable<T>(target: Iterable<T> | Fn<T> | T, args?: any[]) {
  if (isFunction(target)) {
    return new AsyncFnIterable(target, args);
  } else if (isIterable(target)) {
    return new AsyncIterableImpl(target);
  } else {
    return new AsyncIterableImpl([target]);
  }
}

function isIterable(value: unknown): value is Iterable<unknown> {
  return value != null && typeof value[Symbol.iterator] === 'function';
}
