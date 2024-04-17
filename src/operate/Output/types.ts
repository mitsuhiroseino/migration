import { VariableString } from '../../types';
import {} from '../../utils/writeAnyFile';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase, OperationParams } from '../types';

/**
 * ファイルを出力する操作
 */
export type OutputConfig = OperationConfigBase<typeof OPERATION_TYPE.OUTPUT> & {
  /**
   * ファイルのパス
   */
  outputPath: VariableString<OperationParams>;

  /**
   * outputPathの要素のプレイスホルダーを置換するなどの前処理を行わない
   */
  preserveOutputPath?: boolean;

  /**
   * paramsからファイルの内容を取得する際のプロパティ名
   * デフォルトは_resource
   */
  paramName?: VariableString<OperationParams>;

  /**
   * paramNameの要素のプレイスホルダーを置換するなどの前処理を行わない
   */
  preserveParamName?: boolean;

  /**
   * バイナリファイルを出力する時にtrue
   */
  binary?: boolean;

  /**
   * テキストファイルを書き込む際のエンコーディング
   * デフォルトは'utf8'
   */
  encoding?: BufferEncoding;
};
