import { AssignedParams, Content, IterationParams, VariableString } from '../../types';
import { FetchHttpInit } from '../../utils/fetchHttp';
import { IO_TYPE } from '../constants';
import { InputConfigBase, OutputConfigBase, PathInputResultBase, PathOutputResultBase } from '../types';

/**
 * HTTP入力の設定
 */
export type HttpInputConfig = InputConfigBase<typeof IO_TYPE.HTTP> & {
  /**
   * URL
   */
  url: VariableString;

  /**
   * inputItemに設定する値はindexを除外する
   * 例: url='http://localhost/foo/index.html'の場合
   *
   * - false: inputItem='index.html'
   * - true: inputItem='foo'
   */
  removeIndexHtml?: boolean;

  /**
   * 入力のファイル名から削除する拡張子
   * `.html`を削除したい場合などに利用可能
   */
  removeExtensions?: string[];

  /**
   * リクエストのオプション
   */
  requestInit?: FetchHttpInit | ((params: IterationParams) => FetchHttpInit);

  /**
   * 削除時のURL
   * 未指定の場合はURLと同じ
   */
  deleteUrl?: VariableString;

  /**
   * 削除処理のオプション
   * 未指定の場合move,deleteを実行してもリソースは削除されない
   * @param params
   */
  deleteInit?: FetchHttpInit | ((params: IterationParams) => FetchHttpInit);

  /**
   * レスポンスからコンテンツを取得する関数
   * 未指定の場合のコンテンツはResponse.body
   * @returns
   */
  getContent?: (response: Response) => Content;

  /**
   * notFoundActionで扱うHTTPステータス
   * 未指定の場合はresponse.okがfalseのものをnotFoundActionで扱う
   */
  notFoundActionHttpStatus?: number[];
};

/**
 * HTTP入力時の処理結果
 */
export type HttpInputResult = PathInputResultBase;

/**
 * HTTP出力の設定
 */
export type HttpOutputConfig = OutputConfigBase<typeof IO_TYPE.HTTP> & {
  /**
   * URL
   */
  url?: VariableString;

  /**
   * inputItemに設定する値としてindexは除外する
   * 例: url='http://localhost/foo/index.html'の場合
   *
   * - false: inputItem='index.html'
   * - true: inputItem='foo'
   */
  removeIndex?: boolean;

  /**
   * 入力のファイル名から削除する拡張子
   * `.html`を削除したい場合などに利用可能
   */
  removeExtensions?: string[] | boolean;

  /**
   *
   */
  requestInit?: FetchHttpInit | ((content: any, params: IterationParams) => FetchHttpInit);
};

/**
 * HTTP出力の処理結果
 */
export type HttpOutputResult = PathOutputResultBase;

export type HttpAssignedParams = AssignedParams<Partial<HttpInputResult> & Partial<HttpOutputResult>> &
  IterationParams & {};
