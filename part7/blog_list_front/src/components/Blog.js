/**
 * @file Blog element.
 * @author Roman Vasilyev
 */

import React, { useState, useEffect } from 'react'
import { Link,  Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { initBlogs, createBlog, likeBlog, addComment, deleteBlog } from '../reducers/blogReducer.js'

import Togglable from './Togglable.js'

export const Blogs = () => {
  const dispatch = useDispatch()

  // Store
  const blogs = useSelector(state => state.blogs)

  // Handle visibility
  const newBlogFormRef = React.createRef()

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable
        buttonLabel1='new blog'
        buttonLabel2='cancel'
        ref={newBlogFormRef}>
        <NewBlog visibilityHandle={() => newBlogFormRef.current.toggleVisibility()}/>
      </Togglable>
      <div>The blog posts in database:</div>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog} />
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
    borderRadius: '5px',
    padding: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.author}: <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

export const BlogDetails = ({ blogId }) => {
  const dispatch = useDispatch()

  const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))

  const deleteHandler = (event) => {
    event.preventDefault()

    dispatch(deleteBlog(blog))
  }

  const commentHandler = (event) => {
    event.preventDefault()
    const comment = event.target[0].value

    dispatch(addComment(blogId, comment))

    event.target[0].value = ''
  }

  if (!blog) return <Redirect to="/" />

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
          URL: <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
      </div>
      <div className="likes">
          Likes: {blog.likes}
        <button className="likeButton" onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>
          Creator: {blog.user.username}
      </div>
      <button onClick={deleteHandler}>remove</button>
      <h3>Comments</h3>
      <form onSubmit={commentHandler}>
        <input
          type="text"
          name="comment"
        />
        <button id="newCommentButton" type="submit">add comment</button>
      </form>
      {blog.comments.map(comment =>
        <li key={comment.id}>{comment.content}</li>
      )}
    </div>
  )
}

const NewBlog = ({ visibilityHandle }) => {
  const dispatch = useDispatch()

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

    dispatch(createBlog(newBlog))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    // Switch visibility
    visibilityHandle()
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
        <button id="newBlogButton" type="submit">create</button>
      </form>
    </div>
  )
}

export default Blogs