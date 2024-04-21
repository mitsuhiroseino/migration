import { AssignedParams, IterationParams, VariableString } from '../../../types';
import { ReplaceWithConfigsConfig, Replacer } from '../../../utils/replaceWithConfigs';
import { WriteAnyFileOptions } from '../../../utils/writeAnyFile';
import { IO_TYPE } from '../../constants';
import { FsInputResultBase, FsOutputResultBase, OutputConfigBase } from '../../types';

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
      | Replacer<IterationParams>[];
  };

export type FsAssignedParams = AssignedParams<Partial<FsInputResultBase>> & IterationParams & {};

export type FsOutputResult = FsOutputResultBase;
