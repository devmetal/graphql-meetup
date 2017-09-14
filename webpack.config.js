require('dotenv').load();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'client/index.html',
  }),
];

/*
 * Élesben át kell adnunk egy környezeti változót
 * a React motorjának, és le kell minimalizálni a
 * kódbázist az Uglify-al.
 * További optimalizációt érhetünk el a Gzip
 * pluginnal
 */
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = {
  // Belépési pont, innentől történik a bundling
  entry: './client/index.jsx',

  // Meg kell határoznunk, hogy hová kerüljön a bundle
  output: {
    path: path.join(__dirname, 'client', 'build'),
    filename: 'bundle.js',
  },

  // A fejlesztéshez sourcemapat generálunk
  devtool: 'sourcemap',

  // Szabályok, amivel a webpack dolgozni fog
  module: {
    rules: [
      // es6 transpiler és jsx fordító
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      // Stíluslapok
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
