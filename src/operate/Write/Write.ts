import { Content } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import writeAnyFile from '../../utils/writeAnyFile';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { WriteConfig } from './types';

/**
 * ファイルを出力する操作
 */
class Write extends OperationBase<Content, WriteConfig> {
  async operate(content: Content, params: OperationParams): Promise<Content> {
    const { outputPath, preserveOutputPath, paramName = '_resource', preserveParamName, ...rest } = this._config;

    // 出力パス
    const outputFilePath: string = finishDynamicValue(outputPath, params, {
      ...rest,
      preserveString: preserveOutputPath,
    });

    // パラメーター名
    const prmsName: string = finishDynamicValue(paramName, params, {
      ...rest,
      preserveString: preserveParamName,
    });

    // ファイルの出力
    const resource = params[prmsName];
    await writeAnyFile(outputFilePath, resource, rest);

    return content;
  }
}
export default Write;
OperationFactory.register(OPERATION_TYPE.WRITE, Write);
