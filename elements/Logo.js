import React from 'react'
import Element from './Element'
import styled from 'styled-components'
import config from '../config'

const Container = Element.withComponent('div')

const LogoWrapper = styled.i`
  display: block;
  position: relative;
  height: 0;
  padding-top: 27.65%;
`
const ImgLogo = styled.img`
  height: 100%;
  display: block;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Logo = ({alt, title, ...props}) => {
  return (
    <Container {...props}>
      <LogoWrapper>
        <ImgLogo src={config.logo} alt={alt} title={title} />
      </LogoWrapper>
    </Container>
  )
}

export default Logo
