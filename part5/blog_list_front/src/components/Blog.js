/* eslint-disable react/prop-types */
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
 * @file Blog element.
 * @author Roman Vasilyev
 */

import { getSuggestedQuery } from '@testing-library/react'
import React, { useState } from 'react'
import Togglable from './Togglable.js'

const Blogs = ({ username, blogs, logoutHandler, newBlogHandler }) => {
  // Handle visibility of the new blog form
  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false)
  const hideWhenVisible = { display: newBlogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogFormVisible ? '' : 'none' }

  // Handle visibility
  const newBlogFormRef = React.createRef()

  // Handle submition of a new blog
  const addBlog = (newBlog) => {
    newBlogHandler(newBlog)
    newBlogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {username} logged in
        <button type="submit" onClick={logoutHandler}>logout</button>
      </div>
      <Togglable
        buttonLabel1='new blog'
        buttonLabel2='cancel'
        ref={newBlogFormRef}>
        <NewBlog submit={addBlog}/>
      </Togglable>
      <div>The blog posts in database:</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const Blog = ({ blog }) => {
  // Handle visibility
  const blogRef = React.createRef()

  // Visual style
  const blogStyle = {
    backgroundColor: 'Cornsilk',
    border: 'solid',
    borderWidth: 1,
    borderColor: 'Burlywood',
    padding: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <Togglable
        buttonLabel1='view'
        buttonLabel2='hide'
        ref={blogRef}>
        <BlogDetails blog={blog} />
      </Togglable>
    </div>
  )
}

const BlogDetails = ({ blog }) => (
  <div>
    <div>
        URL: <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
    </div>
    <div>
        Likes: {blog.likes}
      <button>like</button>
    </div>
    <div>
        Creator: {blog.user.username}
    </div>
    <button>remove</button>
  </div>
)

const NewBlog = ({ submit }) => {
  // New blog form inputs
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // Handle submition of a new blog
  const addBlogHandler = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    submit(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlogHandler}>
        <div>
          Title
          <input
            type="text"
            name="Title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="Author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            name="URL"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default Blogs