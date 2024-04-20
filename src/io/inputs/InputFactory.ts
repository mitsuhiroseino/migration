import Factory from '../../utils/Factory';
import { Input, InputConfigBase } from './types';

class InputFactory extends Factory<any> {
  create(config: InputConfigBase): Input<any> {
    const Class = this.get(config.type);
    if (Class) {
      return new Class(config);
    } else {
      throw new Error(`Input "${config.type}" is not found.`);
    }
  }
}

export default new InputFactory();
