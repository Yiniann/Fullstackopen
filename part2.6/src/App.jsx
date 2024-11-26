import { useState } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import './styles.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id : 1, number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handlePersonChange=(event)=> setNewName(event.target.value)
  const handleNumberChange=(event)=> setNewNumber(event.target.value)
  const handleFilterChange=(event)=>setFilter(event.target.value)

  const isDuplicateName=(name)=>persons.some(person=>person.name === name)
  const isDuplicateNumber=(number)=>persons.some(person=>person.number === number)

  const addPerson =(event)=>{
    event.preventDefault()
    if (!newName.trim()){
      alert('Please enter a name')
      return
    }
    if (isDuplicateName(newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (isDuplicateNumber(newNumber)){
      alert(`${newNumber}is already added to phonebook`)
      return
    }
    
    console.log('click add',event.target)
    const personObject={
      name:newName,
      id: Date.now(),
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
        <Filter filter={filter} onFilterChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <PersonForm 
       newName={newName}
       newNumber={newNumber}
       onNameChange={handlePersonChange}
       onNumberChange={handleNumberChange}
       onSubmit={addPerson}
       />
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App