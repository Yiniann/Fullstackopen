import { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectCountry, setSelectCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);


  useEffect(() => {
    const filterCountries = () => {
      return filter
        ? countries.filter(country =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
        : countries;
    };
    setFilteredCountries(filterCountries());
  }, [filter, countries]);

  const handleFilter = (event) => setFilter(event.target.value);

  const handleCountryClick = (country) => {
    setSelectCountry(country);
  };

  return (
    <div>
      <div>
        <label htmlFor="country-search">Find country:</label>
        <input 
          id="country-search"
          value={filter} 
          onChange={handleFilter} 
          placeholder="Search for a country"
        />
      </div>


      {filteredCountries.length > 10 && (
        <p>Please make your search more specific.</p>
      )}


      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <h1>
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.cca3} onClick={() => handleCountryClick(country)}>
                {country.name.common}
              </li>
            ))}
          </ul>
        </h1>
      )}

      {filteredCountries.length === 1 && selectCountry && (
        <div>
          <h2>{selectCountry.name.common}</h2>
          <p>Capital: {selectCountry.capital ? selectCountry.capital[0] : 'N/A'}</p>
          <p>Area: {selectCountry.area} km²</p>
          <p>Languages: {Object.values(selectCountry.languages || {}).join(', ')}</p>
          <img 
            src={selectCountry.flags[0]} 
            alt={`Flag of ${selectCountry.name.common}`} 
            style={{ width: '100px' }} 
          />
        </div>
      )}
    </div>
  );
};

export default App;
