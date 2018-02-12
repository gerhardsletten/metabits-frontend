import React from 'react'
import {Col, Row} from 'react-styled-flexboxgrid'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import Feature, {fragment as featureFragment} from '../elements/Feature'
import PageTitle from '../elements/PageTitle'

const Services = ({title, subTitle, services}) => {
  return (
    <div>
      <PageTitle title={title} subTitle={subTitle} />
      {services && (
        <Row>
          {services.map((item, i) => {
            return (
              <Col key={i} xs={12} sm={6} md={4}>
                <Feature {...item} />
              </Col>
            )
          })}
        </Row>
      )}
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
    services: allPages(filter: {type: "service"}) {
      ...Feature
    }
  }
  ${featureFragment}
`

export default graphql(qlQuery, {
  options: ({path}) => {
    return {
      variables: {
        id: path
      }
    }
  },
  props: ({data: {page, services}}) => {
    return {
      ...page,
      services
    }
  }
})(Services)
