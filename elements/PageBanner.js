import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

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
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: 50% 50%;
  text-align: center;
  padding: 16rem 0;
  margin-bottom: 2rem;
`
const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 6px rgba(0,0,0,.5);
  margin-bottom: .5rem;
`
const Subtitle = Title.withComponent('h2').extend`
  font-size: 2.0rem;
  font-weight: normal;
  margin-bottom: 2rem;
`

const PageBanner = ({title, lead, image, linkText, uri}) => {
  return (
    <Banner image={image}>
      <Wrapper>
        <Title>{title}</Title>
        <Subtitle>{lead}</Subtitle>
        {linkText && uri && <Button shadow route={uri}>{linkText}</Button>}
      </Wrapper>
    </Banner>
  )
}

export default PageBanner
