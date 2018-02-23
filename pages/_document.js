import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import NextAssets from '../elements/NextAssets'
import config from '../config'
const prod = process.env.NODE_ENV === 'production'

const fixAssets = (assets) => assets.filter((item) => {
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
    const {__NEXT_DATA__: {props: {asPath: pathname}}} = this.props
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <link rel='shortcut icon' href={config.favicon} />
          <meta name='viewport' content='width=device-width' />
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
