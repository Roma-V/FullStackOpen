/**
 * @file This file provides a redux store for Anecdotes App.
 * @author Roman Vasilyev
 */

import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, { initAnecdotes} from './anecdoteReducer.js'
import notificationReducer from './notificationReducer.js'
import filterReducer from './filterReducer.js'

import anecdoteServices from '../services/anecdoteServices.js'


const store = createStore(
    combineReducers({
        notification: notificationReducer,
        filter: filterReducer,
        anecdotes: anecdoteReducer
    }),
    composeWithDevTools()
)

anecdoteServices.getAll().then(anecdotes => {
    store.dispatch(initAnecdotes(anecdotes))
})

export default store