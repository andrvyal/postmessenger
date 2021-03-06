const path = require('path');
const webpack = require('webpack');

module.exports = (env = {}) => {
  return {
    context: path.resolve(__dirname),
    devtool: 'source-map',
    entry: {
      'dist/postmessenger.js': './src/postmessenger.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: ['env']
              }
            }
          ]
        }
      ]
    },
    output: {
      filename: "[name]",
      path: path.resolve(__dirname)
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })
    ],
    watch: env.watch
  };
};
