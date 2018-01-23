import React from 'react'
import {Col, Row} from 'react-styled-flexboxgrid'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import El from '../elements/Element'

import PageTitle from '../elements/PageTitle'
import Title from '../elements/Title'

const Image = El.extend`
  padding-top: 60%;
`
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

const items = [
  'Ordnett responsive nettsider',
  'Gyldnedal.no responsivt redesign',
  'Navnelapper frontend design og utvikling',
  'Bokkklubben medlems-app',
  'Ebok-leser for Elevforlaget',
  'Leseskogen – lesing og aktiviter for barn'
]

const Portfolios = ({title, subTitle}) => {
  return (
    <div>
      <PageTitle title={title} subTitle={subTitle} />
      <Row>
        {items.map((item, i) => {
          return (
            <Col sm={6} xs={12} key={i}>
              <El mb={3}>
                <Image mb={2} bg={'#333'} />
                <Title level={2} size={2.4} mb={0.5} bold>{item}</Title>
                <Text mb={1}>Together with Coinbase we are banking the unbanked with Toshi - a cryptocurrency platform that provides universal access to financial services.</Text>
                <Link href='#'>Gå til nettsted</Link>
              </El>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

const qlQuery = gql`
  query page ($id: ID!) {
    page: Page (id: $id) {
      id
      title
      subTitle
    }
  }
`

export default graphql(qlQuery, {
  options: ({path}) => {
    return {
      variables: {
        id: path
      }
    }
  },
  props: ({data: {page}}) => {
    return {
      ...page
    }
  }
})(Portfolios)
