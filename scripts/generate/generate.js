const manipulations = require('./gmManipulations');
const postFormatting = require('../../.prettierrc.json');
const migrate = require('../../build');
const { OPERATION_TYPE } = migrate;
const { GENERATE } = OPERATION_TYPE;
const migration = migrate.default;
const operate = require('../../build/operate');
const fs = require('fs-extra');
const replaceByValues = require('../../build/utils/replaceByValues').default;

const MANIPULATION_TEMPLATE_PATH = './scripts/generate/templates/operate/Gm/$';
const MANIPULATION_OUTPUT_PATH = './src/operate/Gm/{{uppercamelcase}}';
const MANIPULATION_CONSTANS_TEMPLATE_PATH = './scripts/generate/templates/operate/Gm/constants.ts';
const MANIPULATION_CONSTANS_OUTPUT_PATH = './src/operate/Gm/constants.ts';
const MANIPULATION_INDEX_TEMPLATE_PATH = './scripts/generate/templates/operate/Gm/index.ts';
const MANIPULATION_INDEX_OUTPUT_PATH = './src/operate/Gm/index.ts';
const MANIPULATION_CONFIGTYPES_TEMPLATE_PATH = './scripts/generate/templates/operate/Gm/configTypes.ts';
const MANIPULATION_CONFIGTYPES_OUTPUT_PATH = './src/operate/Gm/configTypes.ts';

migration.initConfig({
  postFormatting: { ...postFormatting, parser: 'typescript', organizeImportsSkipDestructiveCodeActions: false },
  onIterationStart: (config, params) => {
    fs.removeSync(replaceByValues(MANIPULATION_OUTPUT_PATH, params));
  },
  onIterationEnd: (result) => {
    console.info(`[${result.status}] ${result.outputPath}`);
  },
  tasks: [
    // Imageのmanipulationを生成
    {
      id: 'image-manipulations',
      jobs: {
        templatePath: MANIPULATION_TEMPLATE_PATH,
        outputPath: MANIPULATION_OUTPUT_PATH,
        iteration: manipulations,
        operations: {
          type: GENERATE,
        },
      },
    },
    {
      id: 'image-manipulations-constants',
      jobs: {
        templatePath: MANIPULATION_CONSTANS_TEMPLATE_PATH,
        outputPath: MANIPULATION_CONSTANS_OUTPUT_PATH,
        params: { manipulations },
        operations: {
          type: GENERATE,
        },
      },
    },
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
