var path = require('path')
var utils = require('./utils')
var config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "css/style.css",
    // disable: process.env.NODE_ENV === "development"
});

// 公共库
const vendor = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-thunk'
]

module.exports = {
  entry: {
    vendor: vendor,
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      'constants': resolve('src/constants'),
      'actions': resolve('src/actions'),
      'reducer': resolve('src/reducer'),
      'pages': resolve('src/pages'),
      'views': resolve('src/views'),
      'utils': resolve('src/utils'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
            // @remove-on-eject-begin
            // babelrc: false,
            // presets: [require.resolve('babel-preset-react-app')],
            // @remove-on-eject-end
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true
        },
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        // include: [resolve('src')],
        use: extractSass.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, 
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ],
            // use style-loader in development
            fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
      extractSass
  ]
}
