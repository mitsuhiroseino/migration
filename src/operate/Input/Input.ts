import { Content } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import readAnyFile from '../../utils/readAnyFile';
import OperationFactory from '../OperationFactory';
import Params from '../Params';
import { OPERATION_TYPE } from '../constants';
import { Operation, OperationParams } from '../types';
import { InputConfig } from './types';

/**
 * ファイルを入力して内容をparamsに設定する操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Input: Operation<Content, InputConfig<Content>> = async (content, config, params) => {
  const { type, inputPath, preserveInputPath, paramName = '_resource', preserveParamName, ...rest } = config;

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
  const createDiff = async (cnt: Content, prms: OperationParams) => {
    const resource = await readAnyFile(inputFilePath, rest);
    return { [prmsName]: resource };
  };

  return await Params(content, { ...rest, createDiff }, params);
};
export default Input;
OperationFactory.register(OPERATION_TYPE.INPUT, Input);