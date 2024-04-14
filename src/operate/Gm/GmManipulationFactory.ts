import Factory from '../../utils/Factory';
import { GmManipulation } from './types';

class GmManipulationFactory extends Factory<GmManipulation<any>> {}

export default new GmManipulationFactory();
