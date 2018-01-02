import React, {Component} from 'react'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
// import FlexContainer from 'react-styled-flexbox'
import {withState} from 'recompose'

import Navigation from './Navigation'
import {Link} from '../routes'
import Icon from '../elements/Icon'
import OffCanvas from '../elements/OffCanvas'
import Button, {RoundedButton} from '../elements/Button'
import Wrapper from '../elements/Wrapper'

const theme = {
  text: '#232323',
  primary: '#00AEEE',
  primaryActive: '#0095DA',
  secondary: '#FF931E',
  secondaryActive: '#D47A19',
  textMuted: '#999',
  shadow: '0 0 6px rgba(0,0,0,.3)'
}

injectGlobal`
  * {
    font-family: "Avenir Next", Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
    line-height: 1.4;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: #f2f2f2;
    color: #232323;
    font-size: 1.8rem;
  }
`
const Main = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
`
const Content = styled.main`
  padding-bottom: 2rem;
  flex: 1;
  z-index: 1;
`
const Header = styled.header`
  display: block;
  padding: 2rem 0;
`
const Footer = styled.footer`
  display: block;
  padding: 2rem 0;
  text-align: center;
`
const LogoWrapper = styled.a`
  max-width: 15rem;
  display: block;
  visibility: ${props => props.isHidden ? 'hidden' : 'visible'};
  ${breakpoint('desktop')`
    max-width: 20rem;
  `}
`
const Logo = styled.img`
  width: 100%;
  display: block;
`
const NavWrapper = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
`
const NavDesktop = styled.div`
  display: none;
  ${breakpoint('desktop')`
    display: block;
  `}
`
const NavBtnMobile = styled.div`
  display: block;
  ${breakpoint('desktop')`
    display: none;
  `}
`
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`
const NavMobile = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
`

const enhance = withState('overlayVisible', 'toggleOverlay', false)

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      overlayVisible: false
    }
  }
  toggleBtn (icon = 'bars') {
    return (
      <RoundedButton tight primary onClick={this.toggleOverlay} active={this.state.overlayVisible}><Icon icon={icon} /></RoundedButton>
    )
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.path !== nextProps.path) {
      this.setState({
        overlayVisible: false
      })
    }
  }
  renderContent () {
    const {inset = true, children} = this.props
    if (!inset) {
      return children
    }
    return (
      <Wrapper>
        {children}
      </Wrapper>
    )
  }
  render () {
    const {children, path, inset = true} = this.props
    return (
      <ThemeProvider theme={theme}>
        <Main>
          {this.renderHeader()}
          <Content>
            {this.renderContent()}
          </Content>
          <Footer>
            <Wrapper>
              <p>Footer as</p>
            </Wrapper>
          </Footer>
          {this.renderOverlay()}
        </Main>
      </ThemeProvider>
    )
  }
  renderHeader () {
    const {path} = this.props
    return (
      <Header>
        <Wrapper>
          <HeaderWrapper>
            <Link route={'/'}>
              <LogoWrapper href='/'>
                <Logo src='/static/logo-metabits.svg' alt='Metabits' />
              </LogoWrapper>
            </Link>
            <NavWrapper>
              <Navigation path={path}>
                {({navigation}) => {
                  return (
                    <NavDesktop>
                      {navigation && navigation.map(({title, uri, active}, i) => {
                        return (
                          <Button link key={i} route={uri} active={active}>{title}</Button>
                        )
                      })}
                    </NavDesktop>
                  )
                }}
              </Navigation>
              <NavBtnMobile>
                {this.toggleBtn()}
              </NavBtnMobile>
            </NavWrapper>
          </HeaderWrapper>
        </Wrapper>
      </Header>
    )
  }
  renderOverlay () {
    const {path} = this.props
    return (
      <OffCanvas visible={this.state.overlayVisible}>
        <Header>
          <Wrapper>
            <HeaderWrapper>
              <Link route={'/'}>
                <LogoWrapper href='/' isHidden>
                  <Logo src='/static/logo-metabits.svg' alt='Metabits' />
                </LogoWrapper>
              </Link>
              <NavWrapper>
                {this.toggleBtn('close')}
              </NavWrapper>
            </HeaderWrapper>
          </Wrapper>
        </Header>
        <NavMobile>
          <Navigation path={path}>
            {({navigation}) => {
              return (
                <div>
                  {navigation && navigation.map(({title, uri, active}, i) => {
                    return (
                      <Button block link key={i} route={uri} active={active}>{title}</Button>
                    )
                  })}
                </div>
              )
            }}
          </Navigation>
        </NavMobile>
      </OffCanvas>
    )
  }
  toggleOverlay = () => {
    this.setState({
      overlayVisible: !this.state.overlayVisible
    })
  }
}
