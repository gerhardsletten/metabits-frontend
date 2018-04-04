import React, { Component } from 'react'
import dynamic from 'next/dynamic'

import withData from '../lib/withData'
import App from '../components/App'
import Portfolios from '../components/Portfolios'

class PortfoliosComponent extends Component {
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
        <Portfolios path={asPath} />
      </App>
    )
  }
}

export default withData(PortfoliosComponent)
