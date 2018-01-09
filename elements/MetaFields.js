import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'


export const fragment = gql`
  fragment MetaFields on Page {
    title
    MetaField {
      title
      description
    }
  }
`

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

export default MetaFields
