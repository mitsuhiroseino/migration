{{#each manipulations}}
import { {{uppercamelcase}}Config } from './{{uppercamelcase}}';
{{/each}}

type SharpManipulationConfig =
{{#each manipulations}}
  | {{uppercamelcase}}Config
  {{/each}}

export default SharpManipulationConfig;
