import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authService } from '../../services'

const ProtectedAuth = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => authService.loggedIn() ? <Redirect to={`/dashboard`} /> : <Component {...props} />} />
    )
}

export default ProtectedAuth;