import Factory from '../utils/Factory';
import throwError from '../utils/throwError';
import { Input, InputConfigBase } from './types';

class InputFactory extends Factory<any> {
  create<C extends InputConfigBase>(config: C): Input<any> {
    const Class = this.get(config.type);
    if (Class) {
      return new Class(config);
    } else {
      throwError(`Input "${config.type}" is not found.`, config);
    }
  }
}

export default new InputFactory();
