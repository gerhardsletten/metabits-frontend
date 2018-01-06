import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import Content from '../elements/Content'

const MainTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: bold;
`

const Page = ({title, id, content, type}) => {
  return (
    <div>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <MainTitle>{title} [{type}]</MainTitle>
      <Content md={content} />
    </div>
  )
}

const qlQuery = gql`
  query page ($id: ID!) {
    page: Page (id: $id) {
      title
      id
      content
      type
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
  props: ({data}) => {
    return data.page
  }
})(Page)
