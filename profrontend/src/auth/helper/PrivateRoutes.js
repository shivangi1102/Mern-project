import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import { isauthenticate } from './index';

const PrivateRoutes = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props  =>
          isauthenticate() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoutes;