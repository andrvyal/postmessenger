const CopyWebpackPlugin = require('copy-webpack-plugin');
const entries = require('./entries');
const path = require('path');

module.exports = (env = {}) => {
  return {
    context: path.resolve(__dirname),
    entry: Object.assign(entries, {
      'tests/dist/child.js': './tests/src/child.js',
      'tests/dist/iframe.js': './tests/src/iframe.js',
      'tests/dist/index.js': './tests/src/index.js'
    }),
    output: {
      filename: "[name]",
      path: path.resolve(__dirname)
    },
    node: {
      fs: 'empty'
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          context: 'node_modules/mocha',
          from: './mocha.*',
          to: 'tests/dist/'
        }
      ])
    ],
    watch: env.watch
  };
};
