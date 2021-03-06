const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const url = process.env.MONGODB_URI
console.log('connecting to...', url)
const uniqueValidator = require('mongoose-unique-validator');

//connect mongoose to the database/cluster
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(res => {
    console.log('connected to mongoDB')
})
.catch((err) => {
    console.log('error connecting to mongoDB', err.message)
})
//create your Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 9,
        required: true
    }
})
personSchema.plugin(uniqueValidator)
//format schema correctly
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

//export model 
module.exports = mongoose.model('Person', personSchema)