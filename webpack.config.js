const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: 'style.css'
  //   })
  // ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    open: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
