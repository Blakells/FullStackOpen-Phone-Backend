require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time :body'))

// root api
app.get('/', (req, res) => {
  res.send('Home')
})

//phonebook info
app.get('/info', (req, res) => {
  Person.count({})
  .then(personsLength => {
    res.send(`
    <p>Phonebook has a total of ${person} contacts</p>
    <p>${new Date()}</p>
    `)
  })
})

// show entire phonebook
app.get('/api/persons', (req, res) =>{
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()))
  })
})

// phonebook info page
app.get('/info', (req, res) => {
  const length = phonebook.length
  res.send(`<p>Phonebook has ${length} people</p>` + new Date())
  res.send(new Date())
})

// show single person by id
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(people => {
    res.json(people.toJSON())
  })
})

// delete single person by id
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(ress => {
    console.log('person deleted successfully')
    res.status(204).end()
  })
  .catch(err => next(err))
})

//update current person
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, {new : true})
  .then(updatedPerson => {
    res.json(updatedPerson.toJSON())
  })
  .catch(err => next(err))
})

// add single person
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  
  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    return savedPerson.toJSON()
  })
  .then(savedAndFormattedPerson => {
    console.log(savedAndFormattedPerson)
    res.json(savedAndFormattedPerson)
  })
  .catch(err => next(err))
})

//error handler middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(404).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen((PORT), () => {
  console.log(`server up on port ${PORT}`)
})