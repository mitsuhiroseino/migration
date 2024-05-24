import { Content } from '../../types';
import OperationBundlerBase from '../OperationBundlerBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { BundleConfig } from './types';

/**
 * 複数の操作を纏めた操作
 * 設定のoperationsを関数で定義すれば、コンテンツの内容に応じて処理を変更することが可能
 */
class Bundle extends OperationBundlerBase<Content, BundleConfig<Content>> {}

export default Bundle;
OperationFactory.register(OPERATION_TYPE.BUNDLE, Bundle);
