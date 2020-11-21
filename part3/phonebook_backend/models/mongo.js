/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the DB password as an argument: node index.js <password> [name, number]')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.m5jx1.mongodb.net/contacts?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true }
)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', contactSchema)

if (process.argv.length === 3) {
  // Only password provided. Fetch all entries and print them.
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else  {
  // Data provided. Add the data to DB.
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4] || ''
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}


