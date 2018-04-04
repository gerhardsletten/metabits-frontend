import React, { Component } from 'react'
import dynamic from 'next/dynamic'

import withData from '../lib/withData'
import App from '../components/App'
import Technologies from '../components/Technologies'

class ServicesComponent extends Component {
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
        <Technologies path={asPath} />
      </App>
    )
  }
}

export default withData(ServicesComponent)
