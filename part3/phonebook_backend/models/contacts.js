const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

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
    name: String,
    number: String
})

contactSchema.set('toJSON', {
    transform: (document, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})

module.exports = mongoose.model('Person', contactSchema)