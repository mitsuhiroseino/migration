import Factory from '../../utils/Factory';
import { Output } from './types';

class OutputFactory extends Factory<Output<any, any, any>> {}

export default new OutputFactory();
