import React, { useEffect } from 'react';
import Simulation from './components/Simulation.js'
import LogIn from './components/LogIn.js'
import SignUp from './components/SignUp.js'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import * as ROUTES from './components/Routes.js'
import LineGraph from './components/LineGraph.js'
import PrivateRoute from './components/PrivateRoute.js'

class App extends React.Component {
  render() {
    return (
      <div className="Main-Background">
      <BrowserRouter>
        <div>
          <hr />
          <Route exact path={ROUTES.ROOT} component={LogIn}/>
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <PrivateRoute exact path={ROUTES.SIMULATIONS} component={Simulation} />
        </div>
  </BrowserRouter>
  </div>
    )
  }
}

export default App;