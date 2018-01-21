import React from 'react'
import Head from 'next/head'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const MetaFields = ({title: pageTitle, MetaField}) => {
  const title = (MetaField && MetaField.title) || pageTitle
  return (
    <Head>
      {title && <title>{title}</title>}
      {MetaField && MetaField.description && <meta name='description' content={MetaField.description} />}
      <meta name='og:title' content={title} />
      {MetaField && MetaField.description && <meta name='og:description' content={MetaField.description} />}
      {MetaField && MetaField.keywords && <meta name='keywords' content={MetaField.keywords} />}
    </Head>
  )
}

const qlQuery = gql`
  query page ($id: ID!) {
    page: Page (id: $id) {
      title
      MetaField {
        title
        description
      }
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
  props: ({data: {page}}) => {
    return {
      ...page
    }
  }
})(MetaFields)

