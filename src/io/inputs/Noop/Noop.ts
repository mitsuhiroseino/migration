import { Content, IterationParams } from '../../../types';
import { IO_TYPE } from '../../constants';
import InputFactory from '../InputFactory';
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
InputFactory.register(IO_TYPE.NOOP, Noop);
export default Noop;
