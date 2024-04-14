import { InputOputputConfig, LogConfig } from '../types';
import log from './log';

export default function throwError(message: string, config: LogConfig & InputOputputConfig) {
  const { forceOutput } = config;
  if (forceOutput) {
    log('error', message, config);
  } else {
    throw new Error(message);
  }
}
