/**
 * @file This file provides a redux store for Anecdotes App.
 * @author Roman Vasilyev
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anecdoteReducer from './anecdoteReducer.js'
import notificationReducer from './notificationReducer.js'
import filterReducer from './filterReducer.js'

const store = createStore(
    combineReducers({
        notification: notificationReducer,
        filter: filterReducer,
        anecdotes: anecdoteReducer
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store