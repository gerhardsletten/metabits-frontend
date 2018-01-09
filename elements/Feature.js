import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

import Link from './Link'
import Icon from './Icon'

export const fragment = gql`
  fragment Feature on Page {
    id
    title
    subTitle
    icon
  }
`

const BoxWrapper = styled(Link)`
  display:block;
  margin-bottom: 1rem;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  transition: transform 200ms;
  color: ${props => props.theme.colors.textMuted};
  &:hover,
  &:active {
    transform: scale(1.05);
  }
`
const IconWrapper = styled.div`
  display:block;
  margin-bottom: 1rem;
  font-size: 4rem;
  color: ${props => props.theme.colors.primary}
`
const Title = styled.h2`
  display:block;
  margin-bottom: .5rem;
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text}
`

const Feature = ({id, title, subTitle, icon}) => {
  return (
    <BoxWrapper to={id}>
      <IconWrapper>
        <Icon icon={icon} />
      </IconWrapper>
      <Title>{title}</Title>
      <p>{subTitle}</p>
    </BoxWrapper>
  )
}

export default Feature
