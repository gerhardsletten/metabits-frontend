const { ANALYZE } = process.env

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
  }
}
