const generateIndexes = require('./generateIndexes.cjs').default;
generateIndexes('./src', { excludeDirNames: ['__test__'] });
