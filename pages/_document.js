import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Script from '../elements/Script'
import config from '../config'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }
  render () {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <link rel='shortcut icon' href={config.favicon} />
          <meta name='viewport' content='width=device-width' />
          <Script>
            {
              () => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker
                    .register('/service-worker.js')
                    .then(registration => {
                      console.log('service worker registration successful')
                    })
                    .catch(err => {
                      console.warn('service worker registration failed', err.message)
                    })
                }
              }
            }
          </Script>
          {config.tagManager && (
            <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${config.tagManager}');`}} />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
