/**
 * テキストに対する操作の種別
 */
export const OPERATION_TYPE = {
  /**
   * 文字列の追加
   */
  ADD: 'add',

  /**
   * 複数の処理を纏めた処理
   */
  BUNDLE: 'bundle',

  /**
   * 文字列の削除
   */
  DELETE: 'delete',

  /**
   * コンテンツの編集
   */
  EDIT: 'edit',

  /**
   * プレイスホルダーへの値の埋め込み
   */
  FILL: 'fill',

  /**
   * 文字列の整形
   */
  FORMAT: 'format',

  /**
   * テンプレートエンジンを使用した生成
   */
  GENERATE: 'generate',

  /**
   * gmを用いた画像の変換
   */
  GM: 'gm',

  /**
   * 条件に応じた操作の切り替え
   */
  IF: 'if',

  /**
   * 画像の変換
   */
  IMAGE: 'image',

  /**
   * 文字列をオブジェクトや配列に変換する
   */
  PARSE: 'parse',

  /**
   * パラメーターの追加
   */
  PARAMS: 'params',

  /**
   * リソースをファイルから読み込む
   */
  READ: 'read',

  /**
   * 文字列の置換
   */
  REPLACE: 'replace',

  /**
   * sharpを用いた画像の変換
   */
  SHARP: 'sharp',

  /**
   * オブジェクトや配列を文字列に変換する
   */
  STRINGIFY: 'stringify',

  /**
   * BOMの削除
   */
  UNBOM: 'unbom',

  /**
   * 繰り返し
   */
  WHILE: 'while',

  /**
   * リソースをファイルに書き込む
   */
  WRITE: 'write',
} as const;
