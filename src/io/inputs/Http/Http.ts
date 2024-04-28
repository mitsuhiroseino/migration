import isFunction from 'lodash/isFunction';
import { ITEM_TYPE } from '../../../constants';
import { Content, DiffParams, IterationParams } from '../../../types';
import fetchHttp from '../../../utils/fetchHttp';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import toAsyncIterable from '../../../utils/toAsyncIterable';
import { IO_TYPE } from '../../constants';
import getItemNameFromUrl from '../../helpers/getItemNameFromUrl';
import { InputReturnValue } from '../../types';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { HttpInputConfig, HttpInputResult } from './types';

/**
 * HTTPによる入力
 */
class Http extends InputBase<Content, HttpInputConfig, HttpInputResult> {
  /**
   * 設定に従ってリクエストを送信する関数
   */
  private _request: (params: IterationParams) => Promise<InputReturnValue<Content, HttpInputResult>>;

  constructor(config: HttpInputConfig) {
    super(config);
    this._request = getRequestFn(config);
  }

  read(params: IterationParams): AsyncIterable<InputReturnValue<Content, HttpInputResult>> {
    return toAsyncIterable(this._request, [params]);
  }

  copy(params: IterationParams): AsyncIterable<InputReturnValue<Content, HttpInputResult>> {
    throw new Error('Cannot use copy in HTTP');
  }

  move(params: IterationParams): AsyncIterable<InputReturnValue<Content, HttpInputResult>> {
    throw new Error('Cannot use move in HTTP');
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    const { dryRun, url, deleteInit, deleteUrl = url } = this._config;
    if (dryRun) {
      return {};
    }
    if (deleteInit) {
      // deleteInitが設定されているときのみ削除可能
      const input: string = finishDynamicValue(deleteUrl, params, this._config);
      const init = isFunction(deleteInit) ? deleteInit(params) : deleteInit;
      // リクエストの送信
      const response = await fetchHttp(input, init);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
    } else {
      throw new Error('To delete via HTTP, set "deleteInit".');
    }
    return {};
  }
}
InputFactory.register(IO_TYPE.HTTP, Http);
export default Http;

/**
 * リクエストを送信する関数を取得する
 * @param config
 * @returns
 */
function getRequestFn(config: HttpInputConfig) {
  return async (params: IterationParams): Promise<InputReturnValue<Content, HttpInputResult>> => {
    const { url, removeIndex, removeExtensions, requestInit } = config;
    const input: string = finishDynamicValue(url, params, config);
    const init = isFunction(requestInit) ? requestInit(params) : requestInit;

    // リクエストの送信
    const response = await fetchHttp(input, init);

    if (response.status !== 200) {
      throw new Error(`Error on HTTP input: ${response.statusText}`);
    }

    // itemNameの取得
    const inputItem = getItemNameFromUrl(input, removeIndex, removeExtensions);

    return {
      content: response.body,
      result: {
        inputItem,
        inputItemType: ITEM_TYPE.NODE,
        inputPath: input,
      },
    };
  };
}
