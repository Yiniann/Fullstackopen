import { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);//储存APIget的数据
  const [filter, setFilter] = useState('');//储存过滤器的输入数据
  const [selectCountry, setSelectCountry] = useState(null);//储存列表点击选中状态
  const [filteredCountries, setFilteredCountries] = useState([]);//储存过滤后的国家

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

      {filter === ''&& (
        <p>please enter country name.</p>
      )}

      {filteredCountries.length === 0 && filter !== '' && (
        <p>No countries found. Please refine your search.</p>
      )}

      {filteredCountries.length > 10 && filter !== ''&&(
        <p>Please make your search more specific.</p>
      )}


      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.cca3} onClick={() => handleCountryClick(country)}>
                {country.name.common}
              </li>
            ))}
          </ul>
      )}

      {filteredCountries.length === 1 && selectCountry && (
        <div>
          <h2>{selectCountry.name.common}</h2>
          <p>Capital: {selectCountry.capital ? selectCountry.capital[0] : 'N/A'}</p>
          <p>Area: {selectCountry.area} km²</p>
          <p>Languages: {Object.values(selectCountry.languages || {}).join(', ')}</p>
          <img 
          src={selectCountry.flags[0] || 'defaultFlag.png'} 
          alt={`Flag of ${selectCountry.name.common}`} 
          style={{ width: '100px' }} 
          />

        </div>
      )}
    </div>
  );
};

export default App;
