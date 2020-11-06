import React from 'react';
import Simulation from './components/Simulation.js'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className = "Main-Background">
        <Simulation></Simulation>
      </div>
    )
  }
}

export default App;
