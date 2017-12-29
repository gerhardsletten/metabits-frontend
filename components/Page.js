import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import config from '../config'

const MainTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: bold;
`

const Content = styled.div`
  margin-bottom: 1rem;
  p {
    margin-bottom: 1rem;
  }
`

const Page = ({title, id, content, type}) => {
  console.log('Page render', title)
  return (
    <div>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <MainTitle>{title} [{type}: {id}]</MainTitle>
      <Content dangerouslySetInnerHTML={{__html: content}} />
    </div>
  )
}

const qlQuery = gql`
  query page ($uri: String!) {
    page: pageBy (uri: $uri) {
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
        uri: path === '/' ? config.homeSlug : path
      }
    }
  },
  props: ({data}) => {
    return data.page
  }
})(Page)
