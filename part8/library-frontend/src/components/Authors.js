/**
 * @file Authors component for Library Frontend App.
 * @author Roman Vasilyev
 */
import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import { useQuery , useMutation} from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries.js'

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  if (loading) return <div>Loading ...</div>
  if (error) return `Error! ${error.message}`

  if (!props.show) {
    return null
  }

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
      <AuthorForm authors={data.allAuthors} />
    </div>
  )
}

const AuthorForm = ({ authors }) => {
  const names = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  })

  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

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

  return (
    <div>
      <form onSubmit={submit}>
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
