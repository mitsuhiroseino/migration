import { GM_MANIPULATION_TYPE } from '../constants';
import {
  ChannelOperator,
  ChannelType,
  ColorSpace,
  CompareCallback,
  ComposeOperator,
  CompressionType,
  DisposeMethod,
  Encoding,
  EndianType,
  FilterType,
  GetterCallback,
  GravityDirection,
  HighlightStyle,
  ImageType,
  IntentType,
  InterlaceType,
  LimitType,
  ListType,
  NamedColor,
  NoiseType,
  OperationMode,
  PreviewType,
  ResizeOption,
  SetDrawMethod,
  SetDrawProperty,
  UnitType,
  VirtualPixelMethod,
  VisualType,
  WriteCallback,
} from 'gm';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`{{uppercamelcase}}`の設定
 */
export type {{uppercamelcase}}Config = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.{{snakecase}}> & {
{{#each argDefs}}
  {{{this}}}
{{/each}}
};
