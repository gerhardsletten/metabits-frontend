import React, { Component } from 'react'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { initStore, loadNavigation, isNavigationLoaded } from '../store'
import withRedux from 'next-redux-wrapper'

import App from '../components/App'

const Title = styled.h1`
  color: red;
`

class AboutComponent extends Component {
  static async getInitialProps ({store, asPath}) {
    if (!isNavigationLoaded(store.getState())) {
      await store.dispatch(loadNavigation())
    }
    return {
      asPath
    }
  }
  render () {
    const {navigation, asPath} = this.props
    return (
      <App navigation={navigation} title='About' path={asPath}>
        <Title>About {asPath}</Title>
      </App>
    )
  }
}

export default withRedux(initStore, (state) => {
  return {
    navigation: state.navigation.data
  }
})(AboutComponent)
