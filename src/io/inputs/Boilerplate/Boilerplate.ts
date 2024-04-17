import { CONTENT_TYPE, ITEM_TYPE } from '../../../constants';
import { Content, IterationParams } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import InputFactory from '../InputFactory';
import { INPUT_TYPE } from '../constants';
import { Input } from '../types';
import { BoilerplateInputConfig } from './types';

/**
 * スケルトンを基にコンテンツを生成する
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const Boilerplate: Input<Content, BoilerplateInputConfig> = async function* (config, params: IterationParams) {
  const { skeleton } = config;
  const content: string = finishDynamicValue(skeleton, params, config);
  yield {
    content,
    result: {
      inputItemType: ITEM_TYPE.LEAF,
      inputContentType: CONTENT_TYPE.TEXT,
    },
  };
};
InputFactory.register(INPUT_TYPE.BOILERPLATE, Boilerplate);
export default Boilerplate;
