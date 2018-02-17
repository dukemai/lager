const path = require('path');
const webpack = require('webpack');
const vendors = ['react', 'react-dom'];
const clientFolder = path.join(__dirname, 'client');

module.exports = {
  entry: {
    bundle: ['webpack-hot-middleware/client',
      path.join(clientFolder, 'index.js')],
    vendor: vendors,
  },
  module: {
    loaders: [
      {
        test: clientFolder,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [
            'transform-class-properties',
            'transform-es2015-classes',
            'react-hot-loader/babel'
          ],
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/javascripts'),
    publicPath: '/javascripts/',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
};
