/**
 * @license
 * Copyright (c) 2020 Example Corporation Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * @file contains main logic for the Blog List app frontend.
 * @author Roman Vasilyev
 */

import React, { useState, useEffect } from 'react'
import Blogs from './components/Blog.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import Login from './components/Login.js'

/*
 * Main App component
 */
const App = () => {
  /*
   * 1. States
   */
  // Notification
  const [ message, setMessage ]  = useState(null)
  const [ messageType, setMessageType ]  = useState('notification')

  // User login
  const [user, setUser] = useState(null)

  // Blogs listing
  const [blogs, setBlogs] = useState([])

  /*
   * 2. Effects
   */
  // Fetch blogs from API
  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs( blogs.sort((e1, e2) => {
          return e2.likes - e1.likes
        }) )
      )
  }, [])

  // Handle login info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userLogin = JSON.parse(loggedUserJSON)
      setUser(userLogin)
      blogService.setToken(userLogin.token)
    }
  }, [])

  // Login the user upon submitting credentials
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value

    try {
      const userLogin = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userLogin)
      )

      setUser(userLogin)
    } catch (exception) {
      notify('Wrong credentials', 'error')
    }
  }

  // Log the user out
  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')

    setUser(null)
    notify('User logged out', 'notification')
  }

  // Post a new blog to database
  const handleNewBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(savedBlog))
      notify(savedBlog.title.concat(' added'), 'notification')
    } catch (exception) {
      notify('Wrong credentials', 'error')
      console.log(exception)
    }
  }

  // Put an updated blog to database
  const handleBlogUpdate = async (blogUpdate) => {
    try {
      const updatedBlog = await blogService.put(blogUpdate)

      console.log(updatedBlog)
      setBlogs(blogs
        .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      )
      notify(updatedBlog.title.concat(' updated'), 'notification')
    } catch (exception) {
      notify('Wrong credentials', 'error')
      console.log(exception)
    }
  }

  // Delete a blog from database
  const handleBlogDelete = async (blogId) => {
    try {
      const status = await blogService.remove(blogId)

      setBlogs(blogs
        .filter(blog => blog.id !== blogId)
      )
      notify(`blog ${blogId} deleted`, 'notification')
    } catch (exception) {
      notify('Wrong credentials', 'error')
      console.log(exception)
    }
  }

  // Notification
  const notify = (message, type, duration=3000) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, duration)
  }

  /*
   * 3. Rendering
   */
  return (
    <div>
      <Notification message={message} type={messageType} />
      {
        user === null
          ? <Login loginHandler={handleLogin} />
          : <Blogs username={user.username}
            blogs={blogs}
            logoutHandler={handleLogout}
            newBlogHandler={handleNewBlog}
            blogUpdateHandler={handleBlogUpdate}
            blogDeletionHandler={handleBlogDelete} />
      }
    </div>
  )
}

/*
 * Notification component
 */
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

/*
 * Exports
 */
export default App