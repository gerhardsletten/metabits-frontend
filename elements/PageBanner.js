import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import breakpoint from 'styled-components-breakpoint'

import Wrapper from './Wrapper'
import Button from './Button'

export const fragment = gql`
  fragment PageBanner on Page {
    Banner {
      title
      lead
      image
      linkText
      uri
    }
  }
`

const Banner = styled.div`
  font-size: 2rem;
  background-size: cover;
  background-position: 50% 50%;
  text-align: center;
  padding: 8rem 0;
  margin-bottom: 2rem;
  ${breakpoint('desktop')`
    padding-top: 16rem;
    padding-bottom: 16rem;
  `}
`
const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 6px rgba(0,0,0,.5);
  margin-bottom: .5rem;
  line-height: 1.2;
`
const Subtitle = Title.withComponent('h2').extend`
  font-size: 2.0rem;
  font-weight: normal;
  margin-bottom: 2rem;
`

const PageBanner = ({title, lead, image, linkText, uri}) => {
  return (
    <Banner style={{backgroundImage: `url( ${image} )`}}>
      <Wrapper>
        <Title>{title}</Title>
        <Subtitle>{lead}</Subtitle>
        {linkText && uri && <Button shadow to={uri}>{linkText}</Button>}
      </Wrapper>
    </Banner>
  )
}

export default PageBanner
