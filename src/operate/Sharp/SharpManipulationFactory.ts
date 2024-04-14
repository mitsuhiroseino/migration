import Factory from '../../utils/Factory';
import { SharpManipulation } from './types';

class SharpManipulationFactory extends Factory<SharpManipulation<any, any>> {}

export default new SharpManipulationFactory();
