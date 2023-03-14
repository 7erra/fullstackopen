import { useState, useEffect } from "react"
import axios from "axios"

function StartSearch() {
  return (
    <div>
      Enter search term to start search
    </div>
  )
}

function List({ countries, setCountry }) {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  return (
    <div>
      {
        countries.map(c =>
          <div key={c.cca3}>
            {c.name.common}
            <button onClick={() => setCountry(c.name.common)}>Show</button>
          </div>
        )
      }
    </div>
  )
}

function Weather({ data }) {
  if (data == null) return (<div>Weather unavailable</div>)
  return (
    <div>
      <div>Temperature: {Math.round((data.main.temp - 273.15) * 10) / 10}°C</div>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main} />
      <div>Wind: {data.wind.speed} m/s</div>
    </div >
  )

}

function Country({ data, weather }) {
  const capital = data.capital[0]
  return (
    <div>
      <h2>{data.name.common}</h2>
      <div>capital {capital}</div>
      <div>area {data.area}</div>
      <br />
      <div><b>languages:</b></div>
      <ul>
        {Object.keys(data.languages).map(key => <li key={key}>{data.languages[key]}</li>)}
      </ul>
      <img alt={`Flag of {data.name.common}`} src={data.flags.png} />
      <h2>Weather in {capital}</h2>
      <Weather data={weather} />
    </div>
  )
}

function NoResult() {
  return (
    <div>
      Search returned no results
    </div>
  )
}

function App() {
  const [element, setElement] = useState(StartSearch)
  const [searchTerm, setSearchTerm] = useState("")
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    if (country == null) return
    if (country === "") {
      setElement(<StartSearch />)
      return
    }
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then(({ data }) => {
        if (data.length === 1) {
          const countrydata = data[0]
          console.log(data)
          const [lat, lon] = countrydata.capitalInfo.latlng
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
            .then(({ data }) => {
              console.log("Got weather data", data)
              setElement(<Country data={countrydata} weather={data} />)
            })
            .catch(() => {
              console.log("Failed to get weather data")
              setElement(<Country data={countrydata} weather={null} />)
            })
        } else {
          setElement(<List countries={data} setCountry={setCountry} />)
        }
      })
      .catch(() => {
        setElement(<NoResult />)
      })
  }, [country])

  const fSearch = (event) => {
    event.preventDefault()
    setCountry(searchTerm)
  }

  const fChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="App">
      <form onSubmit={fSearch}>
        <div>
          find countries <input value={searchTerm} onChange={fChange} />
        </div>
      </form>
      {element}
    </div>
  );
}

export default App;
