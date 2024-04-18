import { VariableString } from '../../../types';
import { CommonInputResult } from '../../types';
import { INPUT_TYPE } from '../constants';
import { InputConfigBase } from '../types';

/**
 * templateの簡易的なもの
 */
export type BoilerplateInputConfig = InputConfigBase<typeof INPUT_TYPE.BOILERPLATE> & {
  /**
   * ボイラープレートとして使いまわすスケルトン
   */
  skeleton: VariableString;
};

/**
 * ボイラープレート入力時の処理結果
 */
export type BoilerplateInputResult = CommonInputResult;
