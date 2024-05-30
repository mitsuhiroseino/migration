/**
 * 入出力の種別
 */
export const IO_TYPE = {
  /**
   * 任意の形式
   */
  ANY: 'any',

  /**
   * データ
   */
  DATA: 'data',

  /**
   * データベース
   */
  DB: 'db',

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
