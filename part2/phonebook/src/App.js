import React, { useEffect, useState } from 'react'
import contactService from './services/contacts'

// Main App component
const App = () => {
  const [ persons, setPersons ] = useState([])
  // Handle communication with server
  const loadData = () => {
    contactService.getAll()
      .then(contacts => {
      console.log('Data recieved', contacts)
      setPersons(contacts)
    })
  }
  useEffect(loadData, [])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ]  = useState(null)
  const [ messageType, setMessageType ]  = useState('notification')

  const addContact = (event) => {
    event.preventDefault()
    if (!newName) return

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      const result = window.confirm(`${newName} is already in phonebook. Replace the old number with a new one?`)
      if (result) {
        const updatePerson = {...existingPerson, number: newNumber}
        contactService.changeContact(updatePerson)
          .then(updatedContact => {
            console.log('updated contact', updatedContact)
            notify(`Changed number for ${updatedContact.name}`, 'notification')
            
            setPersons(persons.map(contact => contact.id !== updatedContact.id ? contact : updatedContact))
            clearInputs()
          })
          .catch(error => {
            console.log(error.response.data)
            notify(error.response.data.error, 'error')
          })
      }
      return
    }

    console.log('add contact:', newName)
    const newContact = {name: newName, number: newNumber}
    contactService.createContact(newContact)
      .then(contact => {
        notify(`Added ${contact.name}`, 'notification')
        setPersons(persons.concat(contact))
        clearInputs()
      })
      .catch(error => {
        console.log(error.response.data)
        notify(error.response.data.error, 'error')
      })
  }

  const deleteContact = (id) => {
    return event => {
        event.preventDefault()

        const name = persons.find(person => person.id === id).name
        const result = window.confirm(`This will delete ${name}. Are you sure?`)
        if (!result)
          return

        console.log('delete contact:', id)
        contactService.deleteContact(id)
          .then(response => {
            console.log(response.statusText);
            if (response.status === 200 || response.status === 204) {
              setPersons(persons.filter(contact => contact.id !== id))
            }
          })
          .catch(error => {
            console.log(error);
            notify(`Cannot delete ${name}`, 'error')
            loadData()
          })
    }
  }

  // Notifications
  const notify = (message, type, duration = 3000) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, duration)
  }

  // Handle UI events
  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const handleNewName = (event) => {
      setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
      setNewNumber(event.target.value)
  }

  // Render
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter name={filterName} callback={handleFilterName} />
      <h3> Add new</h3>
      <PersonForm name={newName}
        number={newNumber} 
        nameCallback={handleNewName} 
        numberCallback={handleNewNumber} 
        submitCallback={addContact}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filterName} deleteCallback={deleteContact} />
    </div>
  )
}

// Helper components used upon App rendering
const Filter = ({ name, callback }) => (
    <div>
        Filter by name:<input value={name} onChange={callback} />
    </div>
)
const PersonForm = ({ name, number, nameCallback, numberCallback, submitCallback }) => (
    <form onSubmit={submitCallback}>
        <div>
            name: <input value={name} onChange={nameCallback} />
        </div>
        <div>
            number: <input value={number} onChange={numberCallback} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)
const Persons = ({ persons, filter, deleteCallback }) => (
    <div>
        {persons.map((person) => (filter !== '' && !person.name.toLowerCase().includes(filter.toLowerCase()))
            ? ''
            : <Person key={person.id} person={person} deleteCallback={deleteCallback} />)}
    </div>
)
const Person = ({ person, deleteCallback }) => (
    <li className='person'>
      {person.name} {person.number}
      <button onClick={deleteCallback(person.id)}>delete</button>
    </li>
)

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default App