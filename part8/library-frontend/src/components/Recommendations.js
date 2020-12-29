/**
 * @file Recommendations component for Library Frontend App.
 * @author Roman Vasilyev
 */

import React from 'react'

const Recommendations = ({ show, favoriteBooks, favoriteGenre }) => {
  // Conditional render
  if (!show) return null
  if (!favoriteBooks.called) return null
  if (favoriteBooks.loading) return <div>Loading ...</div>
  if (favoriteBooks.error) return `Error! ${favoriteBooks.error.message}`

  // Main render
  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre: <b>{favoriteGenre}</b></p>
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
          {favoriteBooks.data.allBooks
            .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations