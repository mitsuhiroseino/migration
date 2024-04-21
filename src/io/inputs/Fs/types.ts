import { FilterableConfig, ItemType, VariableString } from '../../../types';
import { IO_TYPE } from '../../constants';
import { FsInputConfigBase, FsInputResultBase, InputConfigBase } from '../../types';

export type FsInputConfig = InputConfigBase<typeof IO_TYPE.FS> &
  FsInputConfigBase &
  FilterableConfig<string> & {
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
  };

/**
 * ファイル入力時の処理結果
 */
export type FsInputResult = FsInputResultBase;
