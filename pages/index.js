import React, { Component } from 'react'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { initStore, loadNavigation, isNavigationLoaded } from '../store'
import withRedux from 'next-redux-wrapper'
import { Link } from '../routes'

import App from '../components/App'

const Title = styled.h1`
  color: red;
`

class IndexComponent extends Component {
  static async getInitialProps ({store, isServer, asPath}) {
    if (!isNavigationLoaded(store.getState())) {
      await store.dispatch(loadNavigation())
    }
    return {
      isServer,
      asPath
    }
  }
  render () {
    const {navigation, asPath} = this.props
    return (
      <App navigation={navigation} title='Homepage' path={asPath}>
        <Title>index {asPath}</Title>
        <Link route='about'><a>Om oss lenke</a></Link>
      </App>
    )
  }
}

export default withRedux(initStore, (state) => {
  return {
    navigation: state.navigation.data
  }
})(IndexComponent)
