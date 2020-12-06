/**
 * @file implements main app code for Unicafe prject.
 * @author Roman Vasilyev
 */

import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer.js'

const store = createStore(reducer)

const App = () => {
  const feedback = (rating) => {
    return () => {
      store.dispatch({
        type: rating
      })
    }
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={feedback('GOOD')}>good</button> 
      <button onClick={feedback('OK')}>neutral</button> 
      <button onClick={feedback('BAD')}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
