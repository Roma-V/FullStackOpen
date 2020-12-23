/**
 * @file Books component for Library Frontend App.
 * @author Roman Vasilyev
 */
import React from 'react'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries.js'

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  if (loading) return <div>Loading ...</div>
  if (error) return `Error! ${error.message}`

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

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
          {data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books