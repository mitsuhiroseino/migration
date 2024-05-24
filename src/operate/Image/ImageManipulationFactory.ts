import Factory from '../../utils/Factory';
import { ImageManipulationFn } from './types';

class ImageManipulationFactory extends Factory<ImageManipulationFn<any>> {}

export default new ImageManipulationFactory();
