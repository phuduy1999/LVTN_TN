import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        }
        else {
          return (
            <Redirect to={{ pathname: '/404', state: { from: props.location } }} />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
