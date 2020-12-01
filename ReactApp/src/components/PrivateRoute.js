import React from "react"
import {Redirect, Route } from "react-router-dom"
import ls from 'local-storage'
import Simulation from './Simulation'
import LogIn from './LogIn'
import * as ROUTES from './Routes.js'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        ls.get("validLogin") == true ? (
            <Component />
        ) : (
          <Redirect to={{ pathname: '/'}} />
        )
      }
    />
  );

export default PrivateRoute;