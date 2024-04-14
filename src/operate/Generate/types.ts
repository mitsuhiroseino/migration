import { compile } from 'handlebars';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * テンプレートエンジンを使用した生成の設定
 */
export type GenerateConfig = OperationConfigBase<typeof OPERATION_TYPE.GENERATE> & Parameters<typeof compile>[1] & {};
