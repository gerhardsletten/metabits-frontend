import gql from 'graphql-tag'

export const PageBanner = gql`
  fragment PageBanner on Page {
      Banner {
        title
        lead
        image
        linkText
        uri
      }
    }
`
