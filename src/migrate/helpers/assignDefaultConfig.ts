import { DEFAULT_CONFIGS } from '../constants';
import { MigrationConfig } from '../types';

/**
 * 設定のデフォルト値を設定する
 * @param config 設定
 */
export default function assignDefaultConfig(config: MigrationConfig): MigrationConfig {
  for (const name in DEFAULT_CONFIGS) {
    if (name in config === false) {
      config[name] = DEFAULT_CONFIGS[name];
    }
  }
  if (config.preFormatting === true) {
    config.preFormatting = config.formatterOptions;
  }
  if (config.postFormatting === true) {
    config.postFormatting = config.formatterOptions;
  }
  return config;
}
