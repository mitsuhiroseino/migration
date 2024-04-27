/**
 * 入出力の種別
 */
export const IO_TYPE = {
  /**
   * ファイルシステム
   */
  FS: 'fs',

  /**
   * HTTP
   */
  HTTP: 'http',

  /**
   * なにもしない
   */
  NOOP: 'noop',
} as const;
