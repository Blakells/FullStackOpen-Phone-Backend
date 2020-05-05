const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI
console.log('connecting to...', url)

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
    name: String,
    number: String
})
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