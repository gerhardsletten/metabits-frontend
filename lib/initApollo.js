import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { persistCache } from 'apollo-cache-persist'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import config from '../config'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}
/*
const logMiddleware = new ApolloLink((operation, forward) => {
  console.log('operation', operation.getContext().gerhard)
  return forward(operation)
})
*/

function create (initialState) {
  const cache = new InMemoryCache().restore(initialState || {})
  if (process.browser && config.enableOffline) {
    persistCache({
      key: config.contentVersion,
      cache,
      storage: window.localStorage
    })
  }
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([
      createHttpLink({
        uri: `${!process.browser ? config.wpApi : ''}/graphql`,
        credentials: 'same-origin'
      })
    ]),
    cache
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
