import { CommonDevelopmentConfig, CommonLogConfig } from '../types';
import log from './log';

export default function throwError(message: string, config: CommonLogConfig & CommonDevelopmentConfig) {
  const { forceOutput } = config;
  if (forceOutput) {
    log('error', message, config);
  } else {
    throw new Error(message);
  }
}
