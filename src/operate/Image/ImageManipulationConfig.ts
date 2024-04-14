import { BlitConfig } from './Blit';
import { BlurConfig } from './Blur';
import { ColorConfig } from './Color';
import { ContainConfig } from './Contain';
import { CoverConfig } from './Cover';
import { DisplaceConfig } from './Displace';
import { DitherConfig } from './Dither';
import { FlipConfig } from './Flip';
import { GaussianConfig } from './Gaussian';
import { InvertConfig } from './Invert';
import { MaskConfig } from './Mask';
import { NormalizeConfig } from './Normalize';
import { PrintConfig } from './Print';
import { ResizeConfig } from './Resize';
import { RotateConfig } from './Rotate';
import { ScaleConfig } from './Scale';

type ImageManipulationConfig =
  | BlitConfig
  | BlurConfig
  | ColorConfig
  | ContainConfig
  | CoverConfig
  | DisplaceConfig
  | DitherConfig
  | FlipConfig
  | GaussianConfig
  | InvertConfig
  | MaskConfig
  | NormalizeConfig
  | PrintConfig
  | ResizeConfig
  | RotateConfig
  | ScaleConfig;

export default ImageManipulationConfig;
