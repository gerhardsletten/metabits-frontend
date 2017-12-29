import React, { Component } from 'react'

import withData from '../lib/withData'
import App from '../components/App'
import Navigation from '../components/Navigation'
import Page from '../components/Page'

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
      <App navigation={<Navigation path={asPath} />}>
        <Page path={asPath} />
      </App>
    )
  }
}

export default withData(IndexComponent)
