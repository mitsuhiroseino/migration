'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs-extra');
var os = require('os');
var path = require('path');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);
var os__namespace = /*#__PURE__*/_interopNamespaceDefault(os);
var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

function generateIndex(targetDirPath, options = {}) {
  console.log(new Date(), '@visue/dev/generateIndex');
  const {
      targetExts = ['.ts', '.tsx', '.js', '.jsx'],
      excludeDirNames = [],
      ...rest
    } = options,
    opts = {
      ...rest,
      targetExtsMap: targetExts.reduce((result, ext) => {
        result[ext] = true;
        return result;
      }, {}),
      excludeDirNameMap: excludeDirNames.reduce((result, dir) => {
        result[dir] = true;
        return result;
      }, {})
    };
  _generateIndex(targetDirPath, opts);
}
function _generateIndex(targetDirPath, options) {
  const exportFiles = createExportFiles(targetDirPath, options);
  exportIndex(targetDirPath, exportFiles, options);
  return !!exportFiles.defaultExport;
}
function createExportFiles(targetDirPath, options) {
  const {
      indexFileName = 'index.ts',
      targetExtsMap = {},
      excludeDirNameMap = {}
    } = options,
    indexName = path__namespace.parse(indexFileName).name,
    parentName = path__namespace.basename(targetDirPath),
    children = fs__namespace.readdirSync(targetDirPath),
    exportFiles = {
      defaultExport: null,
      sources: [],
      resources: [],
      dirs: [],
      hasTypes: false,
      hasConstants: false,
      hasDefaultExport: {}
    };
  for (const child of children) {
    const childPath = path__namespace.join(targetDirPath, child),
      stat = fs__namespace.statSync(childPath);
    if (stat.isFile()) {
      const {
        ext,
        name
      } = path__namespace.parse(child);
      if (ext !== '') {
        if (targetExtsMap[ext.toLowerCase()]) {
          if (name !== indexName) {
            if (name === parentName) {
              exportFiles.defaultExport = name;
            } else if (name === 'constants') {
              exportFiles.hasConstants = true;
            } else if (name === 'types') {
              exportFiles.hasTypes = true;
            } else {
              exportFiles.sources.push(name);
            }
          }
        } else {
          exportFiles.resources.push(child);
        }
      }
    } else if (stat.isDirectory()) {
      if (!excludeDirNameMap[child]) {
        exportFiles.dirs.push(child);
        exportFiles.hasDefaultExport[child] = _generateIndex(childPath, options);
      }
    }
  }
  return exportFiles;
}
function exportIndex(targetDirPath, exportFiles, options) {
  const {
      defaultExport,
      sources,
      resources,
      dirs,
      hasTypes,
      hasConstants,
      hasDefaultExport
    } = exportFiles,
    {
      indexFileName = 'index.ts',
      trial
    } = options,
    index = [];
  if (defaultExport) {
    index.push(exportDefault(defaultExport));
  }
  dirs.sort();
  for (const dir of dirs) {
    if (hasDefaultExport[dir]) {
      index.push(exportDefaultAs(dir));
    } else {
      index.push(exportAllAs(dir));
    }
  }
  sources.sort();
  for (const source of sources) {
    index.push(exportDefaultAs(source));
  }
  if (hasConstants) {
    index.push(exportAll('constants'));
  }
  if (hasTypes) {
    index.push(exportTypeAll('types'));
  }
  resources.sort();
  for (const resource of resources) {
    index.push(exportAllAs(resource));
  }
  const indexFilePath = path__namespace.join(targetDirPath, indexFileName),
    indexContents = index.join(os__namespace.EOL);
  if (!trial) {
    fs__namespace.writeFileSync(indexFilePath, indexContents);
    console.info(indexFilePath);
  } else {
    console.info(`${indexFilePath} -------------------------------`);
    console.info(indexContents);
  }
}
function exportDefault(module) {
  return `export { default } from './${module}';`;
}
function exportDefaultAs(module) {
  return `export { default as ${module} } from './${module}';`;
}
function exportAllAs(module) {
  return `export * as ${module} from './${module}';`;
}
function exportAll(module) {
  return `export * from './${module}';`;
}
function exportTypeAll(module) {
  return `export type * from './${module}';`;
}

exports.default = generateIndex;
//# sourceMappingURL=generateIndexes.cjs.map
