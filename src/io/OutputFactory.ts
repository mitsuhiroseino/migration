import Factory from '../utils/Factory';
import throwError from '../utils/throwError';
import { Output, OutputConfigBase } from './types';

class OutputFactory extends Factory<any> {
  create(config: OutputConfigBase): Output<any> {
    const Class = this.get(config.type);
    if (Class) {
      return new Class(config);
    } else {
      throwError(`Output "${config.type}" is not found.`, config);
    }
  }
}

export default new OutputFactory();
