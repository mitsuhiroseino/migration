import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { {{uppercamelcase}}Config } from './types';

/**
 * {{{name}}}
 * 
 * {{{description}}}
 * 
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-{{lowercamelcase}}
 * 
 * @param state gmのインスタンス(ステート)
 * @param config {{uppercamelcase}}のコンフィグ
 * @returns gmのインスタンス
 */
const {{uppercamelcase}}: GmManipulation<{{uppercamelcase}}Config> = (state, config) => {
  const { {{args}} } = config;
  {{#if (eq uppercamelcase "BlackThreshold")}}
  if (intensity == null) {
    return state.blackThreshold(red, green, blue, opacity);
  } else {
    return state.blackThreshold(intensity);
  }
{{else if (eq uppercamelcase "Geometry")}}
  if (geometry == null) {
    return state.geometry(width, height, option);
  } else {
    return state.geometry(geometry);
  }
{{else if (eq uppercamelcase "Repage")}}
  if (reset == null) {
    return state.repage(width, height, xoff, yoff, arg);
  } else {
    return state.repage(reset);
  }
{{else if (eq uppercamelcase "WhiteThreshold")}}
  if (intensity == null) {
    return state.whiteThreshold(red, green, blue, opacity);
  } else {
    return state.whiteThreshold(intensity);
  }
{{else if (eq uppercamelcase "In")}}
  return state.in(...customArguments);
{{else if (eq uppercamelcase "Out")}}
  return state.out(...customArguments);
{{else}}
  return state.{{lowercamelcase}}({{args}});
{{/if}}
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.{{snakecase}}, {{uppercamelcase}});
export default {{uppercamelcase}};
