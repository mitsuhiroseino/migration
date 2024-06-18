import isPlainObject from 'lodash/isPlainObject';
import { IterationParams, JobConfig } from '../../types';

/**
 * イテレーターを取得する
 * @param iteration イテレーターの素
 * @param config ジョブ設定
 * @returns
 */
export default function getIterator(
  iteration:
    | ((config: JobConfig) => Generator<IterationParams>)
    | IterationParams[]
    | IterationParams
    | null
    | undefined,
  config: JobConfig,
): Generator<IterationParams> {
  // ジェネレーターを作成する
  let generator: (cfg: JobConfig) => Generator<IterationParams>;
  if (iteration == null) {
    // 空のparamsを1つだけ返すジェネレーター
    generator = function* () {
      yield {};
    };
  } else if (Array.isArray(iteration)) {
    // 指定されたパラメーターを繰り返し返すジェネレーター
    const array = [].concat(iteration);
    generator = function* () {
      for (const params of array) {
        yield params;
      }
    };
  } else if (isPlainObject(iteration)) {
    // 指定されたパラメーターを返すジェネレーター
    const object = { ...iteration };
    generator = function* () {
      yield object;
    };
  } else {
    // 指定のジェネレーター
    generator = iteration as (cfg: JobConfig) => Generator<IterationParams>;
  }
  // イテレーターを返す
  return generator(config);
}
