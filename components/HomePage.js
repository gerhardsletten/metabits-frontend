import React from 'react'
import {Col, Row} from 'react-styled-flexboxgrid'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import PageBanner, {fragment as bannerFragment} from '../elements/PageBanner'
import Feature, {fragment as featureFragment} from '../elements/Feature'
import Wrapper from '../elements/Wrapper'
import Title from '../elements/Title'

const HomePage = ({title, Banner, services}) => {
  return (
    <div>
      {Banner && <PageBanner {...Banner} />}
      <Wrapper>
        {services && (
          <Row>
            <Col xs={12}>
              <Title level={2} center mt={1}>Våre tjenester</Title>
            </Col>
            {services.map((item, i) => {
              return (
                <Col key={i} xs={12} sm={6} md={4}>
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
      id
      title
      ...PageBanner
    }
    services: allPages(filter: {type: "service"}) {
      ...Feature
    }
  }
  ${bannerFragment}
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
})(HomePage)
