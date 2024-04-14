import { InputOputputConfig, LogConfig } from '../types';
import log from './log';

export default function catchError(error: any, message: string, config: LogConfig & InputOputputConfig) {
  const { forceOutput } = config;
  if (forceOutput) {
    log('error', message, config);
  } else {
    if ('message' in error) {
      error.message = `${message} (${error.message})`;
    } else {
      error = new Error(`${message} (${error})`);
    }
    throw error;
  }
}
