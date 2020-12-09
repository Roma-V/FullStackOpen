/**
 * @file A from that submits new anecdote.
 * @author Roman Vasilyev
 */

import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, asObject } from '../reducers/anecdoteReducer.js'
import { showNotification, hideNotification } from '../reducers/notificationReducer.js'
import anecdoteServices from '../services/anecdoteServices.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length === 0) return

    event.target.anecdote.value = ''

    const storageRecord = asObject(content)
    const savedAnecdote = await anecdoteServices.create(storageRecord)

    dispatch(createAnecdote(savedAnecdote))

    dispatch(showNotification(`Added: "${content}"`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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