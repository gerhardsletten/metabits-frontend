const { ANALYZE } = process.env
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

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
    return config
    if (!isServer) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          cacheId: 'offline-cache' + config.contentVersion,
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
    }
    return config
  }
}
