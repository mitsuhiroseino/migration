import isString from 'lodash/isString';
import { IO_TYPE } from '../io/constants';
import { InputConfigBase, OutputConfigBase } from '../io/types';

/**
 * IoConfigを取得する
 * @param config
 * @param isOutput
 * @returns
 */
export default function getIoConfig(config: string | InputConfigBase | OutputConfigBase, isOutput?: boolean) {
  const pathParam = isOutput ? 'outputPath' : 'inputPath';
  return isString(config) ? { type: IO_TYPE.FS, [pathParam]: config } : config || { type: IO_TYPE.NOOP };
}
