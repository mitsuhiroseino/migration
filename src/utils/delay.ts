/**
 * 関数を
 * @param fn
 * @param args
 */
export default function delay<A extends unknown[] = unknown[], R extends unknown = unknown>(
  fn: ((...args: A) => R) | null | undefined,
  args?: A,
): Promise<R> {
  return Promise.resolve().then(() => fn(...args));
}
