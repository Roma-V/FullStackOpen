/**
 * @file Redux reducer that stores blogs and manages their lifecycle.
 * @author Roman Vasilyev
 */

import blogServices from '../services/blogs.js'
import { notify } from './notificationReducer.js'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'blog/INIT':
    return action.data
  case 'blog/NEW':
    return state.concat(action.data)
  case 'blog/LIKE': {
    const updatedBlog = action.data
    return state.map(blog =>
      blog.id !== updatedBlog.id ? blog : updatedBlog
    )
  }
  case 'blog/DELETE':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()

    dispatch({
      type: 'blog/INIT',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    // const newAnecdote = asObject(content)
    const savedBlog = await blogServices.create(blog)
    if (!savedBlog) {
      dispatch(notify(`Cannot create: "${savedBlog.title}"`, 'error'))
      return
    }

    dispatch({
      type: 'blog/NEW',
      data: savedBlog
    })

    dispatch(notify(`Added: "${savedBlog.title}"`, 'notification'))
  }
}

export const likeBlog = (blogToUpdate) => {
  return async dispatch => {
    const savedBlog = await blogServices.put({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    })
    if (!savedBlog) {
      dispatch(notify(`Cannot update: "${savedBlog.title}"`, 'error'))
      return
    }

    dispatch({
      type: 'blog/LIKE',
      data: savedBlog
    })

    dispatch(notify(`Upvote: "${savedBlog.title}"`, 'notification'))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    const responseStatus = await blogServices.remove(blog.id)
    if (responseStatus >=  400) {
      dispatch(notify(`Cannot delete: "${blog.title}"`, 'error'))
      return
    }

    dispatch({
      type: 'blog/DELETE',
      data: blog.id
    })

    dispatch(notify(`Deleted: "${blog.title}"`, 'notification'))
  }
}

export default reducer