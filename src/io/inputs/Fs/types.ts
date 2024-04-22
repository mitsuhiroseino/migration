import { CommonFilterableConfig, ItemType, VariableString } from '../../../types';
import { ReadAnyFileOptions } from '../../../utils/readAnyFile';
import { IO_TYPE } from '../../constants';
import { FsInputResultBase, InputConfigBase } from '../../types';

export type FsInputConfig = InputConfigBase<typeof IO_TYPE.FS> &
  Omit<ReadAnyFileOptions, 'encoding'> &
  CommonFilterableConfig<string> & {
    /**
     * 入力元ファイル・ディレクトリのパス
     */
    inputPath: VariableString;

    /**
     * 処理対象がディレクトリの場合にサブディレクトリは処理しない
     */
    ignoreSubDir?: boolean;

    /**
     * 取得対象の種別
     * node: ディレクトリ
     * leaf: ファイル
     * 未指定: ディレクトリ & ファイル
     */
    itemType?: ItemType;

    /**
     * 入力のファイル名から削除する拡張子
     * handlebarsの拡張子`.hbs`を削除したい場合などに利用可能
     */
    removeExtensions?: string[];
  };

/**
 * ファイル入力時の処理結果
 */
export type FsInputResult = FsInputResultBase;
