import isString from 'lodash/isString';
import { INHERITED_CONFIGS } from '../constants';

/**
 * 親から子に引き継ぐコンフィグの設定
 * @param config 子の設定
 * @param baseConfig 親の設定
 * @param mapping 子と親のコンフィグ名が異なる場合のマッピング。親のコンフィグ名をキー、子のコンフィグ名を値として定義する
 */
export default function inheritConfig<C extends any>(
  config: any,
  baseConfig: any,
  mapping: { [baseConfigName: string]: string | boolean } = INHERITED_CONFIGS,
): C {
  const cfg = { ...config };
  const base = { ...baseConfig };
  // mappingにあるプロパティが未設定の場合はbaseConfigから引き継ぐ
  for (const name in mapping) {
    const nm = isString(mapping[name]) ? (mapping[name] as string) : name;
    if (nm in cfg === false && name in base) {
      cfg[nm] = base[name];
    }
  }
  // paramsはマージ
  cfg.params = { ...base.params, ...cfg.params };

  return cfg;
}
