const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const config = require('config')
const getClientEnvironment = require('./env')

// Get environment variables to inject into our app.
const env = getClientEnvironment(config.get('publicPath'))

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[fullhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: config.get('publicPath')
  },
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules'],
    alias: {
      /** Alias any top level directories under src */
      Utility: path.resolve(__dirname, 'src/utils/'),
      Apis: path.resolve(__dirname, 'src/apis'),
      Constants: path.resolve(__dirname, 'src/constants'),
      Helpers: path.resolve(__dirname, 'src/helpers'),
      Hooks: path.resolve(__dirname, 'src/hooks'),
      Types: path.resolve(__dirname, 'src/types'),
      Components: path.resolve(__dirname, 'src/components')
    },
    fallback: {
      os: false,
      http: false,
      https: false,
      crypto: false,
      util: false,
      assert: false,
      stream: "stream-browserify"
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(pdf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: `${config.get('assetPath')}/images/[name]-[hash].[ext]`
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/font-woff',
              name: `${config.get('assetPath')}/fonts/[name].[ext]`
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: `${config.get('assetPath')}/fonts/[name].[ext]`
          }
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/vnd.ms-fontobject',
              name: `${config.get('assetPath')}/fonts/[name].[ext]`
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],

    }),
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: config.get('html.title'),
      inject: 'body',
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      APP_TITLE: JSON.stringify(config.get('html.title'))
    }),
    // env variables
    new webpack.DefinePlugin(env.stringified),
    new CopyPlugin({
      patterns: [
        { from: 'public/locales', to: 'public/locales' }
        // add other public files here as needed
      ]
    })
  ]
}
