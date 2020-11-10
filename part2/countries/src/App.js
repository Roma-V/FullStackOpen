import React, { useEffect, useState }  from 'react'
import axios from 'axios'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countriesData, setCountriesData] = useState([])
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response) => {
      console.log('got response from rest:', response)
      setCountriesData(response.data)
    })
  }, [])

  const searchQueryHandler = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredCountries = () => {
    return searchQuery.length > 0
      ? countriesData.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : countriesData
  }

  return (
    <div>
      <Query query={searchQuery} changeCallback={searchQueryHandler}/>
      <Results data={filteredCountries()} />
    </div>
  );
}

const Query = ({searchQuery, changeCallback}) => {
  return (
    <div>
      find countries <input 
        value={searchQuery} 
        onChange={changeCallback}></input>
    </div>
  );
}
const Results = ({data}) => {
  return (
    <div>
      {data.length === 1
        ? <CountryInfo country={data[0]} />
        : data.length > 10
          ? 'Too many matches, specify another filter'
          : data.map(country => <li key={country.area}>{country.name}</li>)}
    </div>
  );
}
const CountryInfo = ({country}) => {
  return (
    <div>
       <h2>{country.name}</h2>
       <p>Capital: {country.capital}</p>
       <p>Population: {country.population}</p>
       <h3>languages</h3>
       {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
       <img src={country.flag} width='100'></img>
    </div>
  );
}

export default App;