import { Content, IterationParams } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import { InputGenerator } from '../types';
import { BoilerplateInputConfig } from './types';

/**
 * スケルトンを基にコンテンツを生成する
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
async function* Boilerplate(config: BoilerplateInputConfig, params: IterationParams): InputGenerator<Content> {
  const { skeleton } = config;
  const content: string = finishDynamicValue(skeleton, params, config);
  yield { content };
}
export default Boilerplate;
