import { CommonDevelopmentConfig, CommonLogConfig } from '../types';
import log from './log';

export default function catchError(error: any, message: string, config: CommonLogConfig & CommonDevelopmentConfig) {
  const { forceOutput } = config;
  if (forceOutput) {
    log('error', message, config);
  } else {
    if ('message' in error) {
      error.message = `${message} "${error.message}"`;
    } else {
      error = new Error(`${message} "${error}"`);
    }
    if (error instanceof Error && error.stack) {
      console.trace(error.stack);
    }
    throw error;
  }
}
