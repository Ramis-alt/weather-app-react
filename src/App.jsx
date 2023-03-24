import { useState } from 'react'
import './App.css'
import React from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=5fa5eb8699748761236860568f29ab0f`

const searchLocation = (event) => {
  //since there is no button, we're using an event listener for an enter key
  if(event.key === 'Enter') {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }
}
  return (
    <div className="app">
      <div className='search'>
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}//listening for a change
        placeholder="Enter Location"
        onKeyDown={searchLocation}//onKeyDown is listening for our enter
        type="text"/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {/* if-else with conditional operator. Had to use this solution in order to access the data from the API.
            Could not use data.main.temp, got an error "Cannot read properties of undefined" */}
            {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null} 
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export default App

//5fa5eb8699748761236860568f29ab0f
//e2f367ebce58cb7c829b25890bc284d7
//https://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,us&APPID=5fa5eb8699748761236860568f29ab0f
//https://api.openweathermap.org/data/2.5/weather?q=Dallas&APPID=5fa5eb8699748761236860568f29ab0f
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}