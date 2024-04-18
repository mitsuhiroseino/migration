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
   * 画像の変換
   */
  IMAGE: 'image',

  /**
   * リソースをファイルから読み込む
   */
  INPUT: 'input',

  /**
   * 文字列をオブジェクトや配列に変換する
   */
  PARSE: 'parse',

  /**
   * オブジェクトや配列を文字列に変換する
   */
  STRINGIFY: 'stringify',

  /**
   * リソースをファイルに書き込む
   */
  OUTPUT: 'output',

  /**
   * パラメーターの追加
   */
  PARAMS: 'params',

  /**
   * 文字列の置換
   */
  REPLACE: 'replace',

  /**
   * sharpを用いた画像の変換
   */
  SHARP: 'sharp',

  /**
   * BOMの削除
   */
  UNBOM: 'unbom',
} as const;
