const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
// const { Handlebars } = require("handlebars");
const chokidar = require('chokidar');
const fs = require('fs')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const distPath = path.resolve(__dirname, 'dist');
const entries = {
  css: './src/scss/entries/',
  js: './src/js/entries/',
};
let completed = {};

fs.readdirSync(path.resolve(__dirname, entries.css)).forEach((file) => {
  completed[file.replace('.scss', '')] = entries.css + file;
});

fs.readdirSync(path.resolve(__dirname, entries.js)).forEach((file) => {
  completed[file.replace('.js', '')] = entries.js + file;
});

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new TerserPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }

  return config
}

const cssLoaders = extra => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {sourceMap: isDev, importLoaders: 1, url: false}
    },
    {loader: 'postcss-loader', options: {sourceMap: isDev}},
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      minify: {
        collapseWhitespace: isProd
      },
      // inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/templates/pages/')

module.exports = {
  mode: 'development',
  entry: completed,
  output: {
    filename: 'js/' + filename('js'),
    path: distPath,
  },
  resolve: {
    extensions: ['.js', 'jsx', '.json', '.css', '.scss', '.less', '.svg', '.jpg', '.png', '.hbs'],
  },
  optimization: optimization(),
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    before(app, server) {
      chokidar.watch([
        'src/templates/pages/*.hbs'
      ]).on('all', function () {
        server.sockWrite(server.sockets, 'content-changed');
      })
    },
    hot: isDev,
    port: 7777,
    compress: true,
    open: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts',
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'dist'),
      // cleanAfterEveryBuildPatterns: ['!images/**/*', '!fonts/**/*']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images/'),
          to: path.resolve(__dirname, 'dist/images/')
        },
        {
          from: path.resolve(__dirname, 'src/fonts/'),
          to: path.resolve(__dirname, 'dist/fonts/')
        },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/' + filename('css'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(htmlPlugins),
}
