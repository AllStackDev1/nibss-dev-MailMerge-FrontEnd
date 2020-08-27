import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { userService } from '../../services'

const ProtectedAuth = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => userService.loggedIn() ? <Redirect to={`/dashboard`} /> : <Component {...props} />} />
    )
}

export default ProtectedAuth;