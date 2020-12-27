/**
 * @file Main App component for Library Frontend App.
 * @author Roman Vasilyev
 */

import React, { useState } from 'react'
import Authors from './components/Authors.js'
import Books from './components/Books.js'
import NewBook from './components/NewBook.js'
import Login from './components/Login.js'

import { useApolloClient, useQuery } from '@apollo/client'

import { ME } from './queries.js'

const tokenPath = 'library-user-token'

/*
 * React
 */
const App = () => {
  const client = useApolloClient()

  const { data: userData, refetch: refetchUser } = useQuery(ME)
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(
    localStorage.getItem(tokenPath) || null
  )

  const login = token => {
    setUser(token)
    localStorage.setItem(tokenPath, token)
    refetchUser()
    setPage('authors')
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { user ? <button onClick={() => setPage('add')}>add book</button> : '' }
        {
          !user
            ? <button onClick={() => setPage('login')}>login</button>
            : <button onClick={logout}>logout</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        user={user}
      />

      <Books
        show={page === 'books'}
        user={userData}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        loginHandler={login}
      />

    </div>
  )
}

export default App