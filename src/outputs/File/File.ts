import { Content, IterationParams } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import writeAnyFile from '../../utils/writeAnyFile';
import { Output } from '../types';
import { FileOutputConfig } from './types';

/**
 * スケルトンを基にコンテンツを生成する
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const File: Output<Content, FileOutputConfig> = async function (
  content: Content,
  config: FileOutputConfig,
  params: IterationParams,
) {
  const { outputPath, outputEncoding = params._encoding as BufferEncoding } = config;
  const outputItemPath: string = finishDynamicValue(outputPath, params, config);
  // ファイルの出力あり
  await writeAnyFile(outputItemPath, content, {
    ensured: false,
    spaces: 2,
    encoding: outputEncoding,
  });
};
export default File;
