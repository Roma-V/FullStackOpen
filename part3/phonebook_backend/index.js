const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./models/contacts')

const app = express()
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Routes
app.get('/api/persons', (request, response) => {
    db.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    db.findById(request.params.id)
      .then(person => {
        if (person) {
          console.log('found person', person)
          response.json(person)
        } else {
          console.log('person not found')
          response.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.get('/info', (request, response) => {
    const date = new Date()
    db.estimatedDocumentCount().then(size => {
      response.send(`<p>Phonebook has info for ${size} people</p><p>${date}</p>`)
    })
})
  
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    db.exists({name: body.name}).then(personExists => {
      if (personExists) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
      } else {
        const person = new db({
          name: body.name,
          number: body.number || ''
        })
        
        person.save().then(saved => {
          response.json(saved)
        })
      }
    })
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  db.exists({name: body.name}).then(personExists => {
    if (personExists) {
      db.findByIdAndUpdate(request.params.id, body, {new: true})
        .then(updatedRecord => {
          console.log('person data updated', updatedRecord)
          response.json(updatedRecord)
        })
    } else {
      return response.status(404).end()
    }
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  db.findByIdAndRemove(request.params.id)
    .then(person => {
      console.log('deleted person', person)
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// Error handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})