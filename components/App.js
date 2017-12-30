import React from 'react'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import FlexContainer from 'react-styled-flexbox'
import {withState} from 'recompose'

import {Link} from '../routes'
import Icon from '../elements/Icon'
import Button, {RoundedButton} from '../elements/Button'

const enhance = withState('overlayVisible', 'toggleOverlay', false)

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
`
const Logo = styled.img`
  width: 100%;
`

const App = ({children, navigation, path, ...rest}) => {
  console.log('rest', rest)
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
            {navigation}
            <Icon icon='bars' />
          </FlexContainer>
        </Header>
        <WrapperInner>
          <div>
            <Button link route='/'>Button primary</Button>
            <Button link active>Button primary</Button>
            <Button route='/'>Button default</Button>
            <Button primary onClick={() => console.log('hei')}>Button default</Button>
            <RoundedButton><Icon icon='bars' /></RoundedButton>
          </div>
          {children}
        </WrapperInner>
      </Wrapper>
    </ThemeProvider>
  )
}

export default enhance(App)
