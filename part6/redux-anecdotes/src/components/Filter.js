/**
 * @file An input field that filters the list of anecdotes.
 * @author Roman Vasilyev
 */

import React from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer.js'

const Filter = () => {
  const dispatch = useDispatch()

  const updateFilter = (event) => {
    event.preventDefault()
    const query = event.target.value

    dispatch(filter(query))
  }

  return (
    <div className="filter">
      filter:<input name='filter' onChange={updateFilter} />
    </div>
  )
}

export default Filter