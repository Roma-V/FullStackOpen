/**
 * @file Books component for Library Frontend App.
 * @author Roman Vasilyev
 */

import React, { useState } from 'react'

import { useMutation } from '@apollo/client'

import { NEW_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries.js'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(NEW_BOOK, {
    refetchQueries: [
        { query: ALL_BOOKS }, 
        { query: ALL_AUTHORS }
      ],
    onError: (error) => {
      console.log(error)
    }
  });

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    if (genres.length > 0)
      addBook({ 
        variables: { 
          title,
          author,
          published: parseInt(published),
          genres
        } 
      })
    else addBook({ 
      variables: { 
        title,
        author,
        published: parseInt(published)
      } 
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook