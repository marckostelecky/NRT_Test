const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    // searches for files in src folder and node_modules folder
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.css', '.scss']
  },
  entry: {
    main: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
module: {
  rules: [{
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
}]
}
};
