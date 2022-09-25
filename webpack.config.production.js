/*
author：ipan
date：2020/03/18
*/
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

process.env.NODE_ENV = 'production'


const postcssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]
module.exports = {
  entry: {
    main: './frontEnd/src/views/main.js',
    xuboss: './frontEnd/public/styles.js'
  },
  output: {
    // filename: 'js/bundle[contenthash:8].js',
    filename: "[name].js",
    path: resolve(__dirname, 'bundle')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              ...postcssLoader
            ] 
          },
          {
            test: /\.less$/,
            use: [
              ...postcssLoader,
              'less-loader'
            ]
          },
          {
            test: /\.jpeg|jpg|png|gif$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              esModule: false,
              name: '[contenthash:8].[ext]',
              outputPath: 'imgs'
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
              limit: 8 * 1024,
              name: '[contenthash:8].[ext]'
            }
          },
          {
            test: /\.eot|svg|ttf|woff$/,
            loader: 'file-loader',
            options: {
                name: '[contenthash:8].[ext]',
                outputPath: 'iconfont'
            }
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              'thread-loader',
              {
                loader: 'thread-loader',
                options: {
                  workers: 2
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: {
                          version: 3
                        },
                        targets: {
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10',
                          edge: '17'
                        }
                      }
                    ]
                  ],
                  cacheDirectory:true
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontEnd/public/index.html',
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      //   minifyJS: false
      // }
    }),
    new MiniCssExtractPlugin({
        filename: 'css/built[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  mode: 'production',
  devtool: 'source-map'
}