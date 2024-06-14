import colors from 'ansi-colors';
import cliProgress from 'cli-progress';
import { MIGRATION_ITEM_STATUS } from '../constants';
import { MigrationItemStatus } from '../types';
import replacePlaceholders from './replacePlaceholders';

const FORMAT = '[{{status}}] {{item}}';

const COLOR = {
  [MIGRATION_ITEM_STATUS.PROCESSING]: (message: string) => colors.yellow(message),
  [MIGRATION_ITEM_STATUS.NONE]: (message: string) => colors.gray(message),
  [MIGRATION_ITEM_STATUS.BREAK]: (message: string) => colors.gray(message),
  [MIGRATION_ITEM_STATUS.SKIPPED]: (message: string) => colors.gray(message),
  [MIGRATION_ITEM_STATUS.UNKNOWN]: (message: string) => colors.white(message),
  [MIGRATION_ITEM_STATUS.PROCESSED]: (message: string) => colors.white(message),
  [MIGRATION_ITEM_STATUS.CONVERTED]: (message: string) => colors.white(message),
  [MIGRATION_ITEM_STATUS.CREATED]: (message: string) => colors.white(message),
  [MIGRATION_ITEM_STATUS.COPIED]: (message: string) => colors.white(message),
  [MIGRATION_ITEM_STATUS.MOVED]: (message: string) => colors.white(message),
  [MIGRATION_ITEM_STATUS.DELETED]: (message: string) => colors.white(message),
  [MIGRATION_ITEM_STATUS.ERROR]: (message: string) => colors.red(message),
};

export default class ItemLogger {
  private _progress: cliProgress.SingleBar;

  constructor() {
    this._progress = new cliProgress.SingleBar(
      {
        format: '{message}',
        hideCursor: true,
        barsize: 0,
        linewrap: false,
      },
      cliProgress.Presets.shades_classic,
    );
  }

  log(item: string, status: MigrationItemStatus = MIGRATION_ITEM_STATUS.PROCESSING) {
    const progress = this._progress;
    const message = COLOR[status](replacePlaceholders(FORMAT, { item, status }));
    if (status === MIGRATION_ITEM_STATUS.PROCESSING) {
      progress.start(1, 0, { message });
    } else {
      progress.update(1, { message });
      progress.stop();
    }
  }
}
