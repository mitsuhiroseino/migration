/**
 * 1ファイルorディレクトリ毎の処理結果
 */
export const MIGRATION_ITEM_STATUS = {
  /**
   * コピー
   */
  COPIED: 'copied',

  /**
   * 変換
   */
  CONVERTED: 'converted',

  /**
   * 新規作成
   */
  CREATED: 'created',

  /**
   * 処理済
   */
  PROCESSED: 'processed',

  /**
   * スキップ
   */
  SKIPPED: 'skipped',

  /**
   * 処理対象なし
   */
  NONE: 'none',

  /**
   * 未処理
   */
  PENDING: 'pending',
} as const;
