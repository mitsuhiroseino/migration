import Factory from '../../utils/Factory';
import { GmManipulationFn } from './types';

class GmManipulationFactory extends Factory<GmManipulationFn<any>> {}

export default new GmManipulationFactory();
