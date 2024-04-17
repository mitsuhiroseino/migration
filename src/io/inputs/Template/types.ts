import { FilterableConfig, ItemType, VariableString } from '../../../types';
import { FsInputConfig, FsInputResult } from '../../types';
import { INPUT_TYPE } from '../constants';
import { InputConfigBase } from '../types';

export type TemplateInputConfig = InputConfigBase<typeof INPUT_TYPE.TEMPLATE> &
  FsInputConfig &
  FilterableConfig<string> & {
    /**
     * テンプレートの入力元パス
     */
    templatePath: VariableString;

    /**
     * handlebarsのコンパイルオプション
     */
    compileOptions: CompileOptions;

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
export type TemplateInputResult = FsInputResult;
