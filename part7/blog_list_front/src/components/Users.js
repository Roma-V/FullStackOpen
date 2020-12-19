/**
 * @file Users element.
 * @author Roman Vasilyev
 */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { initUsers } from '../reducers/usersReduser.js'

export const Users = () => {
  const dispatch = useDispatch()

  // Fetch blogs from API
  useEffect(() => {
    dispatch(initUsers())
  }, [])

  // Store
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export const UserDetails = ({ userId }) => {
  // Store
  const user = useSelector(state => state.users.find(user => user.id === userId))

  if (!user) {
    return null
  } else return (
    <div>
      <h2>{user.username}</h2>
      <h3>added {user.blogs.length} blogs</h3>
      {user.blogs.map(blog =>
        <li key={blog.id}>{blog.title}</li>
      )}
    </div>
  )
}

export default Users