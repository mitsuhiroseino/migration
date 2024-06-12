import isFunction from 'lodash/isFunction';
import { ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../constants';
import { Content, DiffParams } from '../../types';
import fetchHttp from '../../utils/fetchHttp';
import finishDynamicValue from '../../utils/finishDynamicValue';
import throwError from '../../utils/throwError';
import toAsyncGenerator from '../../utils/toAsyncGenerator';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputReturnValue } from '../types';
import getItemNameFromUrl from './getItemNameFromUrl';
import { HttpAssignedParams, HttpInputConfig, HttpInputResult } from './types';

/**
 * HTTPによる入力
 */
class HttpInput extends InputBase<Content, HttpInputConfig, HttpInputResult> {
  /**
   * 設定に従ってリクエストを送信する関数
   */
  private _request: (params: HttpAssignedParams) => Promise<InputReturnValue<Content, HttpInputResult>>;

  constructor(config: HttpInputConfig) {
    super(config);

    const { requestInit, getContent = getResponseBody, notFoundActionHttpStatus } = this._config;
    // リクエスト関数
    this._request = async (params: HttpAssignedParams): Promise<InputReturnValue<Content, HttpInputResult>> => {
      const { _inputItemPath } = params;
      const init = isFunction(requestInit) ? requestInit(params) : requestInit;

      // リクエストの送信
      const response = await fetchHttp(_inputItemPath, init);

      const isNotFound = Array.isArray(notFoundActionHttpStatus)
        ? notFoundActionHttpStatus.includes(response.status)
        : !response.ok;

      if (isNotFound) {
        // 対象を取得できなかった場合
        return this._handleNotFound(`Error on HTTP input: ${response.statusText}`);
      } else if (response.ok) {
        // 対象を取得できた場合
        return {
          status: MIGRATION_ITEM_STATUS.PROCESSED,
          content: getContent(response),
        };
      }
      // 上記以外はエラー
      throwError(`Error on HTTP input: ${response.statusText}`, this._config);
    };
  }

  protected async _activate(params: HttpAssignedParams): Promise<DiffParams> {
    const config = this._config;
    const { url, removeIndexHtml, removeExtensions } = config;
    const inputItemPath: string = finishDynamicValue(url, params, config);
    return {
      inputItemPath,
      inputItem: getItemNameFromUrl(inputItemPath, removeIndexHtml, removeExtensions),
      inputItemType: ITEM_TYPE.LEAF,
      inputRootPath: inputItemPath,
    };
  }

  protected _read(params: HttpAssignedParams): AsyncIterableIterator<InputReturnValue<Content, HttpInputResult>> {
    return toAsyncGenerator(this._request, [params])();
  }

  protected _copy(params: HttpAssignedParams): AsyncIterableIterator<InputReturnValue<Content, HttpInputResult>> {
    throw new Error('Cannot use copy in HTTP');
  }

  protected _move(params: HttpAssignedParams): AsyncIterableIterator<InputReturnValue<Content, HttpInputResult>> {
    throw new Error('Cannot use move in HTTP');
  }

  protected async _delete(content: Content, params: HttpAssignedParams): Promise<void> {
    const { url, deleteInit, deleteUrl = url } = this._config;
    if (deleteInit) {
      // deleteInitが設定されているときのみ削除可能
      const input: string = finishDynamicValue(deleteUrl, params, this._config);
      const init = isFunction(deleteInit) ? deleteInit(params) : deleteInit;
      // リクエストの送信
      const response = await fetchHttp(input, init);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } else {
      throw new Error('To delete via HTTP, set "deleteInit".');
    }
  }
}
InputFactory.register(IO_TYPE.HTTP, HttpInput);
export default HttpInput;

function getResponseBody(response: Response) {
  return response.body;
}
