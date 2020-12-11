/**
 * @file A list of anecdotes.
 * @author Roman Vasilyev
 */

import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer.js'

const AnecdoteList = props => (
  <div>
    {props.anecdotes
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
          <button onClick={() => props.vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </div>
)

const mapStateToProps = (state) => {
  return {
    anecdotes: (state.anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase()
        .includes(state.filter.toLowerCase())
    }))
  }
}

const mapDispatchToProps = {
  vote
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList