/**
 * @file contains main logic for the Blog List app frontend.
 * @author Roman Vasilyev
 */

import React, { useEffect } from 'react'
import { Switch,
  Route,
  useRouteMatch,
  NavLink,
  Redirect
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setUser, logout } from './reducers/loginReducer.js'
import { initBlogs } from './reducers/blogReducer.js'
import { initUsers } from './reducers/usersReduser.js'

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

  // Fetch blogs from API
  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  // Fetch users from API
  useEffect(() => {
    dispatch(initUsers())
  }, [])

  // Store state
  const blogsLoaded = useSelector(state => state.blogs.length > 0)
  const usersLoaded = useSelector(state => state.users.length > 0)

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

  // NavBar stype
  const navBarSyle = {
    padding: 5,
    display: 'inline'
  }

  /*
   * 3. Rendering
   */
  return (
    <div>
      <div>
        <NavLink to='/' style={navBarSyle}>Blogs</NavLink>
        <NavLink to='/users' style={navBarSyle}>Users</NavLink>
        {
          loggedUser === null
            ? ''
            : <div style={navBarSyle}>
              {loggedUser.username} logged in
              <button type="submit" onClick={() => dispatch(logout())}>logout</button>
            </div>
        }
      </div>
      <Notification />
      <Switch>
        <Route path='/login'>
          {
            loggedUser === null
              ? <Login />
              : <Redirect to="/" />
          }
        </Route>
        <Route path='/users/:id'>
          {
            usersLoaded
              ? <UserDetails userId={userPath ? userPath.params.id: null} />
              : <Redirect to="/" />
          }
        </Route>
        <Route path='/blogs/:id'>
          {
            blogsLoaded
              ? <BlogDetails blogId={blogPath ? blogPath.params.id: null} />
              : <Redirect to="/" />
          }
        </Route>
        <Route path='/users'>
          {
            loggedUser
              ? (usersLoaded ? <Users /> : <Redirect to="/" />)
              : <Redirect to="/login" />
          }
        </Route>
        <Route path='/'>
          {
            loggedUser
              ? <Blogs />
              : <Redirect to="/login" />
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