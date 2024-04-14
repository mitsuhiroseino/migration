import { AffineConfig } from './Affine';
import { BandboolConfig } from './Bandbool';
import { BlurConfig } from './Blur';
import { BooleanConfig } from './Boolean';
import { ClaheConfig } from './Clahe';
import { CompositeConfig } from './Composite';
import { ConvolveConfig } from './Convolve';
import { EnsureAlphaConfig } from './EnsureAlpha';
import { ExtendConfig } from './Extend';
import { ExtractConfig } from './Extract';
import { ExtractChannelConfig } from './ExtractChannel';
import { FlattenConfig } from './Flatten';
import { FlipConfig } from './Flip';
import { FlopConfig } from './Flop';
import { GammaConfig } from './Gamma';
import { GrayscaleConfig } from './Grayscale';
import { GreyscaleConfig } from './Greyscale';
import { JoinChannelConfig } from './JoinChannel';
import { LinearConfig } from './Linear';
import { MedianConfig } from './Median';
import { ModulateConfig } from './Modulate';
import { NegateConfig } from './Negate';
import { NormaliseConfig } from './Normalise';
import { NormalizeConfig } from './Normalize';
import { PipelineColorspaceConfig } from './PipelineColorspace';
import { PipelineColourspaceConfig } from './PipelineColourspace';
import { RecombConfig } from './Recomb';
import { RemoveAlphaConfig } from './RemoveAlpha';
import { ResizeConfig } from './Resize';
import { RotateConfig } from './Rotate';
import { SharpenConfig } from './Sharpen';
import { ThresholdConfig } from './Threshold';
import { TintConfig } from './Tint';
import { ToColorspaceConfig } from './ToColorspace';
import { ToColourspaceConfig } from './ToColourspace';
import { TrimConfig } from './Trim';
import { UnflattenConfig } from './Unflatten';

type SharpManipulationConfig =
  | ExtendConfig
  | ExtractConfig
  | ResizeConfig
  | TrimConfig
  | CompositeConfig
  | AffineConfig
  | BlurConfig
  | BooleanConfig
  | ClaheConfig
  | ConvolveConfig
  | FlattenConfig
  | FlipConfig
  | FlopConfig
  | GammaConfig
  | LinearConfig
  | MedianConfig
  | ModulateConfig
  | NegateConfig
  | NormaliseConfig
  | NormalizeConfig
  | RecombConfig
  | RotateConfig
  | SharpenConfig
  | ThresholdConfig
  | UnflattenConfig
  | GrayscaleConfig
  | GreyscaleConfig
  | PipelineColorspaceConfig
  | PipelineColourspaceConfig
  | TintConfig
  | ToColorspaceConfig
  | ToColourspaceConfig
  | BandboolConfig
  | EnsureAlphaConfig
  | ExtractChannelConfig
  | JoinChannelConfig
  | RemoveAlphaConfig;

export default SharpManipulationConfig;
