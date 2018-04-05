import React, {Component} from 'react'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import Navigation from './Navigation'
import MetaFields from './MetaFields'
import {Link} from '../routes'
import Icon from '../elements/Icon'
import Logo from '../elements/LogoElement'
import OffCanvas from '../elements/OffCanvas'
import Button, {RoundedButton} from '../elements/Button'
import Wrapper from '../elements/Wrapper'

const theme = {
  flexboxgrid: {
    gutterWidth: 4
  },
  shadow: '0 0 6px rgba(0,0,0,.3)',
  sizes: {
    normal: 1.8,
    xl: 2.2,
    xxl: 2.4
  },
  colors: {
    gray: '#999',
    border: '#ccc',
    text: '#232323',
    primary: '#00AEEE',
    primaryActive: '#0095DA',
    secondary: '#FF931E',
    secondaryActive: '#D47A19',
    textMuted: '#999',
    white: '#fff',
    lightGray: '#f2f2f2'
  }
}

injectGlobal`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
    line-height: 1.4;
    word-break: break-word;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 1.8rem;
  }
`
const Main = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.text};
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
  width: 15rem;
  display: block;
  visibility: ${props => props.isHidden ? 'hidden' : 'visible'};
  ${breakpoint('desktop')`
    width: 20rem;
  `}
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
const NavMobileInner = styled.div`
  width: 100%;
`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuVisible: false
    }
  }
  toggleBtn (icon = 'bars') {
    const {menuVisible} = this.state
    return (
      <RoundedButton tight primary onClick={this.toggleMenu} active={menuVisible}><Icon icon={icon} /></RoundedButton>
    )
  }
  toggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    })
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
    return (
      <ThemeProvider theme={theme}>
        <Main>
          {this.renderHeader()}
          <Content>
            {this.renderContent()}
          </Content>
          <Footer>
            <Wrapper>
              <p>Metabits as © {new Date().getFullYear()}</p>
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
        <MetaFields path={path} />
        <Wrapper>
          <HeaderWrapper>
            <Link route={'/'}>
              <LogoWrapper href='/'>
                <Logo title='Metabits' />
              </LogoWrapper>
            </Link>
            <NavWrapper>
              <Navigation path={path}>
                {({navigation}) => {
                  return (
                    <NavDesktop>
                      {navigation && navigation.map(({title, uri, active}, i) => {
                        const isLast = !(i < navigation.length - 1)
                        return (
                          <Button link={!isLast} primary={isLast} pl={2} pr={2} ml={2} key={i} to={uri} active={active}>{title}</Button>
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
    const {menuVisible} = this.state
    return (
      <OffCanvas visible={menuVisible}>
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
                <NavMobileInner>
                  {navigation && navigation.map(({title, uri, active}, i) => {
                    return (
                      <Button block mb={1} size='xl' link key={i} to={uri} active={active}>{title}</Button>
                    )
                  })}
                </NavMobileInner>
              )
            }}
          </Navigation>
        </NavMobile>
      </OffCanvas>
    )
  }
}

export default App
