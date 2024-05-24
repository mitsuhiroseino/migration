import { CONTENT_TYPE } from '../constants';
import { Content, ContentType, Optional } from '../types';
import asArray from '../utils/asArray';
import getContentType from '../utils/getContentType';
import isMatch from '../utils/isMatch';
import uuid from '../utils/uuid';
import { Operation, OperationParams, OperationResult, TypedOperationConfig } from './types';

export default abstract class OperationBase<
  C extends Content = Content,
  OC extends TypedOperationConfig = TypedOperationConfig,
> implements Operation<C>
{
  readonly contentTypes: ContentType | ContentType[] = CONTENT_TYPE.ANY;
  private _contentTypeMap: { [type: string]: true };

  protected _config: Optional<OC, 'type'>;

  private _operationId: string;

  constructor(config: Optional<OC, 'type'>) {
    this._config = config;
    this._operationId = config.operationId || uuid();
    this._contentTypeMap = asArray(this.contentTypes).reduce((result, contentType) => {
      result[contentType] = true;
      return result;
    }, {});
  }

  getOperationId(): string {
    return this._operationId;
  }

  isOperable(content: C, params: OperationParams): boolean {
    const { disabled, filter } = this._config;
    if (disabled) {
      return false;
    } else if (!isMatch(content, filter, params)) {
      return false;
    }
    const contentType = getContentType(content);
    return contentType == null || this._contentTypeMap[CONTENT_TYPE.ANY] || this._contentTypeMap[contentType];
  }

  /**
   * コンテンツの操作
   * @param content
   * @param params
   */
  abstract operate(content: C, params: OperationParams): Promise<OperationResult<C | Content>>;
}
