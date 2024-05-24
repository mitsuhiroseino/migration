import Factory from '../../utils/Factory';
import { SharpManipulationFn } from './types';

class SharpManipulationFactory extends Factory<SharpManipulationFn<any>> {}

export default new SharpManipulationFactory();
