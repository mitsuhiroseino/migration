import isString from 'lodash/isString';

import { OperationConfig } from '../../operate';
import { INHERITED_CONFIGS } from '../constants';
import { CommonConfig } from '../types';

/**
 * 親から子に引き継ぐコンフィグの設定
 * @param config 子の設定
 * @param baseConfig 親の設定
 * @param mapping 子と親のコンフィグ名が異なる場合のマッピング。親のコンフィグ名をキー、子のコンフィグ名を値として定義する
 */
export default function inheritConfig<C extends CommonConfig<OC>, OC extends OperationConfig>(
  config: C,
  baseConfig: any,
  mapping: { [baseConfigName: string]: string | boolean } = INHERITED_CONFIGS
): C {
  const cfg = { ...config };
  // mappingにあるプロパティが未設定の場合はbaseConfigから引き継ぐ
  for (const name in mapping) {
    const nm = isString(mapping[name]) ? (mapping[name] as string) : name;
    if (nm in cfg === false && name in baseConfig) {
      cfg[nm] = baseConfig[name];
    }
  }
  // paramsはマージ
  cfg.params = { ...baseConfig.params, ...cfg.params };

  return cfg;
}
