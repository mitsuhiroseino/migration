import InputFactory from '../../io/InputFactory';
import OutputFactory from '../../io/OutputFactory';
import OperationFactory from '../../operate/OperationFactory';
import { Plugin } from '../../types';
import asArray from '../../utils/asArray';

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
      OperationFactory.register(type, operations[type]);
    }
  }
}
