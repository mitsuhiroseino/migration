import isFunction from 'lodash/isFunction';
import { INHERITED_CONFIGS } from '../constants';

/**
 * 設定を引き継ぐ
 * @param config 子の設定
 * @param baseConfig 親の設定
 * @param mapping 引き継ぐ項目の指定
 */
export default function inheritConfig<C extends any>(
  config: any,
  baseConfig: any,
  mapping: { [baseConfigName: string]: boolean | ((config: any, baseConfig: any) => any) } = INHERITED_CONFIGS,
): C {
  let cfg = { ...config };
  const base = { ...baseConfig };

  // mappingにあるプロパティが未設定の場合はbaseConfigから引き継ぐ
  for (const name in mapping) {
    const value = mapping[name];
    if (isFunction(value)) {
      cfg = value(cfg, base);
    } else if (value === true) {
      if (name in cfg === false && name in base) {
        cfg[name] = base[name];
      }
    }
  }

  return cfg;
}
