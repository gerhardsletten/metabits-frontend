const { ANALYZE } = process.env
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const Uglify = require('uglifyjs-webpack-plugin')

module.exports = {
  webpack: function (config, { dev }) {
    if (ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    config.plugins = config.plugins.filter(
      (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
    )

    config.plugins.push(
      new Uglify()
    )

    if (dev) {
      return config
    }
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        cacheId: 'offline-cache',
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        navigateFallback: '/',
        importScripts: [
          '/sw-inital-request.js'
        ],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^http.*/
          }
        ]
      })
    )

    return config
  }
}
