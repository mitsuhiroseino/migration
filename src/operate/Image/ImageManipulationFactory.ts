import Factory from '../../utils/Factory';
import { ImageManipulation } from './types';

class ImageManipulationFactory extends Factory<ImageManipulation<any>> {}

export default new ImageManipulationFactory();
