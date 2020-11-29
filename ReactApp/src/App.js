import React, { useEffect } from 'react';
import Simulation from './components/Simulation.js'
import HeatMap from './components/HeatMap.js'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className = "Main-Background">
      <Simulation></Simulation>
      <HeatMap></HeatMap>
      </div>
    )
  }
}

export default App;


