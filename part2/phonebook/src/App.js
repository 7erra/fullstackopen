import { useState } from 'react'

const Input = ({ label, value, onChange }) => {
  return (
    <div>
      {label} <input value={value} onChange={onChange} />
    </div>
  )
}

const Book = ({ persons }) => {
  return (
    <div>
      {persons.map(p => <Person key={p.name} name={p.name} number={p.number} />)}
    </div>
  )
}

const Person = ({ name, number }) => {
  return (
    <div>{name} {number} </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const person = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
    setNewName("")
    setNewNumber("")
  }

  const [newNumber, setNewNumber] = useState("")

  const [filter, setFilter] = useState("")

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Book persons={persons.filter(p => filter === "" || p.name.toLowerCase().includes(filter.toLowerCase()))} />
    </div>
  )
}

export default App
