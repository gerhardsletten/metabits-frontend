import React from 'react'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
// import FlexContainer from 'react-styled-flexbox'
import {withState} from 'recompose'

import Navigation from './Navigation'
import {Link} from '../routes'
import Icon from '../elements/Icon'
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
  max-width: 20rem;
  display: block;
  visibility: ${props => props.isHidden ? 'hidden' : 'visible'};
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
  ${breakpoint('tablet')`
    display: block;
  `}
`
const NavBtnMobile = styled.div`
  display: block;
  ${breakpoint('tablet')`
    display: none;
  `}
`
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Canvas = styled.div`
  background: rgba(100%,100%,100%,.9);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: ${props => props.active ? 'translate(0%, 0px)' : 'translate(0%, 20%) scale(.8)'};
  opacity: ${props => props.active ? 1 : 0};
  transition: transform 200ms;
  backface-visibility: ${props => props.active ? 'visible' : 'hidden'};
  z-index: ${props => props.active ? 150 : -1000};
`
const CanvasInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`
const CanvasContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
`

const enhance = withState('overlayVisible', 'toggleOverlay', false)

const App = ({children, path, overlayVisible, toggleOverlay}) => {
  const toggleAction = () => toggleOverlay(!overlayVisible)
  const toggleBtn = (
    <RoundedButton primary onClick={toggleAction} active={overlayVisible}><Icon icon={overlayVisible ? 'close' : 'bars'} /></RoundedButton>
  )
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
                {toggleBtn}
              </NavBtnMobile>
            </NavWrapper>
          </HeaderWrapper>
        </Header>
        <WrapperInner>
          {children}
        </WrapperInner>
        <Canvas active={overlayVisible}>
          <CanvasInner>
            <Header>
              <HeaderWrapper>
                <Link route={'/'}>
                  <LogoWrapper href='/' isHidden>
                    <Logo src='/static/logo-metabits.svg' alt='Metabits' />
                  </LogoWrapper>
                </Link>
                <NavWrapper>
                  {toggleBtn}
                </NavWrapper>
              </HeaderWrapper>
            </Header>
            <CanvasContent>
              <p>Hei verden</p>
            </CanvasContent>
          </CanvasInner>
        </Canvas>
      </Wrapper>
    </ThemeProvider>
  )
}

export default enhance(App)
