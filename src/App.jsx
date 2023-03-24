import { useState } from 'react'
import './App.css'
import React from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID={youApiKeyGoesHere}`

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

