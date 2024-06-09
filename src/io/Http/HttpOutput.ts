import isFunction from 'lodash/isFunction';
import { ITEM_TYPE } from '../../constants';
import { Content, DiffParams } from '../../types';
import fetchHttp from '../../utils/fetchHttp';
import finishDynamicValue from '../../utils/finishDynamicValue';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import getItemNameFromUrl from './getItemNameFromUrl';
import { HttpAssignedParams, HttpOutputConfig, HttpOutputResult } from './types';

/**
 * HTTPによる出力
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
class HttpOutput extends OutputBase<Content, HttpOutputConfig, HttpOutputResult> {
  protected async _activate(params: HttpAssignedParams): Promise<DiffParams> {
    const config = this._config;
    const { url, removeIndex, removeExtensions } = config;
    const outputItemPath: string = finishDynamicValue(url, params, config);
    return {
      outputItemPath,
      outputItem: getItemNameFromUrl(outputItemPath, removeIndex, removeExtensions),
      outputItemType: ITEM_TYPE.LEAF,
      outputRootPath: outputItemPath,
    };
  }

  protected async _write(content: any, params: HttpAssignedParams): Promise<void> {
    const { _outputItemPath } = params;
    const { requestInit } = this._config;

    // リクエストの送信
    const init = isFunction(requestInit) ? requestInit(content, params) : requestInit;
    const response = await fetchHttp(_outputItemPath, init);

    if (response.status !== 200) {
      throw new Error(`Error on HTTP output: ${response.statusText}`);
    }
  }

  protected async _copy(params: HttpAssignedParams): Promise<void> {
    throw new Error('Cannot use copy in HTTP');
  }

  protected async _move(params: HttpAssignedParams): Promise<void> {
    throw new Error('Cannot use move in HTTP');
  }
}

OutputFactory.register(IO_TYPE.NOOP, HttpOutput);
export default HttpOutput;
