import Encoding from 'encoding-japanese';
import fs from 'fs-extra';
import path from 'path';
import { CONTENT_TYPE } from '../../constants';
import { Content, IterationParams } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import propagateError from '../../utils/propagateError';
import { InputGenerator, InputResult } from '../types';
import { FileInputConfig } from './types';

async function* File<C extends string = string>(config: FileInputConfig, params: IterationParams): InputGenerator<C> {
  const { targetPath } = config;
  const rootPath: string = finishDynamicValue(targetPath, params, config);

  const iterateFs = async function* (
    inputPath: string,
    depth: number = 0,
    parentPath?: string,
  ): AsyncGenerator<InputResult<C>> {
    const stat = await fs.stat(inputPath);
    if (stat.isFile()) {
      // ファイルを読み込んで返す
      yield { params: { inputPath } };
    } else {
      // 配下のディレクトリ、ファイルを再帰的に処理
      const items = await fs.readdir(inputPath);
      for (const item of items) {
        const itemPath = path.join(inputPath, item);
        // 子要素を処理
        yield* iterateFs(itemPath, depth + 1, inputPath);
      }
    }
  };

  yield* iterateFs(rootPath);
}

export default File;
