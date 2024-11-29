import { useState, useEffect } from "react";
import axios from 'axios'

const App=()=>{
  const [countries,setCountries] = useState([])
  const [filter,setFilter] = useState('')

  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response=>{
      setCountries(response.data)
    })
  },[])

const handleFilter =(event)=> setFliter(event.target.value)

const show =()=>{filter ?
  countries.filter(countries=>countries.namee.toLocaleLowerCase().includes(filter.toLowerCase())): 
  countries
}


  return(
    <div>
        <div>
          find country<input value={filter} onChange={handleFilter}></input>
        </div>
        <h1>
          {show.map(country=><li>{country.name}</li>)}
        </h1>
    </div>
  )
}
export default App