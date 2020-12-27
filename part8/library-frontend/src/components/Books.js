/**
 * @file Books component for Library Frontend App.
 * @author Roman Vasilyev
 */

import React, { useState } from 'react'
import Select from 'react-select'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries.js'

const Books = ({ show, user}) => {
  // States
  const [genre, setGenre] = useState(null)
  const [favorite, setFavorite] = useState(false)
  
  //Queries
  const { loading, error, data: books } = useQuery(ALL_BOOKS)

  // Conditional render
  if (!show) {
    return null
  }

  if (loading) return <div>Loading ...</div>
  if (error) return `Error! ${error.message}`

  // Filtering
  const noFilterOption = 'All'
  const genres = [noFilterOption].concat(Array.from(new Set(
    books.allBooks
      .map(book => book.genres)
      .flat()
  ))).map(genre => {
    return {
      value: genre,
      label: genre
    }
  })

  // Main render
  return (
    <div>
      <h2>books</h2>
      {
        user.me
          ? <div>
              Filter by your favorite genre: 
              <input
                type="checkbox"
                onChange={() => {
                  setGenre(null) 
                  setFavorite(!favorite)
                }}
              ></input>
            </div>
          : null
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.allBooks
            .filter(a => !favorite || a.genres.includes(user.me.favoriteGenre))
            .filter(a => !genre || a.genres.includes(genre.value))
            .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        !favorite
          ? (<div>
              <h4>Filter by genre:</h4>
              <Select
                value={genre}
                onChange={option => 
                  option.value === noFilterOption
                    ? setGenre(null) 
                    : setGenre(option)}
                options={genres}
              />
             </div>)
          : null
      }
    </div>
  )
}

export default Books