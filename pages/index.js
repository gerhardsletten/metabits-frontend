import React, { Component } from 'react'

import withData from '../lib/withData'
import App from '../components/App'
import HomePage from '../components/HomePage'

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
      <App path={asPath} inset={false}>
        <HomePage path={asPath} />
      </App>
    )
  }
}

export default withData(IndexComponent)
