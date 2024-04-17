import isString from 'lodash/isString';
import { CONTENT_TYPE } from '../constants';
import { ContentType } from '../types';
import Factory, { FactoriableConfig } from '../utils/Factory';
import asArray from '../utils/asArray';
import { Operation } from './types';

class OperationFactory extends Factory<Operation<any, any>> {
  /**
   * ファイルに対する操作
   */
  private _contentTypes: {
    [type: string]: { [K in ContentType]?: true };
  } = {};

  /**
   * 操作の登録
   * @param type 操作種別
   * @param operation 操作
   * @param contentTypes 操作対象のコンテンツ種別
   */
  register(type: string, operation: Operation<any, any>, contentTypes: ContentType | ContentType[] = CONTENT_TYPE.ANY) {
    super.register(type, operation);
    this._contentTypes[type] = asArray(contentTypes).reduce((result, contentType) => {
      result[contentType] = true;
      return result;
    }, {});
  }

  /**
   * 操作の取得
   * @param type 操作種別
   * @param contentType 処理対象のコンテンツ種別
   * @returns
   */
  get<T extends string>(type: T | FactoriableConfig<T>, contentType?: ContentType): Operation<any, any> {
    if (!isString(type)) {
      type = type.type;
    }
    const cType = this._contentTypes[type];
    if (cType && (contentType == null || cType[contentType] || cType[CONTENT_TYPE.ANY])) {
      return super.get(type);
    }
  }
}

export default new OperationFactory();
