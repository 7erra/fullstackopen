import { useState, useEffect } from 'react'
import personService from "./services/persons"

const Input = ({ label, value, onChange }) => {
  return (
    <div>
      {label} <input value={value} onChange={onChange} />
    </div>
  )
}

const Book = ({ persons, removePerson }) => {
  return (
    <div>
      {persons.map(p => <Person key={p.id} person={p} removePerson={removePerson} />)}
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  const { name, number } = person
  return (
    <div>
      {name} {number} <button onClick={() => removePerson(person)}>Delete</button>
    </div>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) return null
  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const removePerson = (person) => {
    const { id, name } = person
    if (!window.confirm(`Delete ${name}?`)) {
      return
    }
    personService
      .remove(id)
      .then(() => {
        showMessage(`Deleted ${name}`)
      })
      .catch(() => {
        showMessage(`Information of ${name} has already been removed from the server`, "message-error")
      })
      .finally(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      // Person already exists
      if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
        return

      const personToChange = persons.find(e => e.name === newName)
      const changedPerson = { ...personToChange, number: newNumber }
      personService
        .changeNumber(changedPerson)
        .then(person => {
          setPersons(persons.map(p => p.id === person.id ? changedPerson : p))
          showMessage(`Changed ${person.name}'s number to ${changedPerson.number}`)
          setNewName("")
          setNewNumber("")
        })
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }

    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        showMessage(`Added ${person.name}`)
      })
  }

  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  // Notifications
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("message")

  const showMessage = (content, type = "message") => {
    setMessageType(type)
    setMessage(content)
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Input label="filter shown with" value={filter} onChange={e => setFilter(e.target.value)} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <Input label="name" value={newName} onChange={event => setNewName(event.target.value)} />
        <Input label="number" value={newNumber} onChange={event => setNewNumber(event.target.value)} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Book persons={persons.filter(p => filter === "" || p.name.toLowerCase().includes(filter.toLowerCase()))} removePerson={removePerson} />
    </div>
  )
}

export default App
