/**
 * @file Login component for Library Frontend App.
 * @author Roman Vasilyev
 */
import React, { useState, useEffect } from 'react'

import { useMutation} from '@apollo/client'

import { LOGIN } from '../queries.js'

const LoginForm = ({ show, loginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data)
        loginHandler(result.data.login.value)
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    
    login({ 
      variables: { 
        username,
        password
      } 
    })

    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
