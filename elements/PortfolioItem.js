import React from 'react'
import gql from 'graphql-tag'

import El from '../elements/Element'
import Title from './Title'

import Image from './Image'
const Text = El.withComponent('p')
const Link = El.withComponent('a').extend`
  text-decoration: underline;
  color: ${props => props.theme.colors.text};
  &:hover,
  &:active {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`

const PortfolioItem = ({title, lead, link, image}) => {
  return (
    <El mb={3}>
      <Image mb={1} src={image} fullWidth border />
      <Title level={2} size={2.4} mb={0.5} bold>{title}</Title>
      <Text mb={1}>{lead}</Text>
      <Link href={link} target='_blank'>Gå til nettsted</Link>
    </El>
  )
}

export const fragment = gql`
  fragment PortfolioItem on Page {
    id
    title
    lead
    link
    image
  }
`

export default PortfolioItem
