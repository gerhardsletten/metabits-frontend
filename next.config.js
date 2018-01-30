const { ANALYZE } = process.env
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const appConfig = require('./config')

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

    if (dev) {
      return config
    }

    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        cacheId: 'my-project-name',
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        navigateFallback: appConfig.pubicUrl + '/',
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )

    return config

    /*
    Todo: Add preact when ready for React 15
    config.resolve.alias = {
      'react': 'preact-compat/dist/preact-compat',
      'react-dom': 'preact-compat/dist/preact-compat'
    }
    */
    return config
  }
}
