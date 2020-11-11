import React, { useEffect, useState }  from 'react'
import axios from 'axios'

const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY

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
          : <ul>{data.map(country => <CountryList key={country.area} country={country} />)}</ul>}
    </div>
  );
}
const CountryList = ({country}) => {
  const [details, setDetails] = useState(false)
  const detailsHandler = () => setDetails(!details)

  return (
    <li>
      {country.name}
      <button onClick={detailsHandler}>show</button><br />
      {details
        ? <CountryInfo country={country} />
        : ''
      }
    </li>
  )
}
const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${weather_api_key}`)
    .then((response) => {
      console.log('got response from weather:', response)
      setWeather(response.data)
    })
  }, [])

  return (
    <div className='country' >
       <h2>{country.name}</h2>
       <p>Capital: {country.capital}</p>
       <p>Population: {country.population}</p>
       <h3>languages</h3>
       <ul>{country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
       <img src={country.flag} width='100'></img>
       <h3>Weather in {country.capital}</h3>
       {weather.main
        ? <Weather data={weather} />
        : <div>loading...</div>
       }
    </div>
  );
}
const Weather = ({data}) => {
  return (
    <div>
      Temperature: {(data.main.temp - 273).toFixed(1)}C<br />
      Clouds: {data.weather[0].description}<br />
      Wind: {data.wind.deg} deg, {data.wind.speed} m/s<br />
    </div>
  )
}

export default App;