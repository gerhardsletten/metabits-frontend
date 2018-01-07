import React from 'react'
import {Col, Row} from 'react-styled-flexboxgrid'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import MetaFields, {fragment as metaFragment} from '../elements/MetaFields'
import Feature, {fragment as featureFragment} from '../elements/Feature'
import Wrapper from '../elements/Wrapper'
import Title from '../elements/Title'

const Services = ({title, subTitle, services, MetaField, ...props}) => {
  return (
    <div>
      <MetaFields title={title} MetaField={MetaField} />
      <Wrapper>
        <Title level={1} center mt={1}>{title}</Title>
        <Title level={2} center mt={1} mb={4} thin color='gray'>{subTitle}</Title>
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
      </Wrapper>
    </div>
  )
}

const qlQuery = gql`
  query page ($id: ID!) {
    page: Page (id: $id) {
      title
      subTitle
      ...MetaFields
    }
    services: allPages(filter: {type: "service"}) {
      ...Feature
    }
  }
  ${featureFragment}
  ${metaFragment}
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
