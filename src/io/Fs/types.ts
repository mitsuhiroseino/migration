import { AssignedParams, CommonFilterableConfig, ItemType, IterationParams, VariableString } from '../../types';
import { ReadAnyFileOptions } from '../../utils/readAnyFile';
import { ReplaceWithConfigsConfig, Replacer } from '../../utils/replaceWithConfigs';
import { WriteAnyFileOptions } from '../../utils/writeAnyFile';
import { IO_TYPE } from '../constants';
import { InputConfigBase, OutputConfigBase, PathInputResultBase, PathOutputResultBase } from '../types';

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
     * any: ディレクトリ・ファイル
     * 未指定: ファイル
     */
    itemType?: ItemType;

    /**
     * 入力のファイル名から削除する拡張子
     * handlebarsの拡張子`.hbs`を削除したい場合などに利用可能
     */
    removeExtensions?: string[];

    /**
     * シンボリックリンクは無視する
     */
    ignoreSymlinks?: boolean;
  };

/**
 * ファイル入力時の処理結果
 */
export type FsInputResult = PathInputResultBase;

/**
 * ファイルへの出力
 */
export type FsOutputConfig = OutputConfigBase<typeof IO_TYPE.FS> &
  Omit<WriteAnyFileOptions, 'encoding'> & {
    /**
     * 出力先ファイル・ディレクトリのパス
     */
    outputPath: VariableString;

    /**
     * 移行先ファイル名
     * 移行先の指定がディレクトリの場合にその配下のファイルの名称を変更する場合に指定する
     */
    itemName?:
      | ReplaceWithConfigsConfig<IterationParams>
      | ReplaceWithConfigsConfig<IterationParams>[]
      | Replacer<IterationParams>
      | Replacer<IterationParams>[]
      | string;
  };

export type FsAssignedParams = AssignedParams<Partial<PathInputResultBase>> & IterationParams & {};

export type FsOutputResult = PathOutputResultBase;
