/**
 * @file A from that submits new anecdote.
 * @author Roman Vasilyev
 */

import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length === 0) return

    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
  }

  return (
    <div className="newAnecdoteForm">
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm