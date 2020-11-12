import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import getAuthorized from 'Helpers/getAuthorized'

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  const authorized = getAuthorized()
  return <Route
    {...rest} render={(props) => (
      authorized ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}
        />
    )}
  />
}

export default AuthorizedRoute
