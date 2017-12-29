import React from 'react'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import FlexContainer from 'react-styled-flexbox'
import breakpoint from 'styled-components-breakpoint'

import {Link} from '../routes'

const theme = {
  text: '#232323',
  primary: 'palevioletred'
}

injectGlobal`
  * {
    font-family: "Avenir Next", Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
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
  max-width: 80rem;
  padding: 1rem;
`
const WrapperInner = styled.div`
  background: #fff;
  padding: 1rem;
`
const Nav = styled.nav`
  margin-left: auto;
  display: none;
  ${breakpoint('tablet')`
    display: block;
  `}
`
const NavItem = styled.a`
  display: inline-block;
  text-decoration: none;
  padding: 1rem;
  color: ${props => props.active ? props.theme.primary : props.theme.text};
  &:hover {
    text-decoration: underline;
  }
`
const Header = styled.header`
  display: block;
  margin-bottom: 2rem;
`
const LogoWrapper = styled.a`
  max-width: 20rem;
  display: block;
`

const Logo = styled.img`
  width: 100%;
`

const AppPlain = ({children, title, navigation, path}) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header>
          <FlexContainer itemsCenter>
            <Link route={'/'}>
              <LogoWrapper href='/'>
                <Logo src='/static/logo-metabits.svg' alt='Metabits' />
              </LogoWrapper>
            </Link>
            {navigation && (
              <Nav>
                {navigation.map(({title, uri}, i) => {
                  const route = `/${uri}`
                  const active = route === path
                  return (
                    <Link key={i} route={route}>
                      <NavItem href={route} active={active}>
                        {title}
                      </NavItem>
                    </Link>
                  )
                })}
              </Nav>
            )}
          </FlexContainer>
        </Header>
        <WrapperInner>
          {children}
        </WrapperInner>
      </Wrapper>
    </ThemeProvider>
  )
}

export default AppPlain
