import { INPUT_TYPE } from '../constants';
import { InputConfigBase } from '../types';

/**
 * templateの簡易的なもの
 */
export type BoilerplateInputConfig = InputConfigBase<typeof INPUT_TYPE.BOILERPLATE> & {
  /**
   * ボイラープレートとして使いまわすスケルトン
   */
  skeleton: string;
};
