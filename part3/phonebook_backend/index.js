const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 1
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 2
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 3
    },
    {
      name: "Harry Potter",
      number: "32413-134-13-43",
      id: 4
    },
    {
      name: "Darth Vader",
      number: "134-34673-34",
      id: 5
    },
    {
      name: "David Applepie",
      number: "345-2565-65",
      id: 6
    },
    {
      name: "Bobby Fisher",
      number: "456-25-26256",
      id: 7
    }
  ]

const generateId = () => {
    const MAX_ID = 1000000
    let newID = 0
    do {
        newID = Math.floor(Math.random() * MAX_ID)
    } while (persons.find(person => person.id === newID))
    return newID
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (!person) {
        response.status(404).end()
    } else {
        response.json(person)
    }
})

app.get('/info', (request, response) => {
    const date = new Date()
    const size = persons.length
    
    response.send(`<p>Phonebook has info for ${size} people</p><p>${date}</p>`)
})
  
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    const existingPerson = persons.find(person => person.name === body.name)
    if (existingPerson) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})
  
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})