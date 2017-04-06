const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './js/main.js',
  ],
  output: {
    path: path.join(__dirname, ''),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /.scss$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            { loader: 'css-loader',
              query: {
                minimize: true
              }
            },
            { loader: 'sass-loader' }
          ]
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'css/main.css', disable: false, allChunks: true })
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};
