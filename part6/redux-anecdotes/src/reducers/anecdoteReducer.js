/**
 * @file Redux reducer that stores anecdotes and manages their lifecycle.
 * @author Roman Vasilyev
 */

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
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1 
      }
      return state.map(note =>
        note.id !== id ? note : changedAnecdote 
      )
     }
    default:
      return state
  }
}

export const initAnecdotes = (content) => {
  return {
    type: 'INIT_ANECDOTE',
    data: content
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer