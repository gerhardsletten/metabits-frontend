import React, { Component } from 'react'

import withData from '../lib/withData'
import AppPlain from '../components/AppPlain'
import Page from '../components/Page'

class IndexComponent extends Component {
  render () {
    return (
      <AppPlain path={'/'}>
        <p>test-3 - dataloading Page uten getInitialProps</p>
        <Page path='/' />
      </AppPlain>
    )
  }
}

export default withData(IndexComponent)
