import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import FlexContainer from 'react-styled-flexbox'
import breakpoint from 'styled-components-breakpoint'
import routes, {Link} from '../routes'

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
  max-width: 120rem;
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
const Logo = styled.img`
  max-width: 20rem;
`

const App = ({children, title, navigation, path}) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Head>
          <title>{title}</title>
        </Head>
        <Header>
          <FlexContainer itemsCenter>
          <Logo src='/static/logo-metabits.svg' alt='Metabits' />
            {navigation && (
              <Nav>
                {navigation.map(({name, ...item}, i) => {
                  const active = item.route === path
                  return (
                    <Link key={i} {...item}>
                      <NavItem href={item.route} active={active}>
                        {name}
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

export default App
