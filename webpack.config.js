const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDebug = process.env.NODE_ENV !== 'production';

console.log(isDebug ? 'Debug Build 🐛' : 'Production Build 🚀');

module.exports = {
  context: __dirname,
  entry: [ '@babel/polyfill', './src/index.js' ],
  output: {
    path: path.join(__dirname, 'out'),
    filename: 'index.js',
    publicPath: '/', 
  },
  devtool: isDebug ? 'source-map' : false,
  mode: isDebug ? 'development' : 'production',
  resolve: {
    // modules: [ './', path.resolve(__dirname, 'src'), 'node_modules' ], 
  }, 
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            compact: !isDebug
          }
        }
      }, 
      {
        test: /\.(gif|png|jpe?g|svg|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/',
              publicPath: '/'
            }  
          }
        ]
      }
    ],
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }), 
    new HtmlWebpackPlugin({
      template: 'index.html',
      xhtml: true
    })
  ]
};
