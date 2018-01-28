import React from 'react'
import {Col, Row} from 'react-styled-flexboxgrid'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import PortfolioItem, {fragment as portfolioFragment} from '../elements/PortfolioItem'
import PageTitle from '../elements/PageTitle'

const Portfolios = ({title, subTitle, portfolios}) => {
  return (
    <div>
      <PageTitle title={title} subTitle={subTitle} />
      <Row>
        {portfolios && portfolios.map((item, i) => {
          return (
            <Col sm={6} xs={12} key={i}>
              <PortfolioItem {...item} />
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
    portfolios: allPages(filter: {type: "portfolio"}) {
      ...PortfolioItem
    }
  }
  ${portfolioFragment}
`

export default graphql(qlQuery, {
  options: ({path}) => {
    return {
      variables: {
        id: path
      }
    }
  },
  props: ({data: {page, portfolios}}) => {
    return {
      ...page,
      portfolios
    }
  }
})(Portfolios)
