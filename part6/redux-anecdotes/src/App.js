/**
 * @file Main React component for Anecdotes App.
 * Assembles all parts together.
 * @author Roman Vasilyev
 */

import React from 'react'
import Notification from './components/Notification.js'
import Filter from './components/Filter.js'
import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'

const App = () => {
  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App