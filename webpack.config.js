const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ids, HotModuleReplacementPlugin } = require('webpack')
const { resolve } = require('path')

const envPlugins = []
const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  envPlugins.push(new HotModuleReplacementPlugin())
} else {
  envPlugins.push(
    ...[
      new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['dist'] }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[fullhash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[fullhash].css'
      }),
      new ids.HashedModuleIdsPlugin()
    ]
  )
}

module.exports = {
  devServer: {
    open: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      favicon: './src/favicon.png'
    }),
    ...envPlugins
  ],
  output: {
    filename: '[name].[fullhash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: ''
  }
}
