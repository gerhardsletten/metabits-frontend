import React, { Component } from 'react'

import withData from '../lib/withData'
import AppPlain from '../components/AppPlain'
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
      <AppPlain path={asPath}>
        <p>test-2 - dataloading Page</p>
        <Page path='/' />
      </AppPlain>
    )
  }
}

export default withData(IndexComponent)
