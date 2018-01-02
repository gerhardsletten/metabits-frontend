import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {PageBanner} from '../fragments'

const HomePage = ({title, ...rest}) => {
  console.log('props', rest)
  return (
    <div>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <h1>{title}</h1>
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
  ${PageBanner}
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
