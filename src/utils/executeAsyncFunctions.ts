/**
 * 非同期関数の実行を行う
 * @param fns 非同期関数の配列
 * @param parallel trueの場合は並列実行
 * @returns
 */
export default async function executeAsyncFunctions<R = any>(
  fns: (() => Promise<R>)[],
  parallel?: boolean,
): Promise<R[]> {
  if (parallel) {
    // 並列実行
    return await Promise.all(fns.map((fn) => fn()));
  } else {
    // 直列実行
    const results: R[] = [];
    for (const fn of fns) {
      try {
        results.push(await fn());
      } catch (error) {
        // fnでエラーが発生した時点でthrow
        throw error;
      }
    }
    return results;
  }
}
