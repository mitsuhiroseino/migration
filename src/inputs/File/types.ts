import { VariableString } from '../../types';
import { INPUT_TYPE } from '../constants';
import { InputConfigBase } from '../types';

export type FileInputConfig = InputConfigBase<typeof INPUT_TYPE.FILE> & {
  /**
   * 入力元ファイル・ディレクトリのパス
   */
  inputPath: VariableString;

  /**
   * 処理対象がディレクトリの場合にサブディレクトリは処理しない
   */
  ignoreSubDir?: boolean;

  /**
   * ファイルをバイナリ形式で読み込んで処理する
   */
  binary?: boolean;

  /**
   * テキストファイル読み込み時のエンコーディング
   * 未指定の場合はutf8
   */
  inputEncoding?: BufferEncoding;
};
