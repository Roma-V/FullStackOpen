import React, { useState } from 'react'

// Main App component
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (!newName) return

    if (persons.find(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
        return
    }

    console.log('add contact:', newName)
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const handleNewName = (event) => {
      setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
      setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={filterName} callback={handleFilterName} />
      <h3> Add new</h3>
      <PersonForm name={newName}
        number={newNumber} 
        nameCallback={handleNewName} 
        numberCallback={handleNewNumber} 
        submitCallback={addContact}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filterName} />
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
const Persons = ({ persons, filter }) => (
    <div>
        {persons.map((person) => (filter !== '' && !person.name.toLowerCase().includes(filter.toLowerCase()))
            ? ''
            : <Person person={person} />)}
    </div>
)
const Person = ({ person }) => (
    <li key={person.name}>{person.name} {person.number}</li>
)

export default App