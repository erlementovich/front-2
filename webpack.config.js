const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
}

const config = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, `dist`),
    compress: false,
    open: true,
    port: 1337,
  },

  module: {
    rules: [
      pug,
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: 'main.css',
        chunkFilename: '[id].css',
      }
    ),
    new HTMLPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
      inject: true
    }),
  ]
}

module.exports = config;
