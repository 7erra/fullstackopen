import { useState, useEffect } from "react"
import axios from "axios"

function StartSearch() {
  return (
    <div>
      Enter search term to start search
    </div>
  )
}

function List({ countries, setElement }) {
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
            <button onClick={() => setElement(<Country data={c} />)}>Show</button>
          </div>
        )
      }
    </div>
  )
}

function Country({ data }) {
  return (
    <div>
      <h2>{data.name.common}</h2>
      <div>capital {data.capital[0]}</div>
      <div>area {data.area}</div>
      <br />
      <div><b>languages:</b></div>
      <ul>
        {Object.keys(data.languages).map(key => <li key={key}>{data.languages[key]}</li>)}
      </ul>
      <img alt={`Flag of {data.name.common}`} src={data.flags.png} />
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
    if (country == null) return
    if (country === "") {
      setElement(<StartSearch />)
      return
    }
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then(({ data }) => {
        if (data.length === 1) {
          setElement(<Country data={data[0]} />)
        } else {
          setElement(<List countries={data} setElement={setElement} />)
        }
      })
      .catch(() => {
        setElement(NoResult)
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
