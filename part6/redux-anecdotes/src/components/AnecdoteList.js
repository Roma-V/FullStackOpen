/**
 * @file A list of anecdotes.
 * @author Roman Vasilyev
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer.js'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase()
        .includes(state.filter.toLowerCase())
    })
  })

  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes
        .sort((a, b) => {
          return b.votes - a.votes
        })
        .map(anecdote =>
        <div key={anecdote.id} className="anecdote">
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList