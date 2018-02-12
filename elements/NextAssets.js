import {Component} from 'react'
import PropTypes from 'prop-types'
import getUrls from 'get-urls'

function getPagePathname (pathname) {
  if (pathname === '/') {
    return '/index.js'
  }

  return `${pathname}.js`
}

export default class NextAssets extends Component {
  getChunkPreloadLink (filename) {
    const { __NEXT_DATA__ } = this.context._documentProps
    let { buildStats, assetPrefix, buildId } = __NEXT_DATA__
    const hash = buildStats ? buildStats[filename].hash : buildId

    return {
      type: 'script',
      href: `${assetPrefix}/_next/${hash}/${filename}`
    }
  }

  getPreloadMainLinks () {
    const { dev } = this.context._documentProps
    if (dev) {
      return [
        this.getChunkPreloadLink('manifest.js'),
        this.getChunkPreloadLink('commons.js'),
        this.getChunkPreloadLink('main.js')
      ]
    }
    return [
      this.getChunkPreloadLink('app.js')
    ]
  }

  getPreloadDynamicChunks () {
    const { chunks, __NEXT_DATA__ } = this.context._documentProps
    let { assetPrefix, buildId } = __NEXT_DATA__
    const usedChunks = chunks && chunks.filenames ? chunks.filenames : chunks
    return usedChunks ? usedChunks.map((chunk) => {
      return {
        type: 'script',
        href: `${assetPrefix}/_next/${buildId}/webpack/chunks/${chunk}`
      }
    }) : []
  }

  render () {
    const { __NEXT_DATA__, html } = this.context._documentProps
    const { page, pathname, buildId, assetPrefix } = __NEXT_DATA__
    const pagePathname = getPagePathname(pathname)
    const pageProps = page !== '_error' ? [{
      type: 'script',
      href: `${assetPrefix}/_next/${buildId}/page${pagePathname}`
    }] : []
    const htmlImages = getUrls(html)
    const payload = [
      ...this.getPreloadDynamicChunks(),
      ...this.getPreloadMainLinks(),
      ...pageProps,
      {
        type: 'script',
        href: `${assetPrefix}/_next/${buildId}/page/_error.js`
      },
      ...Array.from(htmlImages).map(img => {
        return {
          type: 'image',
          href: img
        }
      })
    ]
    console.log('payload', payload)
    return this.props.children(payload)
  }
}

NextAssets.contextTypes = {
  _documentProps: PropTypes.any
};