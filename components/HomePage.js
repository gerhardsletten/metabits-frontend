import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import PageBanner, {fragment} from '../elements/PageBanner'
import Wrapper from '../elements/Wrapper'

const HomePage = ({title, Banner, ...rest}) => {
  // console.log('props', rest)
  return (
    <div>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      {Banner && <PageBanner {...Banner} />}
      <Wrapper>
        <p>Etter</p>
      </Wrapper>
    </div>
  )
}

const qlQuery = gql`
  query page ($id: ID!) {
    page: Page (id: $id) {
      title
      content
      MetaField {
        title
        description
      }
      ...PageBanner
    }
    services: allPages(filter: {type: "service"}) {
      id
      title
      icon
    }
  }
  ${fragment}
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
