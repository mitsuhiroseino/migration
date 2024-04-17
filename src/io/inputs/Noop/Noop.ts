import { Content, IterationParams } from '../../../types';
import InputFactory from '../InputFactory';
import { INPUT_TYPE } from '../constants';
import { Input } from '../types';
import { NoopInputConfig } from './types';

/**
 * なにもしない
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const Noop: Input<Content, NoopInputConfig> = async function* (config, params: IterationParams) {
  yield {
    result: {},
  };
};
InputFactory.register(INPUT_TYPE.NOOP, Noop);
export default Noop;
