const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

module.exports = {
  webpack: function (config, { dev }) {
    if (ANALYZE) {
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
    config.resolve.alias = {
      'react': 'preact-compat/dist/preact-compat',
      'react-dom': 'preact-compat/dist/preact-compat'
    }

    return config
  }
}
