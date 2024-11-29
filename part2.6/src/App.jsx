import { useState, useEffect} from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import './styles.css'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id : 1, number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  //状态钩子
  useEffect(()=>{
    axios
    .get('http://203.55.176.209:3001/persons')
    .then(response=>{
      console.log('promise fullfilled')
      setPersons(response.data)
    })
  },[])
  console.log('render', persons.length, 'person')

  //事件处理
  const handlePersonChange=(event)=> setNewName(event.target.value)
  const handleNumberChange=(event)=> setNewNumber(event.target.value)
  const handleFilterChange=(event)=>setFilter(event.target.value)

  //判断是否重复
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
    setPersons((prevPersons) => prevPersons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  const personsToShow=filter ?
  persons.filter(person=> person.name.toLocaleLowerCase().includes(filter.toLowerCase())
) : persons;

return (
  <div className="app-container">
    <div className="left-panel">
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handlePersonChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
    </div>
    <div className="right-panel">
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  </div>
);
}

export default App