import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id : 1, number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const handlePersonChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange=(event)=>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson =(event)=>{
    event.preventDefault()
    if (persons.some(person=> person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    console.log('click add',event.target)
    const personObject={
      name:newName,
      id: persons.length + 1,
      number:newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  const personsToShow=filter ?
  persons.filter(person=> person.name.toLocaleLowerCase().includes(filter.toLowerCase())
) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {personsToShow.map(person=>(
        <li key = {person.id}>{person.name} {person.number}</li>
      ))}
      </ul>
    </div>
  )
}

export default App