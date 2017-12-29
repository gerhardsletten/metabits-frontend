import React, { Component } from 'react'

import withData from '../lib/withData'
import App from '../components/App'

class IndexComponent extends Component {
  render () {
    return (
      <App path={'/'}>
        <p>test-4 - dataloading App</p>
      </App>
    )
  }
}

export default withData(IndexComponent)
