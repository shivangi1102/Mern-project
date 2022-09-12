import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import { isauthenticate } from './index';

const AdminRoutes = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props  =>
          isauthenticate() && isauthenticate().user.role ===1 ? (
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

  export default AdminRoutes;