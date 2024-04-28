import isFunction from 'lodash/isFunction';
import { ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../../constants';
import { Content, IterationParams } from '../../../types';
import fetchHttp from '../../../utils/fetchHttp';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import { IO_TYPE } from '../../constants';
import getItemNameFromUrl from '../../helpers/getItemNameFromUrl';
import { OutputReturnValue } from '../../types';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { HttpOutputConfig, HttpOutputResult } from './types';

/**
 * HTTPによる出力
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
class Http extends OutputBase<Content, HttpOutputConfig, HttpOutputResult> {
  async write(content: any, params: IterationParams): Promise<OutputReturnValue<HttpOutputResult>> {
    const result: HttpOutputResult = await request(content, this._config, params);
    return { status: MIGRATION_ITEM_STATUS.CONVERTED, result };
  }

  async copy(params: IterationParams): Promise<OutputReturnValue<HttpOutputResult>> {
    throw new Error('Cannot use copy in HTTP');
  }

  async move(params: IterationParams): Promise<OutputReturnValue<HttpOutputResult>> {
    throw new Error('Cannot use move in HTTP');
  }
}

OutputFactory.register(IO_TYPE.NOOP, Http);
export default Http;

async function request(content: any, config: HttpOutputConfig, params: IterationParams): Promise<HttpOutputResult> {
  const { dryRun, url, removeIndex, removeExtensions, requestInit } = config;
  const output: string = finishDynamicValue(url, params, config);

  // リクエストの送信
  if (!dryRun) {
    const init = isFunction(requestInit) ? requestInit(content, params) : requestInit;
    const response = await fetchHttp(output, init);

    if (response.status !== 200) {
      throw new Error(`Error on HTTP output: ${response.statusText}`);
    }
  }

  // itemNameの取得
  const outputItem = getItemNameFromUrl(output, removeIndex, removeExtensions);

  return {
    outputItem,
    outputItemType: ITEM_TYPE.NODE,
    outputPath: output,
  };
}
