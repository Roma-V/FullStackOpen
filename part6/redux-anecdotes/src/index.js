/**
 * @file An entry point for Anecdotes App.
 * @author Roman Vasilyev
 */

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.js'
import store from './reducers/store.js'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)