import Jimp from 'jimp';
import { CONTENT_TYPE } from '../../constants';
import asArray from '../../utils/asArray';
import throwError from '../../utils/throwError';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation, OperationParams } from '../types';
import ImageManipulationFactory from './ImageManipulationFactory';
import { ImageConfig } from './types';

/**
 * 画像のメタ情報をparamsに追加する
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Image: Operation<Buffer, ImageConfig> = async (content: Buffer, config: ImageConfig, params: OperationParams) => {
  const { manipulations, mime } = config;
  let jimp = await Jimp.read(content);

  for (const manipulationConfig of asArray(manipulations)) {
    const manipulation = ImageManipulationFactory.get(manipulationConfig.type);
    if (manipulation) {
      jimp = await manipulation(jimp, manipulationConfig);
    } else {
      throwError(`There was no manipulation "${manipulationConfig.type}".`, config);
    }
  }

  let mimeType;
  if (mime) {
    mimeType = mime;
  } else {
    mimeType = jimp.getMIME();
  }

  return await jimp.getBufferAsync(mimeType);
};
export default Image;
OperationFactory.register(OPERATION_TYPE.IMAGE, Image, CONTENT_TYPE.BINARY);
