/**
 * @file An entry point for Library Frontend App.
 * @author Roman Vasilyev
 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

import { HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from 'apollo-link-context'

const tokenPath = 'library-user-token'

/*
 * Apollo
 */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(tokenPath)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)