import InputFactory from '../../io/inputs/InputFactory';
import OutputFactory from '../../io/outputs/OutputFactory';
import OperationFactory from '../../operate/OperationFactory';
import asArray from '../../utils/asArray';
import { Plugin } from '../types';

export default function registerPlugins(plugins: Plugin | Plugin[]) {
  // プラグインの有効化
  for (const plugin of asArray(plugins)) {
    const { inputs = {}, outputs = {}, operations = {} } = plugin;
    for (const type in inputs) {
      InputFactory.register(type, inputs[type]);
    }
    for (const type in outputs) {
      OutputFactory.register(type, outputs[type]);
    }
    for (const type in operations) {
      const { operation, contentTypes } = operations[type];
      OperationFactory.register(type, operation, contentTypes);
    }
  }
}
