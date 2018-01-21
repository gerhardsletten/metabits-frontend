import React from 'react'
import {Col, Row} from 'react-styled-flexboxgrid'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import Feature, {fragment as featureFragment} from '../elements/Feature'
import Title from '../elements/Title'

const Services = ({title, subTitle, services}) => {
  return (
    <div>
      <Row>
        <Col mdOffset={2} md={8} xs={12}>
          <Title level={1} center mt={1}>{title}</Title>
          <Title level={2} center mt={1} mb={4} thin color='gray'>{subTitle}</Title>
        </Col>
      </Row>
      {services && (
        <Row>
          {services.map((item, i) => {
            return (
              <Col key={i} xs={6} sm={6} md={4}>
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
