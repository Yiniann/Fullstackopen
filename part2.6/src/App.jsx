import { useState, useEffect } from 'react';
import Filter from './Filter';
import Persons from './Persons';
import PersonForm from './PersonForm';
import './styles.css';
import personsServer from './services/persons';
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [noticeMessage, setNoticeMessage] = useState(null)

  useEffect(() => {
    personsServer
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => console.error('Error fetching persons:', error));
  }, []);

  const handlePersonChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName.trim()) {
      setNoticeMessage(
        'please enter some info'
      );
      setTimeout(() => {
        setNoticeMessage(null)
      }, 5000)
      return;
    }
    const existingPerson = persons.find(person =>person.name === newName)
    
    if (existingPerson){
      const confirmUpdate = window.confirm(
        `${newName}is already in the phonkbook,  replace the old number with the new one? `
      )

      if (confirmUpdate){
        const updatedPerson={...existingPerson, number:newNumber}

        personsServer
        .update(existingPerson.id,updatedPerson)
        .then(returnedPerson=>{
          setPersons(persons.map(person=>
            person.id !== existingPerson.id? person :returnedPerson
          ))
          setNewName('')
          setNewNumber('')
          setNoticeMessage(`Updated ${newName}'s number successfully.`)
          setTimeout(() => {
            setNoticeMessage(null)
          }, 5000);
        })
        .catch(error=>{
          console.error('Error updating Person',error)
          setNoticeMessage(`Failed to update ${newName}'s Number.Please check`)
          setTimeout(() => {
            setNoticeMessage(null)
          }, 5000)
          setPersons(persons.filter(person=>person.id !==existingPerson.id))
        })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }

    personsServer
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNoticeMessage(`Added ${newName} successfully`)
        setTimeout(() => {
          setNoticeMessage(null)
        }, 5000);
      })
      .catch(error => console.error('Error adding person:', error));
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personsServer
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNoticeMessage(`'${name}' has been removed`)
          setTimeout(() => {
            setNoticeMessage(null)
          }, 5000);
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setNoticeMessage(`The person '${name}' was already deleted from the server.`)
          setTimeout(() => {
            setNoticeMessage(null)
          }, 5000);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div className="app-container">
      <div className="left-panel">
        <h2>Phonebook</h2>
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <h2>Add a new</h2>
        <Notification message={noticeMessage}/>
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
        <Persons persons={personsToShow} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
