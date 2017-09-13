require('dotenv').load();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'client/index.html',
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname, 'client', 'build'),
    filename: 'bundle.js',
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins,
};
