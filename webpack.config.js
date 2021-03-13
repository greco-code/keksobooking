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
  entry: ['@babel/polyfill', './js/main.js'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    port: 4200,
    hot: isDev,
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './index.html',
        minify: {
          collapseWhitespace: isProd,
        }
      }
    ),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname, 'source/*.ico'),
            to: path.resolve(__dirname, 'build'),
          }
        ]
      }
    ),
    // new MiniCssExtractPlugin({
    //   filename: '[name].bundle.css',
    // })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use:
          [
        //     {
        //   loader: MiniCssExtractPlugin.loader,
        //   options: {
        //     hotModuleReplacement: isDev,
        //     reloadAll: true,
        //   },
        // },
          'style-loader', 'css-loader'
          ]
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        use: ('file-loader'),
      },
      {
        test: /\.(woff2)/,
        use: ('file-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      }
    ]
  }
}


// const path = require('path');
// const fs = require('fs');
//
// const webpack = require('webpack');
// // const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
//
// const isProd = process.argv.indexOf('-p') !== -1;
//
// function generateHtmlPlugins(templateDir) {
//   const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
//   const htmlFiles = templateFiles.filter(templateFile => {
//     const parts = templateFile.split('.');
//     return parts[1] === 'html';
//   });
//
//   return htmlFiles.map(htmlFile => {
//     const parts = htmlFile.split('.');
//     const name = parts[0];
//     const extension = parts[1];
//
//     return new HtmlWebpackPlugin({
//       filename: `${name}.html`,
//       template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
//       inject: true,
//     });
//   });
// }
//
// const htmlPlugins = generateHtmlPlugins('source');
//
// module.exports = {
//   resolve: {
//     alias: {
//       source: '../source',
//     },
//   },
//   mode: isProd ? 'production' : 'development',
//   entry: {
//     bundle: './source/js/main.js',
//     libs: ['picturefill'],
//     style: './source/css/style.css',
//   },
//   devtool: 'inline-source-map',
//   devServer: {
//     contentBase: path.join(__dirname, 'source/'),
//     port: 9001,
//     hot: true,
//     compress: true,
//     progress: true,
//     watchContentBase: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: 'babel-loader',
//       },
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use: [
//           // {
//           //   loader: MiniCssExtractPlugin.loader,
//           // },
//           {
//             loader: 'css-loader',
//             options: {
//               url: false,
//             },
//           },
//           {
//             loader: 'postcss-loader',
//             options: {
//               postcssOptions: {
//                 plugins: [['autoprefixer']],
//               },
//             },
//           },
//           {
//             loader: 'sass-loader',
//           },
//         ],
//       },
//       {
//         test: /\.html$/,
//         include: path.resolve(__dirname, 'source/index.html'),
//         use: ['raw-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new webpack.ProgressPlugin(),
//     new CleanWebpackPlugin(),
//     new SpriteLoaderPlugin(),
//     // new MiniCssExtractPlugin({
//     //   filename: 'css/[name].min.css',
//     // }),
//     new HtmlWebpackPlugin({
//       template: 'source/index.html',
//     }),
//     new PreloadWebpackPlugin({
//       rel: 'preload',
//       include: 'allChunks', // or 'initial', or 'allAssets'
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         /* Копируем шрифты */
//         {
//           from: 'source/fonts',
//           to: './fonts',
//         },
//         /* Копируем изображения */
//         {
//           from: 'source/img',
//           to: './img',
//         },
//         /* Копируем внешние библиотеки */
//         {
//           from: 'source',
//           to: './vendors',
//         },
//         /* Копируем файлы, которые необходимы нам в корне проекта */
//         // {
//         //   from: 'source/root',
//         //   to: './',
//         // },
//       ],
//     }),
//     new ImageminPlugin({
//       test: 'source/img/**',
//       optimizationLevel: 3,
//       progressive: true,
//     }),
//     new ImageminWebpWebpackPlugin({
//       config: [
//         {
//           test: /\.(jpe?g|png)/,
//           options: {
//             quality: 85,
//           },
//         },
//       ],
//       overrideExtension: true,
//       detailedLogs: false,
//       silent: false,
//       strict: true,
//     }),
//   ].concat(htmlPlugins),
//   output: {
//     filename: 'js/[name].js',
//     path: path.resolve(__dirname, '../build'),
//   },
//   optimization: {
//     minimize: true,
//     splitChunks: {
//       chunks: 'all',
//     },
//     minimizer: isProd
//       ? [
//         new TerserPlugin({
//           cache: true,
//           parallel: true,
//           sourceMap: false,
//         }),
//         new OptimizeCSSAssetsPlugin({}),
//       ]
//       : [],
//   },
// };


// const path = require('path');
// // const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//
// module.exports = {
//   mode: 'production',
//   entry: './source/js/main.js',
//   devtool: 'source-map',
//   output: {
//     filename: 'main.bundle.js',
//     path: path.resolve(__dirname, 'build/js'),
//   },
//   // plugins: [
//   //   new MiniCssExtractPlugin({
//   //     filename: 'style.css'
//   //   })
//   // ],
//   devServer: {
//     contentBase: path.join(__dirname, 'build'),
//     compress: true,
//     open: true,
//     port: 8080,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|jpg|gif)$/i,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 8192,
//             },
//           },
//         ],
//       },
//     ],
//   },
// };
