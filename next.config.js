const { ANALYZE } = process.env
const withOffline = require('next-offline')

module.exports = withOffline({
  workboxOpts: {
    clientsClaim: true,
    urlPattern: /^https?.*/, handler: 'networkFirst'
  },
  webpack: function (config, { dev, isServer }) {
    if (ANALYZE && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }
    return config
  }
})
