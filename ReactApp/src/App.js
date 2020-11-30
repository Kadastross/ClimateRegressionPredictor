import React, { useEffect } from 'react';
import Simulation from './components/Simulation.js'
import LineGraph from './components/LineGraph.js'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className = "Main-Background">
      {/* <Simulation></Simulation> */}
      <LineGraph></LineGraph>
      </div>
    )
  }
}

export default App;


