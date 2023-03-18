const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./model/person")

const app = express()
app.use(express.json())
app.use(cors())
morgan.token("data", (request) => {
  return JSON.stringify(request.body)
})
app.use(morgan(":method :url :status - :total-time ms :data"))
app.use(express.static("../frontend/build/"))

function getAllPersons() {
  return Person.find({})
}

function unknownEndpoint(_, response) {
  response.status(404).send({ error: "unknown endpoint" })
}

function errorHandler(error, _, response, next) {
  console.log(error.message)
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" })
  }
  next(error)
}

app.get("/api/persons", (_, response) => {
  getAllPersons().then(persons => {
    response.json(persons)
  })
})

app.get("/info", (_, response) => {
  getAllPersons().then(persons => {
    response.send(`Phonebook has info for ${persons.length} people.<br/>${new Date()}`)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })

})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  Person
    .findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(err => console.log(err.message))
  // persons = persons.filter(p => p.id !== id)
  response.send()
})

app.post("/api/persons", async (request, response) => {
  const { name, number } = request.body

  const persons = await getAllPersons()

  let message;
  if (!name) {
    message = "Name is missing"
  } else if (!number) {
    message = "Number is missing"
  } else if (persons.find(p => p.name === name)) {
    message = "Name must be unique"
  }

  if (message) {
    return response.status(400).json({ error: message })
  }

  const newPerson = new Person({
    name: name,
    number: number
  })
  response.json(await newPerson.save())
})

app.put("/api/persons/:id", async (request, response, next) => {
  const { name, number } = request.body
  const updatedPerson = await Person
    .findByIdAndUpdate(request.params.id, { name: name, number: number }, { new: true })
    .catch(error => {
      console.log(error)
      next(error)
    })
  if (updatedPerson) {
    response.json(updatedPerson)
  } else {
    response.status(404).end()
  }
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

