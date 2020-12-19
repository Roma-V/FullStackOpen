/**
 * @file contains main logic for the Blog List app frontend.
 * @author Roman Vasilyev
 */

import React, { useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { login, setUser } from './reducers/loginReducer.js'

import Notification from './components/Notification.js'
import { Users, UserDetails } from './components/Users.js'
import { Blogs, BlogDetails } from './components/Blog.js'
import Login from './components/Login.js'

/*
 * Main App component
 */
const App = () => {
  const dispatch = useDispatch()

  // User login
  const loggedUser = useSelector(state => state.login)

  const userPath = useRouteMatch('/users/:id')
  const blogPath = useRouteMatch('/blogs/:id')

  // Handle login info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userLogin = JSON.parse(loggedUserJSON)
      dispatch(setUser(userLogin))
    }
  }, [])

  // Login the user upon submitting credentials
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value

    dispatch(login({ username, password }))
  }

  /*
   * 3. Rendering
   */
  return (
    <div>
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <UserDetails userId={userPath ? userPath.params.id: null} />
        </Route>
        <Route path='/blogs/:id'>
          <BlogDetails blogId={blogPath ? blogPath.params.id: null} />
        </Route>
        <Route path='/'>
          <Users />
          {
            loggedUser === null
              ? <Login loginHandler={handleLogin} />
              : <Blogs username={loggedUser.username} />
          }
        </Route>
      </Switch>
    </div>
  )
}

/*
 * Exports
 */
export default App