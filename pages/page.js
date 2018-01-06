import React, { Component } from 'react'
import dynamic from 'next/dynamic'

import withData from '../lib/withData'
import App from '../components/App'
// import Page from '../components/Page'

const Page = dynamic(import('../components/Page'))

class IndexComponent extends Component {
  static async getInitialProps ({isServer, asPath}) {
    return {
      isServer,
      asPath
    }
  }
  render () {
    const {asPath} = this.props
    return (
      <App path={asPath}>
        <Page path={asPath} />
      </App>
    )
  }
}

export default withData(IndexComponent)
