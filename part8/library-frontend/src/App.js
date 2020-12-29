/**
 * @file Main App component for Library Frontend App.
 * @author Roman Vasilyev
 */

import React, { useState } from 'react'
import Notification from './components/Notification.js'
import Authors from './components/Authors.js'
import Books from './components/Books.js'
import Recommendations from './components/Recommendations.js'
import NewBook from './components/NewBook.js'
import Login from './components/Login.js'

import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client'

import { ME, FAVORITE_BOOKS, ALL_BOOKS } from './queries.js'

const tokenPath = 'library-user-token'

/*
 * React
 */
const App = () => {
  const client = useApolloClient()

  // Queries
  const { data: userData, refetch: refetchUser } = useQuery(ME)
  const favoriteGenre = userData ? userData.me.favoriteGenre : ''
  const [loadFavoriteBooks, favoriteBooks] = useLazyQuery(
    FAVORITE_BOOKS,
    { 
      variables: { genre: favoriteGenre }
    }
  )

  // States
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(
    localStorage.getItem(tokenPath) || null
  )
  const notificationDefaultType = 'notification'
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(notificationDefaultType)

  // Event handlers
  const hideNotification = () => {
    setNotificationMessage(null)
    setNotificationType(notificationDefaultType)
  }
  const notify = (type, message) => {
    setNotificationMessage(message)
    setNotificationType(type)

    setTimeout(hideNotification, 3000)
  }

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

  const updateCacheWith = (addedBook) => {
    notify('notification', `${addedBook.title} added`)
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(includedIn(dataInStore.allBooks, addedBook))
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks : dataInStore.allBooks.concat(addedBook)
        }
      })
    }
  }

  // Render
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          user
            ? <button onClick={() => {
                loadFavoriteBooks()
                setPage('recommendations')
              }}>
                recommendations
              </button>
            : ''
        }
        { user ? <button onClick={() => setPage('add')}>add book</button> : '' }
        {
          !user
            ? <button onClick={() => setPage('login')}>login</button>
            : <button onClick={logout}>logout</button>
        }
      </div>
      <Notification
        type={notificationType}
        message={notificationMessage}
      />

      <Authors
        show={page === 'authors'}
        user={user}
      />

      <Books
        show={page === 'books'}
        updateCacheWith={updateCacheWith}
      />

      <Recommendations
        show={page === 'recommendations'}
        favoriteBooks={favoriteBooks}
        favoriteGenre={favoriteGenre}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <Login
        show={page === 'login'}
        loginHandler={login}
      />

    </div>
  )
}

export default App