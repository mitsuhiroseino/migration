import { IO_TYPE } from '../../constants';
import { InputConfigBase, InputResultBase } from '../../types';

/**
 * データ
 */
export type DataInputConfig = InputConfigBase<typeof IO_TYPE.DATA> & {
  data: any;
};

/**
 * データ入力時の処理結果
 */
export type DataInputResult = InputResultBase;
