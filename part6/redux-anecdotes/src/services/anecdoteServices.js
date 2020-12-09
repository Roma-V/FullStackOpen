/**
 * @file services for working with anecdotes API.
 * @author Roman Vasilyev
 */

import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newAnecdote => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const update = async (updatedAnecdote) => {
    const response = await axios.put(
        baseUrl.concat(`/${updatedAnecdote.id}`),
        updatedAnecdote
    )
    return response.data
}

export default {
  getAll,
  create,
  update,
}