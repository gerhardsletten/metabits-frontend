const { ANALYZE } = process.env
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const appConfig = require('./config')

module.exports = {
  webpack: function (config, { dev, isServer }) {
    if (ANALYZE && !isServer) {
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
    if (!isServer) {
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
    }
    return config
  }
}
