import isBuffer from 'lodash/isBuffer';
import isString from 'lodash/isString';
import { CONTENT_TYPE } from '../constants';

export default function getContentType<C>(content: C) {
  if (isString(content)) {
    return CONTENT_TYPE.TEXT;
  } else if (isBuffer(content)) {
    return CONTENT_TYPE.BINARY;
  } else {
    return CONTENT_TYPE.OTHER;
  }
}
