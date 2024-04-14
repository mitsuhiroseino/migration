const manipulations = require('./sharpManipulations');
const postFormatting = require('../../.prettierrc.json');
const migrate = require('../../build');
const { OPERATION_TYPE } = migrate;
const { GENERATE } = OPERATION_TYPE;
const migration = migrate.default;
const operate = require('../../build/operate');
const fs = require('fs-extra');
const replaceByValues = require('../../build/utils/replaceByValues').default;

const MANIPULATION_INDEX_TEMPLATE_PATH = './scripts/generate/templates/operate/Sharp/SharpManipulationConfig.ts';
const MANIPULATION_INDEX_OUTPUT_PATH = './src/operate/Sharp/SharpManipulationConfig.ts';

migration.initConfig({
  postFormatting: { ...postFormatting, parser: 'typescript', organizeImportsSkipDestructiveCodeActions: false },
  onIterationEnd: (result) => {
    console.info(`[${result.status}] ${result.outputPath}`);
  },
  tasks: [
    {
      id: 'image-manipulations-index',
      jobs: {
        templatePath: MANIPULATION_INDEX_TEMPLATE_PATH,
        outputPath: MANIPULATION_INDEX_OUTPUT_PATH,
        params: { manipulations },
        operations: {
          type: GENERATE,
        },
      },
    },
  ],
});

migration
  .run()
  .then((result) => console.info(result))
  .catch((error) => console.error(error));
