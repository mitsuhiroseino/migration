import { Content } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import readAnyFile from '../../utils/readAnyFile';
import OperationFactory from '../OperationFactory';
import ParentOperationBase from '../ParentOperationBase';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { ReadConfig } from './types';

/**
 * ファイルを入力して内容をparamsに設定する操作
 */
class Read extends ParentOperationBase<Content, ReadConfig<Content>> {
  async operate(content: Content, params: OperationParams): Promise<Content> {
    const { type, inputPath, preserveInputPath, paramName = '_resource', preserveParamName, ...rest } = this._config;

    // 入力パス
    const inputFilePath: string = finishDynamicValue(inputPath, params, {
      ...rest,
      preserveString: preserveInputPath,
    });

    // パラメーター名
    const prmsName: string = finishDynamicValue(paramName, params, {
      ...rest,
      preserveString: preserveParamName,
    });

    // paramsへ追加する値を作成する関数
    const resource = await readAnyFile(inputFilePath, rest);

    // 子要素で処理
    return super.operate(content, { ...params, [prmsName]: resource });
  }
}
export default Read;
OperationFactory.register(OPERATION_TYPE.READ, Read);
