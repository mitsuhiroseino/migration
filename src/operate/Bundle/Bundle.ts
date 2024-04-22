import { Content } from '../../types';
import OperationFactory from '../OperationFactory';
import ParentOperationBase from '../ParentOperationBase';
import { OPERATION_TYPE } from '../constants';
import { BundleConfig } from './types';

/**
 * 複数の操作を纏めた操作
 * 設定のoperationsを関数で定義すれば、コンテンツの内容に応じて処理を変更することが可能
 */
class Bundle extends ParentOperationBase<Content, BundleConfig<Content>> {}

export default Bundle;
OperationFactory.register(OPERATION_TYPE.BUNDLE, Bundle);
