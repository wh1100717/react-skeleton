import path from 'path'
import webpack, { DefinePlugin, BannerPlugin } from 'webpack'

const DEBUG = !process.argv.includes('release')
const WATCH = global.WATCH === undefined ? false : global.WATCH
const VERBOSE = process.argv.includes('verbose')
const STYLE_LOADER = 'style-loader/useable'
const CSS_LOADER = DEBUG ? 'css-loader' : 'css-loader?minimize'
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
]
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
}

//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../node_modules/react-routing/src'),
          path.resolve(__dirname, '../src')
        ],
        loaders: [...(WATCH && ['react-hot']), 'babel-loader']
      }, {
        test: /\.less$/,   
        loader: `${CSS_LOADER}!postcss-loader!less-loader`   
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.txt$/,
        loader: 'raw-loader'
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.(tft|wav|mp3)$/,
        loader: 'file-loader'
      }
    ]
  },

  postcss: [
    require('postcss-nested')(),
    require('cssnext')(),
    require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
  ]
}

//
// Configuration for the client-side bundle (app.js)
// -----------------------------------------------------------------------------

const appConfig = Object.assign({}, config, {
  entry: [
    ...(WATCH && ['webpack-hot-middleware/client']),
    './src/app/index.js'
  ],
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: 'app.js'
  },
  devtool: DEBUG ? 'source-map' : false,
  plugins: [
    ...config.plugins,
    new DefinePlugin(Object.assign({}, GLOBALS, {'__SERVER__': false})),
    ...(!DEBUG && [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: VERBOSE}}),
      new webpack.optimize.AggressiveMergingPlugin()
    ]),
    ...(WATCH && [
      new webpack.HotModuleReplacementPlugin()
    ])
  ],
  module: {
    loaders: [...config.module.loaders, {
      test: /\.css$/,
      loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader`
    }]
  }
})

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = Object.assign({}, config, {
  entry: './src/server/index.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: [
    function (context, request, cb) {
      var isExternal =
        request.match(/^[a-z][a-z\/\.\-0-9]*$/i) &&
        !request.match(/^react-routing/) &&
        !context.match(/[\\/]react-routing/)
      cb(null, Boolean(isExternal))
    }
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  devtool: DEBUG ? 'source-map' : 'cheap-module-source-map',
  plugins: [
    ...config.plugins,
    new DefinePlugin(Object.assign({}, GLOBALS, {'__SERVER__': true})),
    new BannerPlugin('require("source-map-support").install()',
      { raw: true, entryOnly: false })
  ],
  module: {
    loaders: [...config.module.loaders, {
      test: /\.css$/,
      loader: `${CSS_LOADER}!postcss-loader`
    }]
  }
})

export default [appConfig, serverConfig]
