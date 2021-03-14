const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin(),
    ]
  }

  return config;
}

module.exports = {
  context: path.resolve(__dirname, 'source'),
  mode: 'development',
  entry: ['./js/main.js'],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    contentBase: path.join(__dirname, "source/"),
    port: 9001,
    hot: true,
    compress: true,
    progress: true,
    watchContentBase: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].min.css",
    }),
    new HtmlWebpackPlugin(
      {
        template: './index.html',
        minify: {
          collapseWhitespace: !isProd,
        }
      }
    ),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "source/fonts"),
          to: path.resolve(__dirname, 'build/fonts'),
        },
        {
          from: path.resolve(__dirname, "source/img"),
          to: path.resolve(__dirname, 'build/img'),
        },
        {
          from: path.resolve(__dirname, 'source/favicon.ico'),
          to: path.resolve(__dirname, 'build'),
        }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif|woff|woff2)$/,
        use: ('url-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      },
    ]
  }
}

