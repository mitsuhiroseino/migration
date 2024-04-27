import { IterationParams, VariableString } from '../../../types';
import { FetchHttpInit } from '../../../utils/fetchHttp';
import { IO_TYPE } from '../../constants';
import { OutputConfigBase, OutputResultBase } from '../../types';

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
  removeExtensions?: string[];

  /**
   *
   */
  requestInit?: FetchHttpInit | ((content: any, params: IterationParams) => FetchHttpInit);
};

/**
 * HTTP出力の処理結果
 */
export type HttpOutputResult = OutputResultBase;
