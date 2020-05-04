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

// phonebook
let phonebook = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

// root api
app.get('/', (req, res) => {
  res.send('Home')
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
app.delete('/api/persons/:id', (req, res) =>{
  const id = Number(req.params.id)
  phonebook = phonebook.filter(p => p.id !== id)
  res.status(204).end()
})

// add single person
app.post('/api/persons', (req, res) => {
  const body = req.body
  // if (!body.name) {
  //   return res.status(400).json({
  //     error: 'content missing'
  //   })
  // }
  // let findName = phonebook.find(person => person.name == body.name)
  // let findNumber = phonebook.find(person => person.number == body.number)

  // if (!body.name || !body.number) {
  //   return res.send('please enter a name and number').status(400)
  // }
  // if (findName || findNumber){
  //   res.json({
  //     error:'Must be a unique name & number'
  //   })
  // }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
    console.log(savedPerson.name)
  })
})

const PORT = process.env.PORT
app.listen((PORT), () => {
  console.log(`server up on port ${PORT}`)
})