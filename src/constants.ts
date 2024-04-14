/**
 * コンテンツの種別
 */
export const CONTENT_TYPE = {
  /**
   * バイナリー
   */
  BINARY: 'binary',

  /**
   * テキスト
   */
  TEXT: 'text',

  /**
   * オブジェクト、配列など任意の値
   * そのままファイルへ出力した場合はJSON形式のテキストに変換される
   */
  OTHER: 'other',

  /**
   * 指定なし
   */
  ANY: 'any',
} as const;
