/**
 * @file Redux reducer that stores anecdotes and manages their lifecycle.
 * @author Roman Vasilyev
 */

import anecdoteServices from '../services/anecdoteServices.js'
import { setNotification } from './notificationReducer.js'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTE':
      return action.data
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE': {
      const updatedAnecdote = action.data
      return state.map(note =>
        note.id !== updatedAnecdote.id ? note : updatedAnecdote 
      )
    }
    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes.map(element => element)
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = asObject(content)
    const savedAnecdote = await anecdoteServices.create(newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: savedAnecdote
    })

    dispatch(setNotification(`Added: "${savedAnecdote.content}"`), 5)
  }
}

export const vote = (anecdoteToUpdate) => {
  return async dispatch => {
    const savedAnecdote = await anecdoteServices.update({
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1
    })
    dispatch({
      type: 'VOTE',
      data: savedAnecdote
    })

    dispatch(setNotification(`Upvote: "${savedAnecdote.content}"`, 5))
  }
}

export default reducer