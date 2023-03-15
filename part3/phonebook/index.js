const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
morgan.token("data", (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(":method :url :status - :total-time ms :data"))
app.use(express.static("build"))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get("/api/persons", (_, response) => {
  response.json(persons)
})

app.get("/info", (_, response) => {
  response.send(`Phonebook has info for ${persons.length} people.<br/>${new Date()}`)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.send()
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  let message;
  if (!body.name) {
    message = "Name is missing"
  } else if (!body.number) {
    message = "Number is missing"
  } else if (persons.find(p => p.name === body.name)) {
    message = "Name must be unique"
  }

  if (message) {
    return response.status(400).json({ error: message })
  }

  const newPerson = {
    id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
