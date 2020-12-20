/**
 * @file Login form element.
 * @author Roman Vasilyev
 */

import React from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/loginReducer.js'

const Login = () => {
  const dispatch = useDispatch()

  // Login the user upon submitting credentials
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value

    dispatch(login({ username, password }))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            type="text"
            name="Username"
          />
        </div>
        <div>
            password
          <input
            type="password"
            name="Password"
          />
        </div>
        <button id="newUserButton" type="submit">login</button>
      </form>
    </div>
  )
}

export default Login