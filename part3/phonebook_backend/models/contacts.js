const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

const numberPatter = /\d{1,}/g

console.log('connecting to DB', url)

mongoose.connect(url, { useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true }
).then(result => {
    console.log('Connected to DB')
}).catch(reuslt => {
    console.log('connection to DB failed', error.message)
})

const contactSchema = new mongoose.Schema({
    name: { 
        type: String,
        minlength: [3, 'Too short a name'],
        required: true, 
        unique: true
    },
    number: {
        type: String,
        validate: {
            validator: number => {
              const digits = number.match(numberPatter).join('')
              return digits.length >= 8
            },
            message: props => `${props.value} requires at least 8 digits`
          },
    }
})

contactSchema.set('toJSON', {
    transform: (document, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})

contactSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', contactSchema)