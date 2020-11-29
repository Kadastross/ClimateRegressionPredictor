import React, { useEffect } from 'react';
import Simulation from './components/Simulation.js'
import LogIn from './components/LogIn.js'
import SignUp from './components/SignUp.js'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import * as ROUTES from './components/Routes.js'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <hr />
          <Route exact path={ROUTES.ROOT} component={LogIn}/>
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIMULATIONS} component={Simulation} />
        </div>
  </BrowserRouter>
      
    )
  }
}

export default App;


