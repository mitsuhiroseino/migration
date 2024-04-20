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

/**
 * 配列などを非同期のイテレーターを返すインスタンスに変換する
 * @param iterable
 * @returns
 */
export default function toAsyncIterable<T>(iterable: Iterable<T>) {
  return new AsyncIterableImpl(iterable);
}
