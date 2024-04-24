import { CONTENT_TYPE } from '../constants';
import { Content, ContentType, Optional } from '../types';
import getContentType from '../utils/getContentType';
import isMatch from '../utils/isMatch';
import { Operation, OperationParams, TypedOperationConfig } from './types';

export default abstract class OperationBase<
  C extends Content = Content,
  OC extends TypedOperationConfig = TypedOperationConfig,
> implements Operation<C>
{
  readonly contentTypes: ContentType | ContentType[] = CONTENT_TYPE.ANY;

  protected _config: Optional<OC, 'type'>;

  private _operationId: string;

  constructor(config: Optional<OC, 'type'>) {
    this._config = config;
    this._operationId = config.operationId || String(Date.now());
  }

  getOperationId(): string {
    return this._operationId;
  }

  isOperable(content: C, params: OperationParams): boolean {
    if (this._config.disabled) {
      return false;
    } else if (content == null || !isMatch(content, this._config.filter, params)) {
      return false;
    }
    const contentType = getContentType(content);
    return contentType == null || this.contentTypes === CONTENT_TYPE.ANY || contentType === this.contentTypes;
  }

  /**
   * コンテンツの操作
   * @param content
   * @param params
   */
  abstract operate(content: C, params: OperationParams): Promise<C | Content>;
}
