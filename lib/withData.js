import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApollo from './initApollo'
import gql from 'graphql-tag'

function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
}

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps (ctx) {
      let serverState = { apollo: { } }

      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }
      if (!process.browser) {
        const apollo = initApollo()
        const url = {query: ctx.query, pathname: ctx.pathname}
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (error) {
          console.log('ApolloProvider error', error.message)
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        Head.rewind()
        const pageQuery = apollo.readQuery({
          query: gql`
            query page ($id: ID!) {
              Page (id: $id) {
                id
                title
              }
            }
          `,
          variables: {
            id: ctx.asPath
          }
        })
        if (!pageQuery.Page) {
          ctx.res.statusCode = 404
        }
        const data = apollo.cache.extract()
        serverState = {
          apollo: {
            data
          }
        }
      }
      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor (props) {
      super(props)
      this.apollo = initApollo(this.props.serverState.apollo.data)
    }

    render () {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
