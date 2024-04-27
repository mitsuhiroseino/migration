import isString from 'lodash/isString';
import { IO_TYPE } from '../constants';

export default function getIoConfig(config, pathParam) {
  return isString(config) ? { type: IO_TYPE.FS, [pathParam]: config } : config || { type: IO_TYPE.NOOP };
}
