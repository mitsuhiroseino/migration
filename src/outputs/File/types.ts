import { VariableString } from '../../types';
import { OUTPUT_TYPE } from '../constants';
import { OutputConfigBase } from '../types';

/**
 * ファイルへの出力
 */
export type FileOutputConfig = OutputConfigBase<typeof OUTPUT_TYPE.FILE> & {
  /**
   * 出力先ファイル・ディレクトリのパス
   */
  outputPath: VariableString;
};
