import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import config from '../config'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const logMiddleware = new ApolloLink((operation, forward) => {
  // console.log('logMiddleware', Object.keys(operation), operation)
  return forward(operation)
})

function create (initialState) {
  const cache = new InMemoryCache().restore(initialState || {})
  const stateLink = withClientState({
    cache,
    resolvers: {
      Mutation: {
        updateMenuStatus: (_, { menuVisible }, { cache }) => {
          const data = {
            uiState: {
              __typename: 'UIState',
              menuVisible
            }
          }
          cache.writeData({ data })
          return null
        },
        updateDropdownToggle: (_, { dropdownVisible }, { cache }) => {
          const data = {
            uiState: {
              __typename: 'UIState',
              dropdownVisible
            }
          }
          cache.writeData({ data })
          return null
        }
      }
    },
    defaults: {
      uiState: {
        __typename: 'UIState',
        menuVisible: false,
        dropdownVisible: false
      }
    }
  })
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      logMiddleware,
      stateLink,
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
