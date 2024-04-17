import Factory from '../../utils/Factory';
import { Input } from './types';

class InputFactory extends Factory<Input<any, any>> {}

export default new InputFactory();
