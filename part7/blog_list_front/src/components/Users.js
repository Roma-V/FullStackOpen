/**
 * @file Users element.
 * @author Roman Vasilyev
 */

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Users = () => {
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