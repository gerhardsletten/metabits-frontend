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

const theme = {
  text: '#232323',
  primary: '#00AEEE',
  primaryActive: '#0095DA',
  secondary: '#999',
  secondaryActive: '#888'
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
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 100rem;
  padding: 1rem;
`
const WrapperInner = styled.div`
  background: #fff;
  padding: 1rem;
`
const Header = styled.header`
  display: block;
  margin-bottom: 2rem;
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
  render () {
    const {children, path} = this.props
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header>
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
          </Header>
          <WrapperInner>
            {children}
          </WrapperInner>
          {this.renderOverlay()}
        </Wrapper>
      </ThemeProvider>
    )
  }
  renderOverlay () {
    const {path} = this.props
    return (
      <OffCanvas visible={this.state.overlayVisible}>
        <Header>
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
