import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';
import * as pkg from './package.json';
import { UglifyJsPlugin } from 'uglifyjs-webpack-plugin';

const path = require('path');
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

export default (config: webpack.Configuration, options: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {

  config.plugins.push(
    new webpack.DefinePlugin({ APP_VERSION: JSON.stringify(pkg.version) }),
    new UglifyJsPlugin({
      "mangle": false,
      "compress": {
        "screw_ie8": true,
        "warnings": false
      },
      "sourceMap": false
    }),
    // new LodashModuleReplacementPlugin({ 'collections': true, "paths": true, "shorthands": true }),
  );

  // config.module.rules.push(
  //   {
  //     test: /\.scss$/,
  //     loader: 'postcss-loader',
  //     options: {
  //       postcssOptions: {
  //         ident: 'postcss',
  //         syntax: 'postcss-scss',
  //         plugins: ['postcss-import', 'autoprefixer'],
  //       },
  //     },
  //   },
  // );

  return config;
};