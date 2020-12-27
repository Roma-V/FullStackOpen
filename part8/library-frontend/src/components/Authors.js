/**
 * @file Authors component for Library Frontend App.
 * @author Roman Vasilyev
 */
import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import { useQuery , useMutation} from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries.js'

/*
 * A list of authors in database
 */
const Authors = (props) => {
  // Queries
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  // Conditional render
  if (!props.show) {
    return null
  }

  if (loading) return <div>Loading ...</div>
  if (error) return `Error! ${error.message}`

  // Main render
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        props.user
          ? <AuthorForm authors={data.allAuthors} />
          : ''
      }
      
    </div>
  )
}

/*
 * A form that allows edit athour birth year
 */
const AuthorForm = ({ authors }) => {
  // Options for Select component
  const names = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  })

  // The data used for querying
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  // Qeries
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('The author not found')
    }
  }, [result.data])

  // From submit handler
  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ 
      variables: { 
        name: name.value,
        setBornTo: parseInt(born)
      } 
    })

    setName(null)
    setBorn('')
  }

  // Render
  return (
    <div>
      <form onSubmit={submit}>
        <h4>Update an author:</h4>
        <Select
          value={name}
          onChange={option => setName(option)}
          options={names}
        />
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
