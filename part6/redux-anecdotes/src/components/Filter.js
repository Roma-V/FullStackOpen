/**
 * @file An input field that filters the list of anecdotes.
 * @author Roman Vasilyev
 */

import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer.js'

const Filter = props => {
  const updateFilter = (event) => {
    event.preventDefault()
    const query = event.target.value

    props.filter(query)
  }

  return (
    <div className="filter">
      filter:<input name='filter' onChange={updateFilter} />
    </div>
  )
}

const mapDispatchToProps = {
  filter
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)
export default ConnectedFilter