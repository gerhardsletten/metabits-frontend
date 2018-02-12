import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import NextAssets from '../elements/NextAssets'
import config from '../config'
const prod = process.env.NODE_ENV === 'production'

const fixAssets = (assets) => assets.filter((item) => {
  if (item.type === 'image' && !item.href.includes('metabits-static')) {
    return false
  }
  return true
}).map(({href}) => href)

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }
  render () {
    const {__NEXT_DATA__: {pathname}} = this.props
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <link rel='shortcut icon' href={config.favicon} />
          <meta name='viewport' content='width=device-width' />
          <NextAssets>
            {(assets) => {
              return (
                <script dangerouslySetInnerHTML={{__html: `
                  window.INITAL_CACHE = ${JSON.stringify([...fixAssets(assets), pathname])};
                `}} />
              )
            }}
          </NextAssets>
          {prod && (
            <script dangerouslySetInnerHTML={{__html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                .register('/service-worker.js')
                .then(registration => {
                  return new Promise(resolve => {
                    if (navigator.serviceWorker.controller) return resolve()
                    navigator.serviceWorker.addEventListener('controllerchange', e => resolve())
                  })
                })
                .then(() => {
                  navigator.serviceWorker.controller.postMessage({
                    assets: window.INITAL_CACHE
                  })
                })
                .catch(err => {
                  console.warn('service worker registration failed', err.message)
                })
              }
            `}} />
          )}
          {prod && config.tagManager && (
            <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${config.tagManager}');`}} />
          )}
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
