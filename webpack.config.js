/**
 * Created by paul on 5/4/17.
 */

//Promises implementation
global.Promise         = require('bluebird');

let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin  = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
//let ManifestPlugin = require('webpack-manifest-plugin');
let BundleTracker  = require('webpack-bundle-tracker');

let publicPath         = process.env.NODE_ENV === 'production' ? 'static/' : 'http://localhost:8050/public/assets';
let cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
let jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );

  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(
      new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        debug: process.env.NODE_ENV !== 'production'
     }
   })
  );

  //plugins.push(new ManifestPlugin())
  plugins.push(new BundleTracker({filename: './webpack-stats.json'}));
}

module.exports = {
  entry: ['babel-polyfill', './src/client.js'],
//  DEPRECATED
//  debug: process.env.NODE_ENV !== 'production',
  resolve: {
//    root:               path.join(__dirname, 'src'),
//    modulesDirectories: ['node_modules'],
    modules: [
     path.join(__dirname, "src"),
     "node_modules"
   ],
// Using of '' extension is not required anymore
    extensions:         ['.js', '.jsx']
  },
  plugins,
  output: {
    path: `${__dirname}/public/assets/`,
    filename: jsName,
    publicPath
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract( { fallback: 'style-loader', use: 'css-loader!postcss-loader'})
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader',  use: 'css-loader!postcss-loader!less-loader'})
      },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
      { test: /\.jsx?$/, loader: process.env.NODE_ENV !== 'production' ? 'react-hot-loader!babel-loader' : 'babel-loader', exclude: [/node_modules/, /public/] },
//  JSON Loader is depricated
//      { test: /\.json$/, loader: 'json-loader' },
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};
