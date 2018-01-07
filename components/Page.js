import React from 'react'
import styled from 'styled-components'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import MetaFields, {fragment as metaFragment} from '../elements/MetaFields'
import Content from '../elements/Content'

const MainTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: bold;
`

const Page = ({title, id, content, type, MetaField}) => {
  return (
    <div>
      <MetaFields title={title} MetaField={MetaField} />
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
      ...MetaFields
    }
  }
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
  props: ({data}) => {
    return data.page
  }
})(Page)
